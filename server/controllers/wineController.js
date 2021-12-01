const {parseErrorMessage} = require('../util/parseError');

const router = require('express').Router();

router.get('/categories', async (req, res) => {
    const wineService = req.storage.wineService;
    try {
        const categories = await wineService.getCategories();
        res.status(200).json(categories);
    } catch (error) {
        const errors = parseErrorMessage(error);
        res.status(400).json(errors);
    }
});

router.get('/', async (req, res) => {
    const wineService = req.storage.wineService;
    try {
        const wines = await wineService.getAll(req.query);
        wineService.getCategories();
        res.status(200).json(wines);
    } catch (error) {
        const errors = parseErrorMessage(error);
        res.status(400).json(errors);
    }
});

router.get('/:id', async (req, res) => {
    const wineService = req.storage.wineService;
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