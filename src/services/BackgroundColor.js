import { getFromLocalStorage } from "../utils/getFromLocalStorage.js";
import { updateLocalStorage } from "../utils/updateLocalStorage.js";

export function loadBackgroundColor() {
	const backgroundColor = getFromLocalStorage("backgroundColor");
	app.store.backgroundColor = backgroundColor;
	document.body.style.backgroundColor = backgroundColor;
}

export function handleColorInputValueChange(event) {
	const inputColorValue = event.target.value;
	console.log("The color picked is ", inputColorValue);
	document.body.style.backgroundColor = inputColorValue;
	updateLocalStorage("backgroundColor", inputColorValue);
}
