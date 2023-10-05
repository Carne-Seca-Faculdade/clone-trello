import { loadBackgroundColor } from "./services/BackgroundColor.js";
import { loadColumns } from "./services/Columns.js";
import Store from "./services/Store.js";

window.app = {
	store: Store,
};

window.addEventListener("DOMContentLoaded", () => {
	loadBackgroundColor();
	loadColumns();

	console.log("DOM should be loaded");
});
