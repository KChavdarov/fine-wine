const cloudinary = require('cloudinary').v2.uploader;

function uploadImage(image) {
    return new Promise((resolve, reject) => {
        cloudinary.upload(image, {folder: 'fine-wine'}, (err, response) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(response);
            }
        });
    });
}

module.exports = {
    uploadImage
};