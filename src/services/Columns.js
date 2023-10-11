import { getFromLocalStorage } from "../utils/getFromLocalStorage.js";
import { updateLocalStorage } from "../utils/updateLocalStorage.js";

export function loadColumns() {
	const columns = getFromLocalStorage("columns");
	app.store.columns = columns || [];
}

export function handleCreateColumnButtonClick() {
	console.log("Create column button was clicked");
	handleCreateColumnToggle();
}

export function handleAddColumnButtonClick() {
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

export function handleCancelColumnButtonClick() {
	console.log("Column creation was canceled");
	handleCreateColumnToggle();
}

export function handleCreateColumnToggle() {
	const createColumnForm = document.querySelector(".create-column");
	const createColumnButton = document.querySelector(".create-column-button");
	createColumnForm.classList.toggle("hidden");
	createColumnButton.classList.toggle("hidden");
}

export function renderColumns() {
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
