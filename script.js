var searchButton = document.querySelector(".search-btn");
searchButton.addEventListener("click", function(){
    
    var searchTerm = document.querySelector(".weather-search").value
console.log(searchTerm);
cityWeather(searchTerm);

})
function cityWeather(city){
    var geoLocation = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=0a9af93029210912aafc391ead4bc3e3"
    fetch(geoLocation).then(function(response ){
        return response.json()}).then(function(data){
            var lat = data[0].lat
            var lon = data[0].lon
            var weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=0a9af93029210912aafc391ead4bc3e3`
            fetch(weatherUrl).then(function(response){
                return response.json()
            })
            .then(function(data){
                console.log(data);
                var currentDate = moment.unix(data.dt).format("dddd, MMMM Do YYYY");
                console.log(currentDate);
                document.querySelector(".city").textContent = "The weather in " + city
                document.querySelector(".temp").textContent = Math.round(data.main.temp) + String.fromCharCode(176);
                document.querySelector(".description").textContent = data.weather[0].main;
                document.querySelector(".humidity").textContent = data.main.humidity;
            })
        })
    
}
//function at the end of 