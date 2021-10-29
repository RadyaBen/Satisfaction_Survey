const getListFromLocalStorage = (key) => {
	return JSON.parse(localStorage.getItem(key) || '[]');
}

export {
    getListFromLocalStorage
};