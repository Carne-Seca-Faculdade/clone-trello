export function getFromLocalStorage(localStorageKey) {
	console.log(`Fetching ${localStorageKey} from localStorage`);
	const dataFromLocalStorage = localStorage.getItem(localStorageKey);
	console.log(
		"The data returned from localStorage is ",
		dataFromLocalStorage
	);
	if (dataFromLocalStorage) {
		const dataAsJson = JSON.parse(dataFromLocalStorage);
		return dataAsJson;
	}
	return null;
}
