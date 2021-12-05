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