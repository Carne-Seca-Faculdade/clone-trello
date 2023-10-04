export function setToLocalStorage(localStorageKey, data) {
	const dataAsJson = JSON.stringify(data);
	localStorage.setItem(localStorageKey, dataAsJson);
}
