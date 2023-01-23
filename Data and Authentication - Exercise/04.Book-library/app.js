function movies() {
    const url = 'http://localhost:3030/jsonstore/collections/books';

    const loadBtn = document.getElementById('loadBooks');
    loadBtn.addEventListener('click', onClickLoad);

    let table = document.querySelector('#table tbody');
    let id;

    let submitBtn = document.getElementById('submit');
    submitBtn.addEventListener('click', (ev) => {
        ev.preventDefault();
        
        let title = document.getElementsByName('title')[0].value;
        let author = document.getElementsByName('author')[0].value;

        let data = { title,author } 

            if (ev.target.innerText === 'Save'){
                
                if (title !== '' && author !== '') {
                    ev.target.innerText = 'Submit'
                       console.log(id); 
                        
                        fetch(`${url}/${id}`, {
                            method: 'PUT',
                            headers: {
                                'content-type': 'aplications/json'
                            },
                            body: JSON.stringify(data)
                           })
                           .then(resp => resp.json())
                           .then()
                           .catch()
                    }

            } else if (ev.target.innerText === 'Submit') {
            
                if (title !== '' && author !== '') {
                       console.log('submit');
                       
                       fetch(url, {
                           method: 'POST',
                           headers: {
                               'content-type': 'aplications/json'
                           },
                           body: JSON.stringify(data)
                          })
                          .then(resp => resp.json())
                          .then()
                          .catch()
                }
            }
            onClickLoad()
            document.getElementsByName('title')[0].value = '';
            document.getElementsByName('author')[0].value = '';
       
    })
    function onClickLoad(ev) {
        table.innerHTML = ''
        fetch(url)
        .then(resp => resp.json())
        .then(data =>  {
            Object.values(data).forEach(el => {
                let title = el.title;
                let author = el.author;
                let tr = document.createElement('tr');

                let titleCell = tr.insertCell();
                titleCell.innerText = title;
                let authorCell = tr.insertCell();
                authorCell.innerText = author;
                let editBtn = document.createElement('button');
                editBtn.innerText = 'Edit';
                editBtn.id = el._id;
                editBtn.addEventListener('click', onClickEdit);
                let delBtn = document.createElement('button');
                delBtn.innerText = 'Delete';
                delBtn.id = el._id;
                delBtn.addEventListener('click', onClickDelete);
                let divBtns = document.createElement('div');
                divBtns = tr.insertCell();
                divBtns.appendChild(editBtn);
                divBtns.appendChild(delBtn);

                table.appendChild(tr)
            })
            })
        .catch()
    };

    function onClickEdit(ev) {
        ev.preventDefault()
        let tr = ev.currentTarget.parentNode.parentNode;
        let title = document.getElementsByName('title')[0];
        let author = document.getElementsByName('author')[0];

       title.value = tr.children[0].innerText;
       author.value = tr.children[1].innerText;
       
       let h3 = document.querySelector('#form').children[0]
        h3.innerText = 'Edit FORM';
        let submitBtn = document.getElementById('submit');
        submitBtn.innerText = 'Save'
         
        id = ev.currentTarget.id;
    };
    function onClickDelete(ev) {
        id = ev.currentTarget.id;
        fetch(`${url}/${id}`, {
            method: 'DELETE'
        })
        .then(resp => resp.json())
        .then()
        ev.currentTarget.parentNode.parentNode.remove();
    };
    
}
movies()