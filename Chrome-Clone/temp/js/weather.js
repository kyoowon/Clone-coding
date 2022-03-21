const API_KEY = "4a1ea1083f948aeb7c83c1d2966708f8";


function onGeoSuccess(position){
	const lat = position.coords.latitude;
	const lon = position.coords.longitude;

	const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
	fetch(url)
	.then(response =>response.json())
	.then(data => {
		const weather = document.querySelector("#header #weather");
		const city = document.querySelector("#header #city");
		city.innerText = data.name;
		weather.innerText = `${data.weather[0].main} : ${Math.round(data.main.temp)}℃`;
		// console.log(data.name, data.weather[0].main);
	});
}

function onGeoError() {
	alert("can't find you. No weather for you.")
}

navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError)