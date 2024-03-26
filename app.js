// *Dom selector
const search = document.querySelector("#search");
const city = document.querySelector("#city");
const date = document.querySelector("#date");
const temp = document.querySelector("#temp");
const cloudy = document.querySelector("#cloud");
const hi_low = document.querySelector("#hi_low");
const icon = document.querySelector("#icon")

const url = {
    baseUrl: "https://api.openweathermap.org/data/2.5/",
    apiKey: "appid=62a13439211973f22153709b86239587"
}
const weatherUrl = url.baseUrl + "weather?units=metric&" + url.apiKey
    // console.log(weatherUrl + "&q=Yangon");
const iconUrl = "https://openweathermap.org/img/wn/";
//*fetch api
function fetchApi(url, q) {
    let path = url + q;
    fetch(path)
        .then(res => res.json())
        .then(data => displayResult(data))
}
// *display result
function displayResult(data) {
    // console.log(data);
    // console.log(data.weather[0].icon);
    city.innerHTML = `${data.name},${data.sys.country}`;
    let dat = new Date();
    let dd = dat.getDate();
    let day = dat.getDay();
    let mm = dat.getMonth();
    let yy = dat.getFullYear();

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let date_day = `${weekDays[day]} ${dd} ${months[mm]} ${yy}`;
    date.innerHTML = date_day;
    temp.innerHTML = `${data.main.temp.toFixed(0)} ' C`;
    icon.src = iconUrl + data.weather[0].icon + ".png";
    cloudy.innerHTML = data.weather[0].main;
    hi_low.innerHTML = `${data.main.temp_min.toFixed(0)}'C / ${data.main.temp_max.toFixed(0)}'C`
}
// *input Enter Listener
search.addEventListener("keypress", (event) => {
    if (event.keyCode === 13) {
        // console.log(event.target.value);
        let val = event.target.value;
        if (val) {
            let query = "&q=" + val
            fetchApi(weatherUrl, query)
        } else {
            val = "Yangon";
            let q = "&q=" + val;
            fetchApi(weatherUrl, q)
        }
    }
})
window.addEventListener("load", () => {
    let val = "Yangon";
    let q = "&q=" + val;
    fetchApi(weatherUrl, q)
})