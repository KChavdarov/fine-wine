import * as http from './http';

const endpoint = 'http://localhost:5000/api/wine';

export async function getCategories() {
    const categories = await http.get(endpoint + '/categories');
    return categories;
}

export async function getOne(id) {
    const wine = await http.get(endpoint + '/' + id);
    return wine;
}

export async function getAll(query) {
    const wines = await http.get(endpoint + '?' + query);
    return wines;
}