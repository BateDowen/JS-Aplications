const url = 'http://localhost:3030/jsonstore/messenger';
const message = document.getElementById('messages')

function attachEvents() {
    let sendBtn = document.getElementById('submit');
    let refreshBtn = document.getElementById('refresh');

   sendBtn.addEventListener('click', postAMessage);
   refreshBtn.addEventListener('click', loadAllMessages);

};

async function postAMessage() {
    let [author,content] = [document.querySelector('input[name=author]'),document.querySelector('input[name=content]')];
    if (author.value === '' || content.value === '') {
        alert('Fields are required!');
    }else {
        await request(url, {author: author.value, content: content.value})
        author.value = '';
        content.value = '';
        
    }
}

async function loadAllMessages(){
    const resp = await fetch(url);
    const data = await resp.json();

    message.value = Object.values(data).map(({author,content})=> `${author}: ${content}`).join('\n');

};
async function request(url, option) {
    if (option) {
        option = {
            method: 'POST',
            headers:{
                'Content-Type' : 'aplications/json'
            },
            body: JSON.stringify(option)
        }
    };
    const responce = await fetch(url,option);
    return responce.json();
}
attachEvents();