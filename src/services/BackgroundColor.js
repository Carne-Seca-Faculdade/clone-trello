import { getFromLocalStorage } from "../utils/getFromLocalStorage.js";

export function loadBackgroundColor() {
	const backgroundColor = getFromLocalStorage("backgroundColor");
	app.store.backgroundColor = backgroundColor;
}
