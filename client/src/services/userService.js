import * as http from './http';

const endpoint = http.endpoint + '/user';

export async function getUser() {
    const user = await http.get(endpoint);
    return user;
}

export async function register(data) {
    const user = await http.post(endpoint + '/register', data);
    return user;
}

export async function login(data) {
    const user = await http.post(endpoint + '/login', data);
    return user;
}

export async function logout() {
    const user = await http.get(endpoint + '/logout');
    return user;
}

export async function updateUser(data) {
    const user = await http.patch(endpoint, data);
    return user;
}

export async function addFavorite(userId, wineId) {
    const user = await http.post(endpoint + `/${userId}/favorites/`, {wineId});
    return user;
}

export async function removeFavorite(userId, wineId) {
    const user = await http.del(endpoint + `/${userId}/favorites/${wineId}`);
    return user;
};

export async function getFavorites(userId) {
    const favorites = await http.get(endpoint + `/${userId}/favorites/`);
    return favorites;
}