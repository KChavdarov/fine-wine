import * as http from './http';

const endpoint = http.endpoint + '/order';

export async function createOrder(data) {
    const order = await http.post(endpoint, data);
    return order;
}