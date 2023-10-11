const Store = {
	backgroundColor: null,
	columns: null,
};

window.app = {
	store: Store,
};

function getFromLocalStorage(localStorageKey) {
	console.log(`Fetching ${localStorageKey} from localStorage`);
	const dataFromLocalStorage = localStorage.getItem(localStorageKey);
	console.log(
		"The data returned from localStorage is ",
		dataFromLocalStorage
	);
	if (dataFromLocalStorage) {
		const dataAsJson = JSON.parse(dataFromLocalStorage);
		return dataAsJson;
	}
	return null;
}

function updateLocalStorage(localStorageKey, data) {
	console.log(`Setting ${data} as content for key ${localStorageKey}`);
	const dataAsJson = JSON.stringify(data);
	localStorage.setItem(localStorageKey, dataAsJson);
}

function loadBackgroundColor() {
	const backgroundColor = getFromLocalStorage("backgroundColor");
	app.store.backgroundColor = backgroundColor;
	document.body.style.backgroundColor = backgroundColor;
}

function handleColorInputValueChange(event) {
	const inputColorValue = event.target.value;
	console.log("The color picked is ", inputColorValue);
	document.body.style.backgroundColor = inputColorValue;
	updateLocalStorage("backgroundColor", inputColorValue);
}

function loadColumns() {
	const columns = getFromLocalStorage("columns");
	app.store.columns = columns || [];
}

function handleCreateColumnButtonClick() {
	console.log("Create column button was clicked");
	handleCreateColumnToggle();
}

function handleAddColumnButtonClick() {
	console.log("Add column button was clicked");
	const createColumnInput = document.querySelector(".create-column__input");
	const inputColumnValue = createColumnInput.value.trim();

	if (inputColumnValue === "") {
		alert("Forneça um nome para a coluna");
		return;
	}

	console.log("The column name is", inputColumnValue);

	const newColumn = {
		id: Date.now(),
		title: inputColumnValue,
		tasks: [],
	};
	app.store.columns.push(newColumn);

	createColumnInput.value = "";
	console.log("The new column is", newColumn);
	handleCreateColumnToggle();
	updateLocalStorage("columns", app.store.columns);
	renderColumns();
}

function handleCancelColumnButtonClick() {
	console.log("Column creation was canceled");
	handleCreateColumnToggle();
}

function handleCreateColumnToggle() {
	const createColumnForm = document.querySelector(".create-column");
	const createColumnButton = document.querySelector(".create-column-button");
	createColumnForm.classList.toggle("hidden");
	createColumnButton.classList.toggle("hidden");
}

function renderColumns() {
	const columnsContainer = document.querySelector(".columns");
	columnsContainer.innerHTML = "";

	const columns = window.app.store.columns;
	if (columns && columns.length > 0) {
		const columnsHTML = columns.map(getColumnHTML).join("");
		columnsContainer.innerHTML = columnsHTML;
		handleCreateColumnToggle();
	}
}

function getColumnHTML(column) {
	return `
		<div class="column" id="${column.id}">
			<div class="column__header">
				<span class="column__title">${column.title}</span>	
				<div class="column__options">
						<button onclick="deleteColumnById(${column.id})">
						<i class="fa-regular fa-trash-can"></i>
					</button>
				</div>
			</div>
			<section class="column__tasks" id="tasks-${column.id}">${column.tasks
		.map(getColumnTaskHTML)
		.join("")}</section>
			<button class="column__create-button">
				<i class="fa-solid fa-plus"></i>
				<span>Adicionar tarefa</span>
			</button>
		</div>
	`;
}

function getColumnTaskHTML(task) {
	return `
		<article class="task" id="${task.id}">
			<span class="task__title">${task.title}</span>
			<button class="task__options">
				<i class="fa-solid fa-ellipsis"></i>
			</button>
		</article>
	`;
}

function deleteColumnById(columnId) {
	console.log("Deleting column with id", columnId);
	const columns = window.app.store.columns;
	const columnsWithoutDeleted = columns.filter(
		(column) => column.id !== columnId
	);
	app.store.columns = columnsWithoutDeleted;
	updateLocalStorage("columns", columnsWithoutDeleted);
	renderColumns();
}

function createTask(taskContent, columnId) {
	const newTask = {
		id: Date.now(),
		title: taskContent,
	};

	const column = document.querySelector(`#tasks-${columnId}`);
	const taskHTML = getColumnTaskHTML(newTask);
	column.innerHTML += taskHTML;
}

window.addEventListener("DOMContentLoaded", () => {
	loadBackgroundColor();
	loadColumns();
	renderColumns();

	const colorPickerInput = document.querySelector("#colorPickerInput");
	const createColumnButton = document.querySelector(".create-column-button");
	const addColumnButton = document.querySelector(".create-column__add");
	const cancelColumnButton = document.querySelector(".create-column__cancel");

	createColumnButton.addEventListener("click", handleCreateColumnButtonClick);
	addColumnButton.addEventListener("click", handleAddColumnButtonClick);
	cancelColumnButton.addEventListener("click", handleCancelColumnButtonClick);
	colorPickerInput.addEventListener("change", handleColorInputValueChange);
});
