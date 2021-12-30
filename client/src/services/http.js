const environment = process.env.NODE_ENV;

const endpoints = {
    development: 'http://localhost:5000/api',
    production: 'https://fine-wine-app.herokuapp.com/api',
};

export const endpoint = endpoints[environment];

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
        if (data instanceof FormData) {
            options.body = data;
        } else {
            options.headers['Content-Type'] = 'application/json';
            options.body = JSON.stringify(data);
        }

    }
    return options;
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