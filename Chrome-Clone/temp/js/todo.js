const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

let ToDos = [];

function saveToDos(){
	// JSON.stringify는 배열을 텍스트로 변환
	localStorage.setItem(TODOS_KEY, JSON.stringify(ToDos));
}

function deleteToDo(event){
	const li = event.target.parentElement;
	li.remove();
	ToDos = ToDos.filter((toDo) => toDo.id !== parseInt(li.id));
	saveToDos();
}

function paintToDo(newTodo){
	const li = document.createElement("li");
	li.id = newTodo.id;
	const span = document.createElement("span");
	const button = document.createElement("button");
	button.innerText = "✖️";
	button.addEventListener("click", deleteToDo);
	li.appendChild(span);
	li.appendChild(button);
	span.innerText = newTodo.text;
	toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
	event.preventDefault();
	const newTodo = toDoInput.value;
	toDoInput.value = ""
	const newTodoObj =  {
		text:newTodo,
		id : Date.now(),
	}
	ToDos.push(newTodoObj);
	paintToDo(newTodoObj);
	saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit)

const savedToDos = localStorage.getItem(TODOS_KEY)

if(savedToDos != null) {
	const ParsedToDos = JSON.parse(savedToDos);
	ToDos = ParsedToDos;
	ParsedToDos.forEach((item) => {
		paintToDo(item);
	});
}