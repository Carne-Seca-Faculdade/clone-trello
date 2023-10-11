// CRIANDO STORE
// CRIANDO OBJETO QUE VAI ARMAZENAR OS DADOS
const Store = {
	backgroundColor: null,
	columns: null,
};

window.app = {
	store: Store,
};

// FUNÇÕES DE ACESSO AO LOCALSTORAGE
// FUNÇÃO QUE PEGA UM ITEM DO LOCALSTORAGE
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

// FUNÇÃO QUE ATUALIZA UM ITEM DO LOCALSTORAGE
function updateLocalStorage(localStorageKey, data) {
	console.log(`Setting ${data} as content for key ${localStorageKey}`);
	const dataAsJson = JSON.stringify(data);
	localStorage.setItem(localStorageKey, dataAsJson);
}

// FUNÇÕES DE CARREGAMENTO DE DADOS
// FUNÇÃO QUE CARREGA A COR DE FUNDO
function loadBackgroundColor() {
	const backgroundColor = getFromLocalStorage("backgroundColor");
	const colorPickerInput = document.querySelector("#colorPickerInput");

	if (!backgroundColor) {
		return;
	}

	app.store.backgroundColor = backgroundColor;
	colorPickerInput.value = backgroundColor;
	document.body.style.backgroundColor = backgroundColor;
}

// FUNÇÃO QUE CARREGA AS COLUNAS
function loadColumns() {
	const columns = getFromLocalStorage("columns");
	app.store.columns = columns || [];
}

// FUNÇÕES DE MUDANÇA DE COR DE FUNDO
// FUNÇÃO RESPONSÁVEL POR MUDAR A COR DE FUNDO
function handleColorInputValueChange(event) {
	const inputColorValue = event.target.value;
	console.log("The color picked is ", inputColorValue);
	document.body.style.backgroundColor = inputColorValue;
	updateLocalStorage("backgroundColor", inputColorValue);
}

// FUNÇÕES DAS COLUNAS
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
	const createColumnInput = document.querySelector(".create-column__input");
	console.log("Column creation was canceled");
	handleCreateColumnToggle();
	createColumnInput.value = "";
}

