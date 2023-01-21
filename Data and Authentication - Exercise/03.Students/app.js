async function students() {
    const url  = `http://localhost:3030/jsonstore/collections/students`;

    const table = document.querySelector('#results tbody');

    const resp = await fetch(url);
    const data = await resp.json();

    Object.values(data).forEach(el => {
        const firstName = el.firstName;
        const lastName = el.lastName;
        const facultyNum = el.facultyNumber;
        const grade = Number(el.grade);

        const tr = document.createElement('tr');

        const firstNameCell = tr.insertCell();
        firstNameCell.innerText = firstName;

        const lastNameCell = tr.insertCell();
        lastNameCell.innerText = lastName;
        
        const facultyCell = tr.insertCell();
        facultyCell.innerText = facultyNum;

        const gradaCell = tr.insertCell();
        gradaCell.innerText = grade;

        const btn = tr.insertCell();
        const deleteBtn = document.createElement('button');
        deleteBtn.id = el._id
        deleteBtn.innerText = 'Delete';
        deleteBtn.style.width = '100%'
        btn.appendChild(deleteBtn);
        deleteBtn.addEventListener('click', onClickDelete)
        
        
        //

        table.appendChild(tr);



    });

    const submitBtn = document.getElementById('submit');
    submitBtn.addEventListener('click', onClickSubmit);

    function onClickDelete(ev) {
        const id = ev.currentTarget.id;
        ev.target.parentNode.parentNode.remove();
        
         fetch(`${url}/${id}`,{
            method: 'DELETE'
        })
        .then(resp => resp.json())
        .then()
    }
    function onClickSubmit(ev) {
        const form = document.getElementById('form')
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let formData = new FormData(e.currentTarget);
    
            let data = { firstName,lastName,facultyNumber,grade,_id } = Object.fromEntries(formData);
            
            if (isNaN(facultyNumber) || isNaN(grade)) {
                alert('Wrong input data!');

            };
        //    fetch(url, {
        //     method: 'POST',
        //     headers: {
        //         'content-type': 'aplications/json'
        //     },
        //     body: JSON.stringify(data)
        //    })
        //    .then(resp => resp.json())
        //    .then()
        e.currentTarget.querySelector('.inputs').children[0].value = '';
        e.currentTarget.querySelector('.inputs').children[1].value = '';
        e.currentTarget.querySelector('.inputs').children[2].value = '';
        e.currentTarget.querySelector('.inputs').children[3].value = '';
           

        })

    }

}
students()