// Element selector function
const selectorElement = (selector) => {
    const element = document.querySelector(selector);
  
    if(element) return element;
    throw new Error(`Cannot find element ${selector}`);
  }
  
  //DOM Elements
  const city = selectorElement(".city");
  const temp = selectorElement("#temp");
  const weatherIcon = selectorElement("#current__icon");
  const dayTime = selectorElement("#current__time");
  const sunrise = selectorElement("#sunrise");
  const sunset = selectorElement("#sunset");
  const feelLike = selectorElement("#feels");
  const pressure = selectorElement("#pressure");
  const humidity = selectorElement("#humidity");
  const windSpeed =  selectorElement("#wind__speed");


//Getting ser location information
  if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
      
          let lat = position.coords.latitude;
          let lon = position.coords.longitude;
      
          getWeather(lat, lon);
      });
  } else {
    console.log("Geolocation is not available")
  }

 //Get user weather data
    async function getWeather(lat, lon){
        try{
            const API_KEY = "99c1e6adb1801001c88981abda96998e";
            const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

            const response = await fetch(url);
            const weatherDetails = await response.json();

            let icon = weatherDetails.current.weather[0]?.icon;
            let rise = weatherDetails.current.sunrise;
            let set = weatherDetails.current.sunset;
            let day_time = weatherDetails.current.dt;

            city.innerHTML = weatherDetails.timezone.split("/")[1];
            temp.innerHTML = convertTemp(weatherDetails.current.temp) + " ℃";
            weatherIcon.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
            dayTime.innerHTML = convertTime(day_time);
            sunrise.innerHTML = convertTime(rise);
            sunset.innerHTML = convertTime(set);
            feelLike.innerHTML = convertTemp(weatherDetails.current.feels_like) + " ℃";
            pressure.innerHTML = weatherDetails.current.pressure + "mb";
            humidity.innerHTML = weatherDetails.current.humidity + "%";
            windSpeed.innerHTML = weatherDetails.current.pressure + "km/h";

            // Get daily forecast data, day, icon, max temp and min temp
            let day_1 = selectorElement(".d1");
            let day_2 = selectorElement(".d2");
            let day_3 = selectorElement(".d3");
            let day_4 = selectorElement(".d4");
            let day_5 = selectorElement(".d5");
            let day_6 = selectorElement(".d6");
            
            let day_1_icon = selectorElement(".d1_icon");
            let day_2_icon = selectorElement(".d2_icon");
            let day_3_icon = selectorElement(".d3_icon");
            let day_4_icon = selectorElement(".d4_icon");
            let day_5_icon = selectorElement(".d5_icon");
            let day_6_icon = selectorElement(".d6_icon");

            let minTemp_day1 = selectorElement("#min_temp_d1");
            let minTemp_day2 = selectorElement("#min_temp_d2");
            let minTemp_day3 = selectorElement("#min_temp_d3");
            let minTemp_day4 = selectorElement("#min_temp_d4");
            let minTemp_day5 = selectorElement("#min_temp_d5");
            let minTemp_day6 = selectorElement("#min_temp_d6");
            let maxTemp_day1 = selectorElement("#max_temp_d1");
            let maxTemp_day2 = selectorElement("#max_temp_d2");
            let maxTemp_day3 = selectorElement("#max_temp_d3");
            let maxTemp_day4 = selectorElement("#max_temp_d4");
            let maxTemp_day5 = selectorElement("#max_temp_d5");
            let maxTemp_day6 = selectorElement("#max_temp_d6");

            let day1 = weatherDetails.daily[0].dt; 
            let day2 = weatherDetails.daily[1].dt; 
            let day3 = weatherDetails.daily[2].dt;
            let day4 = weatherDetails.daily[3].dt; 
            let day5 = weatherDetails.daily[4].dt; 
            let day6 = weatherDetails.daily[5].dt; 

            let day1Icon = weatherDetails.daily[0].weather[0].icon;
            let day2Icon = weatherDetails.daily[1].weather[0].icon;
            let day3Icon = weatherDetails.daily[2].weather[0].icon;
            let day4Icon = weatherDetails.daily[3].weather[0].icon;
            let day5Icon = weatherDetails.daily[4].weather[0].icon;
            let day6Icon = weatherDetails.daily[5].weather[0].icon;

            day_1.innerHTML = getNextDay(day1);
            day_2.innerHTML = getNextDay(day2);
            day_3.innerHTML = getNextDay(day3);
            day_4.innerHTML = getNextDay(day4);
            day_5.innerHTML = getNextDay(day5);
            day_6.innerHTML = getNextDay(day6);

            day_1_icon.src = `http://openweathermap.org/img/wn/${day1Icon}@2x.png`;
            day_2_icon.src = `http://openweathermap.org/img/wn/${day2Icon}@2x.png`;
            day_3_icon.src = `http://openweathermap.org/img/wn/${day3Icon}@2x.png`;
            day_4_icon.src = `http://openweathermap.org/img/wn/${day4Icon}@2x.png`;
            day_5_icon.src = `http://openweathermap.org/img/wn/${day5Icon}@2x.png`;
            day_6_icon.src = `http://openweathermap.org/img/wn/${day6Icon}@2x.png`;

            minTemp_day1.innerHTML = convertTemp(weatherDetails.daily[0].temp.min) + "℃";
            minTemp_day2.innerHTML = convertTemp(weatherDetails.daily[1].temp.min) + "℃";
            minTemp_day3.innerHTML = convertTemp(weatherDetails.daily[2].temp.min) + "℃";
            minTemp_day4.innerHTML = convertTemp(weatherDetails.daily[3].temp.min) + "℃";
            minTemp_day5.innerHTML = convertTemp(weatherDetails.daily[4].temp.min) + "℃";
            minTemp_day6.innerHTML = convertTemp(weatherDetails.daily[5].temp.min) + "℃";

            maxTemp_day1.innerHTML = convertTemp(weatherDetails.daily[0].temp.max) + "℃";
            maxTemp_day2.innerHTML = convertTemp(weatherDetails.daily[1].temp.max) + "℃";
            maxTemp_day3.innerHTML = convertTemp(weatherDetails.daily[2].temp.max) + "℃";
            maxTemp_day4.innerHTML = convertTemp(weatherDetails.daily[3].temp.max) + "℃";
            maxTemp_day5.innerHTML = convertTemp(weatherDetails.daily[4].temp.max) + "℃";
            maxTemp_day6.innerHTML = convertTemp(weatherDetails.daily[5].temp.max) + "℃";

        } catch (error){
            console.log(error);
        }
    }

// Convert Temperature
const convertTemp = (val) => {
    return (val - 273).toFixed(0);
};

// Convert Time
const convertTime = (time) => {
    return new Date(time * 1000).toLocaleString().substring(12, 17);
};

// Get Next Day
const getNextDay = (day) => {
    let newDay = new Date(day * 1000).getDay();

    switch(newDay){
        case 0: return "Mon"
            break;
        case 1: return "Tues"
            break;
        case 2: return "Wed"
            break;
        case 3: return "Thu"
            break;
        case 4: return "Fri"
            break;
        case 5: return "Sat"
            break;
        case 6: return "Sun"
            break;
        default : return "Invalid Date"
            break;
    }

};
