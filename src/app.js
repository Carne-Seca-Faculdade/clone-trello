import { loadBackgroundColor } from "./services/BackgroundColor";
import { loadColumns } from "./services/Columns";
import Store from "./services/Store";

window.app = {
	store: Store,
};

window.addEventListener("DOMContentLoaded", () => {
	loadBackgroundColor();
	loadColumns();

	console.log("DOM SHOULD BE LOADED!");
});
