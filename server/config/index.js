const environment = 'development';

const config = {
    development: {
        PORT: 5000,
        DB_CONNECTION_STRING: 'mongodb://localhost:27017/fine-wine',
        COOKIE_NAME: 'X-Authorization',
        TOKEN_SECRET: 'proper secret 123',
        SALT_ROUNDS: 10,
        CORS: {
            origin: ['http://localhost:3000'],
            credentials: true
        },
        CLOUDINARY: {
            cloud_name: 'dm2dq27dn',
            api_key: '675932744897211',
            api_secret: '15ylVjWRAr09g5hcnQ43CSrFjxs',
        }
    },
    production: {},
};

module.exports = config[environment];