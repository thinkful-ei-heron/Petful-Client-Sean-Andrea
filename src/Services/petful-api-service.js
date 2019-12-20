import config from '../config';

const PetfulApi = {
	url: config.API_ENDPOINT,

	getAllCats() {
		return fetch(this.url + '/cats/allCats', {}).then(
			(res) => (!res.ok ? res.json().then((e) => Promise.reject(e)) : res.json())
		);
	},
	adoptCat() {
		return fetch(this.url + '/cats/allCats', { method: 'DELETE' }).then((res) => {
			if (!res.ok) {
				return res.json().then((e) => Promise.reject(e));
			}
			return res.json();
		});
	},
	getAllDogs() {
		return fetch(this.url + '/dogs/allDogs', {}).then(
			(res) => (!res.ok ? res.json().then((e) => Promise.reject(e)) : res.json())
		);
	},
	adoptDog() {
		return fetch(this.url + '/dogs/allDogs', { method: 'DELETE' }).then((res) => {
			if (!res.ok) {
				return res.json().then((e) => Promise.reject(e));
			}
			return res.json();
		});
	}
};

export default PetfulApi