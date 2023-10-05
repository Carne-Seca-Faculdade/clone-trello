import {
	handleColorInputValueChange,
	loadBackgroundColor,
} from "./services/BackgroundColor.js";
import {
	handleAddColumnButtonClick,
	handleCancelColumnButtonClick,
	handleCreateColumnButtonClick,
	loadColumns,
	renderColumns,
} from "./services/Columns.js";
import Store from "./services/Store.js";

window.app = {
	store: Store,
};

console.log(app.store);

window.addEventListener("DOMContentLoaded", () => {
	loadBackgroundColor();
	loadColumns();
	renderColumns();

	const colorPickerInput = document.querySelector("#colorPickerInput");
	const createColumnButton = document.querySelector(".create-column-button");
	const addColumnButton = document.querySelector(".create-column__add");
	const cancelColumnButton = document.querySelector(".create-column__cancel");
	const columns = document.querySelector(".columns");

	createColumnButton.addEventListener("click", handleCreateColumnButtonClick);
	addColumnButton.addEventListener("click", handleAddColumnButtonClick);
	cancelColumnButton.addEventListener("click", handleCancelColumnButtonClick);
	colorPickerInput.addEventListener("change", handleColorInputValueChange);
});
