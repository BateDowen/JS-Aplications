function getInfo() {
    let url = 'http://localhost:3030/jsonstore/bus/businfo'
    let idField = document.getElementById('stopId');
    let stopNameField = document.getElementById('stopName');
    let busesField = document.getElementById('buses');


    fetch(`${url}/${idField.value}`)
    .then(responce => responce.json())
    .then(busesNum => {
       
        stopNameField.textContent = busesNum.name;
        busesField.innerHTML = '';
        
        Object.entries(busesNum.buses)
        .forEach(busInfo => {
       
            let li = document.createElement('li');
            li.textContent = `Bus ${busInfo[0]} arrives in ${busInfo[1]} minutes`;
            busesField.appendChild(li)
        })
    })
    .catch(stopNameField.textContent = 'Error')

}