const clima_view = document.getElementById('clima');
const API = 'https://api.openweathermap.org/data/2.5/weather?q=Tandil,ar';
const API_KEY = 'ef8153f381d4c88bebc3c2830e52b3e3'

async function mostrarClima(){
    fetch(`${API}&APPID=${API_KEY}`)
        .then(resolve => resolve.json())
        .then(jsonFinal => clima_view.innerHTML = `<h4>La temperatura en ${jsonFinal.name} es de ${parseInt(jsonFinal.main.temp-273)}° y la Humedad es de ${jsonFinal.main.humidity}%</h4>`)
        .catch(err => console.log(err));
    
}

document.addEventListener('DOMContentLoaded', mostrarClima);