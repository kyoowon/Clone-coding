const loginForm = document.querySelector("#login-form")
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");
const todoForm = document.querySelector("#todo-form");
const todoList = document.querySelector("#todo-list");
const clock = document.querySelector("#container .clock");
const proFile = document.querySelector(".profile");
const login = document.querySelector("#login-icon");

const HIDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

// form : get input value
function onLoginSubmit(event) {
	// JS는 기본적으로 submit을 할 때, 새로고침한다. 
	// 이에 확인하기 위해서는 다음과 같은 코드를 추가하면 확인이 가능한다.
	event.preventDefault();
	const username = loginInput.value;
	localStorage.setItem(USERNAME_KEY, username);
	paintGreetings(username);
}

function onLogoutSubmit(){
	localStorage.removeItem(USERNAME_KEY);
}

function paintGreetings(username) {
	loginForm.classList.add(HIDEN_CLASSNAME);
	proFile.classList.add(HIDEN_CLASSNAME);
	greeting.innerText = `Show me your passion, ${username}`;
	clock.classList.remove(HIDEN_CLASSNAME);
	greeting.classList.remove(HIDEN_CLASSNAME);
	todoForm.classList.remove(HIDEN_CLASSNAME);
	todoList.classList.remove(HIDEN_CLASSNAME);
}

const savedUsername = localStorage.getItem(USERNAME_KEY);

if(savedUsername === null) {
	// show the form
	loginForm.classList.remove(HIDEN_CLASSNAME);
	proFile.classList.remove(HIDEN_CLASSNAME);
	loginForm.addEventListener("submit", onLoginSubmit);
} else {
	// show the greeting
	paintGreetings(savedUsername);
}

login.addEventListener("click", onLogoutSubmit);