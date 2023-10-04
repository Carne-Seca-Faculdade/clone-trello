export function getFromLocalStorage(localStorageKey) {
	const dataFromLocalStorage = localStorage.getItem(localStorageKey);
	if (dataFromLocalStorage) {
		const dataAsJson = JSON.parse(dataFromLocalStorage);
		return dataAsJson;
	}
	return null;
}
