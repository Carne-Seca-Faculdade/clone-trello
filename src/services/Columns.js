import getFromLocalStorage from "../utils/getFromLocalStorage.js";

export function loadColumns() {
	console.log("CALLING COLUMNS");
	const columns = getFromLocalStorage("columns");
	app.store.columns = backgroundColor || [];
}
