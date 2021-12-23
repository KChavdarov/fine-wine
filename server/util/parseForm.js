const formidable = require('formidable');

function parseForm(req) {
    const form = formidable({multiples: true});
    return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) {
                reject(err);
            } else {
                let images = Object.values(files);
                resolve([fields, images]);
            }
        });
    });
}

module.exports = {
    parseForm
};