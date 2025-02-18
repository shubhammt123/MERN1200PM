async function fetchForecastData(city){
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=28a2668c8da16e9a46be79711a598759&units=metric
`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}
async function fetchCurrentWeatherData(city){
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=28a2668c8da16e9a46be79711a598759&units=metric
`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

document.getElementById("search-button").addEventListener("click",function(){
    let cityName = document.getElementById("input").value;
    let currentData = fetchCurrentWeatherData(cityName);
    let forcastData = fetchForecastData(cityName);
    currentData
    .then((data)=>{
        console.log(data);
        let currentTempDiv = document.getElementById("currentTemp");
        let currentMinMaxDiv = document.getElementById("currentMinMaxTemp");
        currentTempDiv.innerHTML = `${data.main.temp}<sup style='font-size: 20px; position: relative; bottom: 30px;'>O</sup>C`;
        currentMinMaxDiv.innerHTML = `${data.main.temp_max}<sup style="font-size: 10px; position: relative; bottom: 10px;">O</sup>C / ${data.main.temp_min}<sup style="font-size: 10px; position: relative; bottom: 10px;">O</sup>C`;
        let city = document.getElementById("cityName");
        city.innerHTML = data.name;
        let currentDate = document.getElementById("currentDate");
        let date = new Date();
        currentDate.innerHTML = date.toDateString();
        let weatherIcon = document.getElementById("weather-icon");
        weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    })
    .catch((error)=>{
        console.log(error);
    });
    
    document.getElementById("weather-forecast").innerHTML = "";
    forcastData
    .then((data)=>{
        console.log(data);
        data.list.forEach((item)=>{
            let newDiv = document.createElement("div");
        let Month = Date(item.dt).slice(4,7);
        let date = item.dt_txt.slice(8,10);
        let time = +item.dt_txt.slice(11,13);
        if(time > 12){
            time -= 12;
            time = time + "PM";
        }else{
            time = time + "AM"
        }
        newDiv.innerHTML = `<p style="width : 20px">${date} ${Month}</p><p>${time}</p><img style="width:40px" src='https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png' /><p>${item.main.temp}<sup style="font-size: 5px; position: relative; bottom: 5px;">O</sup>C</p>`
        let parentDiv = document.getElementById("weather-forecast");
        parentDiv.appendChild(newDiv);
        })
        
    })
    .catch((error)=>{
        console.log(error);
    })

})

// console.log(Date(1739664000));

// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid=28a2668c8da16e9a46be79711a598759