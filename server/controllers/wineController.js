const {parseErrorMessage} = require('../util/parseError');
const {parseForm} = require('../util/parseForm');
const {uploadImage} = require('../util/cloudinary');

const router = require('express').Router();

router.get('/categories', async (req, res) => {
    const wineService = req.storage.wine;
    try {
        const categories = await wineService.getCategories();
        res.status(200).json(categories);
    } catch (error) {
        const errors = parseErrorMessage(error);
        res.status(400).json(errors);
    }
});

router.get('/', async (req, res) => {
    const wineService = req.storage.wine;
    try {
        const wines = await wineService.getAll(req.query);
        res.status(200).json(wines);
    } catch (error) {
        const errors = parseErrorMessage(error);
        res.status(400).json(errors);
    }
});

router.post('/', async (req, res) => {
    const wineService = req.storage.wine;
    const userId = req.user._id;
    try {
        const images = [];
        let [data, files] = await parseForm(req);

        for (const file of files) {
            if (file.mimetype.startsWith('image/')) {
                const image = await uploadImage(file.filepath);
                const url = image.url;
                console.log(image);
                images.push(url);
            }
        }

        if (images.length == 0) {
            throw new Error('Please upload at least one image!');
        }

        const {
            brand,
            name,
            description,
            type,
            grape,
            country,
            region,
            year,
            volume,
            basePrice,
            discountPercentage,
        } = data;

        const wineData = {
            brand,
            name,
            description,
            type: type.toLocaleLowerCase(),
            grape: typeof grape === 'string' ? [grape.toLocaleLowerCase()] : grape.map(g => g.toLocaleLowerCase()),
            country: country.toLocaleLowerCase(),
            region: region.toLocaleLowerCase(),
            year: Number(year),
            volume: Number(volume),
            basePrice: Number(basePrice),
            discountPercentage: Number(discountPercentage),
            _creator: userId,
            image: images[0]
        };

        const wine = await wineService.create(wineData);
        res.status(201).json(wine);
    } catch (error) {
        const errors = parseErrorMessage(error);
        res.status(400).json(errors);
    }
});

router.get('/latest', async (req, res) => {
    const wineService = req.storage.wine;
    try {
        const wines = await wineService.getLatest(req.query);
        res.status(200).json(wines);
    } catch (error) {
        const errors = parseErrorMessage(error);
        res.status(400).json(errors);
    }
});

router.get('/:id', async (req, res) => {
    const wineService = req.storage.wine;
    const wineId = req.params.id;
    try {
        const wine = await wineService.getOne(wineId);
        res.status(200).json(wine);
    } catch (error) {
        const errors = parseErrorMessage(error);
        res.status(400).json(errors);
    }
});

module.exports = router;