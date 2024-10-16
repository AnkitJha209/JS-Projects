document.addEventListener('DOMContentLoaded',()=>{
    const city = document.getElementById('input-city')
    const searchCity = document.getElementById('searchCity');
    const infoWeather = document.getElementById('weatherInfo')
    const cityName = document.getElementById('cityName')
    const temp = document.getElementById('temp');
    const des = document.getElementById('description');
    const errorMsg = document.getElementById('error-msg');
    const img = document.getElementById('descrip');

    const API_KEY = 'd0699374544b35070b3c02c63a11ea42'

    searchCity.addEventListener('click', async ()=>{
        const val = city.value.trim();
        if(val === '') return;
        try{
            const data = await fetchWeatherData(val);
            // console.log(data);
            displayWeatherData(data);
            
        }catch(error){
            showError();
        }

    })

    async function fetchWeatherData(val){
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${val}&units=metric&appid=${API_KEY}`
        const response = await fetch(url);
        console.log(response);
        if(!response.ok){
            throw new Error(" City Not found"); 
        }
        const obj =  await response.json();
        return obj;

    }

    function displayWeatherData(data){
        const {name, main, weather} = data;
        cityName.innerHTML = `City Name : ${name}`
        temp.innerHTML = `Temprature : ${main.temp}`
        des.innerHTML = `Description : ${weather[0]['description']}`
        if(weather[0]['description']== 'overcast clouds'){
            img.setAttribute('src', '/images/overCastClouds.webp')
        }
        else if(weather[0]['description']== 'mist'){
            img.setAttribute('src', '/images/mist.jpg')
        }
        else if(weather[0]['description']== 'haze'){
            img.setAttribute('src', '/images/haze.jpg')
        }
        else if(weather[0]['description']== 'clear sky'){
            img.setAttribute('src', '/images/clearSky.jpg')
        }
        else if(weather[0]['description']== 'moderate rain' || weather[0]['description']== 'light rain'){
            img.setAttribute('src', '/images/rain.jpg')
        }
        else if(weather[0]['description']== 'scattered clouds' || weather[0]['description']== 'broken clouds'){
            img.setAttribute('src', '/images/scatteredClouds.jpg')
        }
        else{
            img.setAttribute('src','');
        }


        console.log(data);
        // infoWeather.classList.remove('hideIt');

        infoWeather.classList.remove("hideIt");
        errorMsg.classList.add("hideIt");
    }

    function showError(){
        infoWeather.classList.add("hideIt");
        errorMsg.classList.remove("hideIt");
    }
});