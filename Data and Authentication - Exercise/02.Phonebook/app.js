function attachEvents() {
    const url = `http://localhost:3030/jsonstore/phonebook`;
    
    const ulPhonebook = document.getElementById('phonebook');
    const loadBtn = document.getElementById('btnLoad');
    const createBtn = document.getElementById('btnCreate');

    const personField = document.getElementById('person');
    const phoneField = document.getElementById('phone');

    loadBtn.addEventListener('click', onClickLoad);
    createBtn.addEventListener('click', onClickCreate);

    async function onClickLoad () {
        ulPhonebook.innerHTML = '';

        const responce = await fetch(url);
        const data = await responce.json();

        Object.values(data).forEach(el => {
            const { person, phone, _id } = el;
            const li = createElement('li', `${person}: ${phone}`, ulPhonebook);
            li.setAttribute('id',_id);

            const deleteBtn = createElement('button','Delete',li);
            deleteBtn.setAttribute('id','btnDelete');
            deleteBtn.addEventListener('click',onClickDelete);

        })
    };
   async function onClickDelete (ev){
        const id = ev.target.parentNode.id;
        ev.target.parentNode.remove();
        
        const deleteResp = await fetch(`${url}/${id}`,{
            method: 'DELETE'
        });

    }
    async function onClickCreate() {
        
        if (personField.value !== '' && phoneField.value !== '') {
            const resp = await fetch(url, {
                method: 'POST',
                headers: {'Content-type' : 'aplication-json'}, 
                body: JSON.stringify({person:personField.value,phone:phoneField.value})
            });
            loadBtn.click();
            personField.value = '';
            phoneField.value = '';
        }
    }
    function createElement(type, text, appender) {
        const result = document.createElement(type);
        result.textContent = text;
        appender.appendChild(result);
        return result
    };


}

attachEvents();