import * as http from './http';

const endpoint = http.endpoint + '/user';

export async function register(data) {
    console.log(data);
    // const user = await http.post(endpoint + '/register', data);
    // return user;
}