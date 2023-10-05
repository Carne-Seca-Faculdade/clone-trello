export function updateLocalStorage(localStorageKey, data) {
	console.log(`Setting ${data} as content for key ${localStorageKey}`);
	const dataAsJson = JSON.stringify(data);
	localStorage.setItem(localStorageKey, dataAsJson);
}
