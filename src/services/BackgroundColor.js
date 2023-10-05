import getFromLocalStorage from "../utils/getFromLocalStorage.js";

export function loadBackgroundColor() {
	console.log("CALLING LOADBACKGROUND");
	const backgroundColor = getFromLocalStorage("backgroundColor");
	app.store.backgroundColor = backgroundColor;
}
