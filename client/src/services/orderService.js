import * as http from './http';

const endpoint = http.endpoint + '/order';

export async function getOrder(id) {
    const order = await http.get(endpoint + '/' + id);
    return order;
}

export async function createOrder(data) {
    const order = await http.post(endpoint, data);
    return order;
}

export async function getOrders(query = '') {
    const orders = await http.get(endpoint + '?' + query);
    return orders;
}