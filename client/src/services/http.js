export const endpoint = 'http://localhost:5000/api';

async function request(url, options) {
    try {
        const response = await fetch(url, options);

        if (response.ok === false) {
            const error = await response.json();
            throw error;
        }

        try {
            return await response.json();
        } catch {
            return null;
        }

    } catch (error) {
        throw error;
    }
}

function createOptions(method = 'GET', data) {
    const options = {
        method,
        credentials: 'include',
        headers: {}
    };
    if (data) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }
    return options;
}

function parseMessage(body) {
    if (body && body.message) {

    }
    if (body && body.payload) {
        return body.payload;
    } else {
        return body;
    }
}

export async function get(url) {
    return await request(url, createOptions());
}

export async function post(url, data) {
    return await request(url, createOptions('POST', data));
}

export async function put(url, data) {
    return await request(url, createOptions('PUT', data));
}

export async function patch(url, data) {
    return await request(url, createOptions('PATCH', data));
}

export async function del(url) {
    return await request(url, createOptions('DELETE'));
}