import { getFromLocalStorage } from "../utils/getFromLocalStorage.js";

export function loadColumns() {
	const columns = getFromLocalStorage("columns");
	app.store.columns = columns || [];
}
