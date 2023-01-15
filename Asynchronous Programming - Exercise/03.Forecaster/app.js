function attachEvents() {
    const inputField = document.getElementById('location');
    const getBtn = document.getElementById('submit');
    const firstUrl = 'http://localhost:3030/jsonstore/forecaster/locations';

    getBtn.addEventListener('click', function(){

        fetch(firstUrl)
        .then(resp => resp.json())
        .then(cityData =>{
           cityData.forEach(element => {
            if (inputField.value === element.name) {
                const code = element.code
                const todayUrl = `http://localhost:3030/jsonstore/forecaster/today/${code}`;
                fetch(todayUrl)
                .then(resp => resp.json())
                .then(data =>{

                    const divForecast = document.getElementById('forecast');
                    divForecast.style.display = 'block';
                    const divCurrent = document.getElementById('current');
                    const divForecasts = document.createElement('div');
                    divForecasts.classList.add('forecasts');
                    const conditionBigSpan = document.createElement('span');
                    conditionBigSpan.classList.add('condition');

                    const condSymbolSpan = document.createElement('span');
                    condSymbolSpan.classList.add('symbol');
                    condSymbolSpan.classList.add('condition');

                    const condition = data.forecast.condition
                    switch(condition){
                        case 'Sunny': condSymbolSpan.textContent = '☀'; break
                        case 'Partly sunny': condSymbolSpan.textContent = '⛅'; break
                        case 'Overcast': condSymbolSpan.textContent = '☁'; break
                        case 'Rain': condSymbolSpan.textContent = '☂'; break
                        case 'Degrees': condSymbolSpan.textContent = '°'; break
                    };
                    const nameCitySpan = document.createElement('span');
                    nameCitySpan.classList.add('forecast-data');
                    nameCitySpan.textContent = data.name

                    const degreeSpan = document.createElement('span');
                    degreeSpan.classList.add('forecast-data');
                    degreeSpan.textContent = `${data.forecast.high}°/${data.forecast.low}°`;

                    const condionSpan = document.createElement('span');
                    condionSpan.classList.add('forecast-data');
                    condionSpan.textContent = `${data.forecast.condition}`

                    conditionBigSpan.appendChild(nameCitySpan);
                    conditionBigSpan.appendChild(degreeSpan);
                    conditionBigSpan.appendChild(condionSpan);

                    divForecasts.appendChild(condSymbolSpan);
                    divForecasts.appendChild(conditionBigSpan);
                    divCurrent.appendChild(divForecasts);

                    
                    console.log(data.forecast.condition);
                }).catch(Error);

                const treeDayUrl = `http://localhost:3030/jsonstore/forecaster/upcoming/${code}`;
                fetch(treeDayUrl)
                .then(resp => resp.json())
                .then(data => {

                    const divUPcoming = document.getElementById('upcoming');
                    const divForecastInfo = document.createElement('div');
                    divForecastInfo.classList.add('forecast-info');
                    
                    
                    data.forecast.forEach(el => {
                        
                        const spanUpcoming = document.createElement('span');
                        spanUpcoming.classList.add('upcoming');
                        let symbol = ''

                        const condition = el.condition
                        switch(condition){
                            case 'Sunny': symbol = '☀'; break
                            case 'Partly sunny': symbol = '⛅'; break
                            case 'Overcast': symbol = '☁'; break
                            case 'Rain': symbol = '☂'; break
                            case 'Degrees': symbol= '°'; break
                        };
                        
                        spanUpcoming.innerHTML = `<span class="symbol">${symbol}</span>
                       <span class="forecast-data">${el.high}/${el.low}</span>
                       <span class="forecast-data">${el.condition}</span>
                       `;
                       
                       divForecastInfo.appendChild(spanUpcoming)
                       console.log(el);
                    })
                    divUPcoming.appendChild(divForecastInfo);

                })
                
            }
           });
        })
        // .catch(console.log('Error'))
    })
}

attachEvents();