function handleCreateColumnToggle() {
	const createColumnForm = document.querySelector(".create-column");
	const createColumnButton = document.querySelector(".create-column-button");
	createColumnForm.classList.toggle("hidden");
	createColumnButton.classList.toggle("hidden");
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

function editColumnTitleById(columnId) {
	console.log("Editing column with id", columnId);
	const newColumnTitle = prompt("Digite o novo nome da coluna").trim();
	console.log("The new column title is", newColumnTitle);

	if (!newColumnTitle) {
		alert("Forneça um nome para a coluna");
		return;
	}

	const allColumns = window.app.store.columns;
	const columnToEdit = allColumns.find((column) => column.id === columnId);

	if (!columnToEdit) {
		alert("Coluna não encontrada");
		return;
	}

	columnToEdit.title = newColumnTitle;
	updateLocalStorage("columns", allColumns);
	renderColumns();
}

function renderColumns() {
	const columnsContainer = document.querySelector(".columns");
	columnsContainer.innerHTML = "";

	const columns = window.app.store.columns;
	if (columns.length === 0) {
		handleCreateColumnToggle();
	}

	if (columns && columns.length > 0) {
		const columnsHTML = columns.map(getColumnHTML).join("");
		columnsContainer.innerHTML = columnsHTML;
	}
}

// FUNÇÕES DAS TAREFAS
function createTask(columnId) {
	console.log("create task ", columnId);
	const createTaskInput = document.querySelector(".create-task-form__input");
	const taskContent = createTaskInput.value.trim();

	if (!taskContent) {
		alert("Forneça um nome para a tarefa");
		return;
	}

	const newTask = {
		id: Date.now(),
		content: String(taskContent),
	};

	console.log(columnId);

	const allColumns = window.app.store.columns;
	const columnToAddTask = allColumns.find((column) => column.id === columnId);

	if (!columnToAddTask) {
		alert("Coluna não encontrada");
		return;
	}

	columnToAddTask.tasks.push(newTask);
	updateLocalStorage("columns", allColumns);
	renderColumns();
}

function editTaskContentById(taskId, columnId) {
	const allColumns = window.app.store.columns;
	const columnToEditTask = allColumns.find((column) => {
		console.log(column);
		return column.id === columnId;
	});

	if (!columnToEditTask) {
		alert("Coluna não encontrada");
		return;
	}

	const taskToEdit = columnToEditTask.tasks.find(
		(task) => task.id === taskId
	);

	if (!taskToEdit) {
		alert("Tarefa não encontrada");
		return;
	}

	const newTaskContent = prompt("Digite o novo nome da tarefa").trim();
	console.log("The new task content is", newTaskContent);

	if (!newTaskContent) {
		alert("Forneça um nome para a tarefa");
		return;
	}

	taskToEdit.content = newTaskContent;
	renderColumns();
}

function deleteTaskById(taskId, columnId) {
	const allColumns = window.app.store.columns;
	const columnToEditTask = allColumns.find(
		(column) => column.id === columnId
	);

	console.log(columnId);

	if (!columnToEditTask) {
		alert("Coluna não encontrada");
		return;
	}

	const tasksWithoutDeleted = columnToEditTask.tasks.filter(
		(task) => task.id !== taskId
	);

	columnToEditTask.tasks = tasksWithoutDeleted;
	renderColumns();
}

function handleAddTaskButtonClick(columnId) {
	event.preventDefault();
	console.log("Add task button was clicked");
	const createTaskForm = document.querySelector(".create-task-form");
	const createTaskInput = document.querySelector(".create-task-form__input");
	const taskContent = createTaskInput.value.trim();
	console.log("The task name is", taskContent);
	createTask(taskContent, columnId);
	createTaskForm.remove();
}

function handleCreateTaskButtonClick(columnId) {
	console.log("Create task button was clicked");
	console.log(columnId);
	const columnContainer = document.querySelector(`#column-${columnId}`);
	console.log(columnContainer);
	const createTaskButton = document.querySelector(
		`#create-task-button-${columnId}`
	);
	createTaskButton.classList.toggle("hidden");
	const createTaskFormHTML = getCreateTaskFormHTML(columnId);

	columnContainer.innerHTML += createTaskFormHTML;
}

function handleCancelTaskButtonClick(columnId) {
	const createTaskForm = document.querySelector(".create-task-form");
	const createTaskButton = document.querySelector(
		`#create-task-button-${columnId}`
	);
	console.log("Task creation was canceled");
	createTaskForm.remove();
	createTaskButton.classList.toggle("hidden");
}

// FUNÇÕES DE GERAR HTML
function getColumnHTML(column) {
	return `
		<div class="column" id="column-${column.id}">
			<div class="column__header">
				<span class="column__title">${column.title}</span>	
				<div class="column__options">
					<button onclick="editColumnTitleById(${column.id})">
						<i class="fa-solid fa-pencil"></i>
					</button>
					<button onclick="deleteColumnById(${column.id})">
						<i class="fa-regular fa-trash-can"></i>
					</button>
				</div>
			</div>
			<section class="column__tasks" id="tasks-${column.id}">${column.tasks
		.map((task) => getColumnTaskHTML(task, column.id))
		.join("")}</section>
			<button class="column__create-button"
			id="create-task-button-${column.id}" onclick="handleCreateTaskButtonClick(${
		column.id
	})" >
				<i class="fa-solid fa-plus"></i>
				<span>Adicionar tarefa</span>
			</button>
		</div>
	`;
}

function getColumnTaskHTML(task, columnId) {
	console.log("the task received is ", task);
	return `
		<article class="task" id="${task.id}">
			<span class="task__title">${task.content}</span>
			<div class="task__options">
				<button onclick="editTaskContentById(${task.id},${columnId})">
					<i class="fa-solid fa-pencil"></i>
				</button>
				<button onclick="deleteTaskById(${task.id},${columnId})">
					<i class="fa-regular fa-trash-can"></i>
				</button>
			</div>
		</article>
	`;
}

function getCreateTaskFormHTML(columnId) {
	return `
	<div class="create-task-form" id="create-task-form-${columnId}">
		<input
			id="create-task-form-input"
			placeholder="Conteúdo da tarefa..."
			class="create-task-form__input"
		/>
		<div class="create-task-form__buttons">
			<button class="create-task-form__add" onclick="createTask(${columnId})">Adicionar tarefa</button>
			<button class="create-task-form__cancel" onclick="handleCancelTaskButtonClick(${columnId})">
				<i class="fa-solid fa-xmark"></i>
			</button>
		</div>
	</div>
	`;
}

// FUNÇÃO QUE INICIALIZA O APP
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
