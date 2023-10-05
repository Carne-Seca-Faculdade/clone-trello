import {
	handleColorInputValueChange,
	loadBackgroundColor,
} from "./services/BackgroundColor.js";
import { loadColumns } from "./services/Columns.js";
import Store from "./services/Store.js";

window.app = {
	store: Store,
};

window.addEventListener("DOMContentLoaded", () => {
	loadBackgroundColor();
	loadColumns();

	const colorPickerInput = document.querySelector("#colorPickerInput");

	colorPickerInput.addEventListener("change", handleColorInputValueChange);
});
