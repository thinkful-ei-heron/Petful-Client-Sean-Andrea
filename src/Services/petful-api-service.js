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
	},
	getAllUsers() {
		return fetch(this.usrl + '/users/', {}).then((res) => {
			if (!res.ok) {
				return res.json().then((e) => Promise.reject(e));
			}
			return res.json();
		});
	},
	addUserToQ(fullName) {
		return fetch(this.usrl + '/users/', {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify(fullName)
		}).then((res) => {
			if (!res.ok) {
				return res.json().then((e) => Promise.reject(e));
			}
			return res.json();
		});
	},
	removeUserFromQ() {
		return fetch(this.url + '/users', {
			method: 'DELETE'
		});
	}
};

export default PetfulApi;
