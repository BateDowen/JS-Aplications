function solution() {
    const divMain = document.getElementById('main');
    const url = `http://localhost:3030/jsonstore/advanced/articles/list`;

    fetch(url)
    .then(resp => resp.json())
    .then(data => {
        data.forEach(element => {
            const id = element._id;
            const title = element.title;

            const divAccordion = document.createElement('div');
            const divHead = document.createElement('div');
            divAccordion.classList.add('accordion');
            divHead.classList.add('head');

            const span = document.createElement('span');
            span.textContent = title;
            const btn = document.createElement('button');
            btn.classList.add('button');
            btn.id = id;
            btn.textContent = 'MORE';

            divHead.appendChild(btn)
            divHead.appendChild(span);
            divAccordion.appendChild(divHead)
            divMain.appendChild(divAccordion);

            btn.addEventListener('click', btnMoreOrLess);


        });
        function btnMoreOrLess(event) {
            const id = event.target.id
            const url = `http://localhost:3030/jsonstore/advanced/articles/details/${id}`;

            const divExtra = document.createElement('div');
            divExtra.classList.add('extra');
            const p = document.createElement('p');

            
            if (!p.textContent) {
            fetch(url)
            .then(resp => resp.json())
            .then(data => {
                
                    p.textContent = data.content;
                    divExtra.appendChild(p);
                    
                    if (event.target.textContent ==='MORE') {
                        event.target.parentNode.parentNode.appendChild(divExtra);
                        divExtra.style.display = 'block'
                        event.target.textContent = 'LESS'
                    }else {
                        divExtra.style.display = 'none'
                        event.target.textContent = 'MORE'
    
                    }
                })
            }
        }
    })
}
solution()
