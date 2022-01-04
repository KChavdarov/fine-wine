const environment = process.env.NODE_ENV || 'development';

const config = {
    development: {
        PORT: process.env.PORT || 5000,
        DB_CONNECTION_STRING: process.env.DB_CONNECTION_FINE_WINE,
        COOKIE_NAME: 'X-Authorization',
        TOKEN_SECRET: 'proper secret 123',
        SALT_ROUNDS: 10,
        CORS: {
            origin: ['http://localhost:3000'],
            credentials: true
        },
        CLOUDINARY: {
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_KEY,
            api_secret: process.env.CLOUDINARY_SECRET,
        }
    },
    production: {
        PORT: process.env.PORT || 80,
        DB_CONNECTION_STRING: process.env.DB_CONNECTION,
        COOKIE_NAME: 'X-Authorization',
        TOKEN_SECRET: 'proper secret 123',
        SALT_ROUNDS: 10,
        CORS: {
            origin: ['http://fine-wine-app.herokuapp.com'],
            credentials: true
        },
        CLOUDINARY: {
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_KEY,
            api_secret: process.env.CLOUDINARY_SECRET,
        }
    },
};

// mongodb+srv://kirencevr:YkhQpGf5TBwk4Q8@prod-aws-shared.jw4l2.mongodb.net/fine-wine?retryWrites=true&w=majority

module.exports = config[environment];