var searchButton = document.querySelector(".search-btn");
var historyButton = document.querySelector(".local-s");
var apiKey = "0a9af93029210912aafc391ead4bc3e3"

searchButton.addEventListener("click", function () {

    var searchTerm = document.querySelector(".weather-search").value
    console.log(searchTerm);
    cityWeather(searchTerm.toLowerCase());
    var localS = JSON.parse(localStorage.getItem("weatherAPI")) || []
    console.log(localS);
    if (!localS.includes(searchTerm.toLowerCase())&& searchTerm.length > 0){
        console.log(true)
        localS.push(searchTerm)
    }
    localStorage.setItem("weatherAPI", JSON.stringify(localS))
    displayLocalS()
})
// console.log(historyButton)
// historyButton.addEventListener("click", function (e) {

//     console.log(e)
// })


function cityWeather(city) {
    var geoLocation = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=0a9af93029210912aafc391ead4bc3e3"
    fetch(geoLocation).then(function (response) {
        return response.json()
    }).then(function (data) {
        console.log(data);
        var lat = data[0].lat
        var lon = data[0].lon
        var onecall = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${apiKey}&units=imperial`
        var weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=0a9af93029210912aafc391ead4bc3e3`
        fetch(onecall).then(function (response) {
            return response.json()
        })
            .then(function (data) {
                console.log(data);
                var currentDate = moment.unix(data.dt).format("dddd, MMMM Do YYYY");
                console.log(currentDate);
                var currentHTML = document.querySelector(".weather")
                currentHTML.innerHTML = `
                <div class="alert alert-info" role="alert">
                <h2 class="city">${city}</h2>
            <h2 class="temp">Temp: ${data.current.temp}</h2>
            <img src="https://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png" alt="" class="icon" />
            <div class="description">Description: ${data.current.weather[0].description}</div>
            <div class="humidity">Humidity: ${data.current.humidity}</div>
            <div class="wind">Wind Speed: ${data.current.wind_speed}</div>
            <div class="UV-Index">UVI-Index: ${data.current.uvi}</div>
</div>
                `
                var fiveHTML = ""
                for (let i = 1; i < 6; i++) {
                    fiveHTML += `
                                    <div class="card" style="width: 18rem;">
                <img src="https://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${moment.unix(data.daily[i].dt).format("dddd, MMMM Do YYYY")}</h5>
                    <p class="card-text">Temp:${data.daily[i].temp.day} </p>
                    <p class="card-text">UVI:${data.daily[i].uvi} </p>
                    <p class="card-text">Humidity:${data.daily[i].humidity} </p>
                    <p class="card-text">description:${data.daily[i].weather[0].description} </p>
                    <p class="card-text">wind speed:${data.daily[i].wind_speed} </p>
                </div>
                </div>`
                }
                document.querySelector(".fiveDay").innerHTML = fiveHTML
                // document.querySelector(".city").textContent = "The weather in " + city
                // document.querySelector(".temp").textContent = Math.round(data.main.temp) + String.fromCharCode(176);
                // document.querySelector(".description").textContent = data.weather[0].main;
                // document.querySelector(".humidity").textContent = data.main.humidity;
            })
    })

}
function displayLocalS() {
    console.log("111111111111111");
    var localS = JSON.parse(localStorage.getItem("weatherAPI")) || []
    console.log(localS)
    var localHTML = ""
    for (var i = 0; i < localS.length; i++) {
        localHTML += `<button class="btn btn-primary local-s">${localS[i]}</button>` // a = a+1 a+= 1
     }
   document.querySelector(".storage").innerHTML = localHTML

}
//function at the end of 
displayLocalS()

historyButton.addEventListener("click", function (e) {

    console.log(e)
})
