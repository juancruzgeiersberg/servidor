const clima_view = document.getElementById('clima');

async function mostrarClima(){
    fetch('https://api.openweathermap.org/data/2.5/weather?q=Tandil,ar&APPID=ef8153f381d4c88bebc3c2830e52b3e3')
        .then(resolve => resolve.json())
        .then(jsonFinal => clima_view.innerHTML = `<h4>La temperatura en ${jsonFinal.name} es de ${parseInt(jsonFinal.main.temp-273)}° y la Humedad es de ${jsonFinal.main.humidity}%</h4>`)
        .catch(err => console.log(err));
    
}

document.addEventListener('DOMContentLoaded', mostrarClima);