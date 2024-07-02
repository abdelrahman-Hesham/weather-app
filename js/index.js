let todayName=document.getElementById('today_date_day_name')
let todayNumber=document.getElementById('today_date_day_number')
let todayMonth =document.getElementById('today_date_month')
let todayLocation =document.getElementById('today_location')
let todayTemp =document.getElementById('today_temp')
let todayConditionImg =document.getElementById('today_condition_img')
let todayConditionText =document.getElementById('today_condition_text')
let humidity =document.getElementById('humidity')
let wind =document.getElementById('wind')
let windDirection =document.getElementById('wind_direction')
let btn = document.getElementById('btn')




//nextday
let nextDay=document.getElementsByClassName('next_day_name')
let nextMaxTemp=document.getElementsByClassName('next_max_temp')
let nextMinTemp=document.getElementsByClassName('next_min_temp')
let nextConditionImg=document.getElementsByClassName('next_condition_img')
let nextConditionText=document.getElementsByClassName('next_condition_text')

// search
let searchInput =document.getElementById('searchInput')


async function getWeatherData(searchInput){
    let res=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=fc4911637d2b44d19c0220245242806&q=${searchInput}&days=3`)
    let weatherData= await res.json()
    return weatherData;
}

 function display(data){
    let todayDate = new Date()
    todayName.innerHTML = todayDate.toLocaleDateString('en-us',{weekday:"long"})
    todayNumber.innerHTML= todayDate.getDate()
    todayMonth.innerHTML=todayDate.toLocaleDateString('en-us',{month:"long"})
todayLocation.innerHTML=data.location.name
todayTemp.innerHTML= data.current.temp_c
todayConditionImg.setAttribute('src','https:'+ data.current.condition.icon)
todayConditionText.innerHTML=data.current.condition.text
wind.innerHTML=data.current.wind_kph+'km/h'
humidity.innerHTML=data.current.humidity+'%'
windDirection.innerHTML=data.current.wind_dir
}

function displayNextData(data){
let forecastData= data.forecast.forecastday

for (let i = 0; i < 2; i++) {
    let nextDate = new Date(forecastData[i+1].date)
nextDay[i].innerHTML = nextDate.toLocaleDateString('en-us',{weekday:"long"})
    nextMaxTemp[i].innerHTML = forecastData[i+1].day.maxtemp_c
    nextConditionText[i].innerHTML =forecastData[i+1].day.condition.text
    nextMinTemp[i].innerHTML = forecastData[i+1].day.mintemp_c
    nextConditionImg[i].setAttribute('src','https:'+forecastData[i+1].day.condition.icon)
    // nextDay[i].innerHTML = forecastData[i+1].date.weekday
}
}

async function startApp(searchInput){
    let weatherData=await getWeatherData(searchInput)
    if (!weatherData.error) {
        
        displayNextData(weatherData)
        display(weatherData)
    }
}

startApp()
searchInput.addEventListener('input',function(){
    startApp(searchInput.value)
})

async function getUserCity() {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      const city = await data.city;
    //   console.log(`City: ${city}`);
      startApp(city)
        } catch (error) {
      console.error('Error:', error);
    }
  }
  
  getUserCity();
  btn.addEventListener('click',function(){
    getUserCity()
    
    
  })