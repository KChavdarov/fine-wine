const {COOKIE_NAME} = require('../config/index');
const {body, validationResult} = require('express-validator');
const {isGuest} = require('../middleware/guards');
const {createToken} = require('../util/jwt');
const {sanitizeUserData} = require('../util/sanitizeUserData');
const {parseErrorMessage} = require('../util/parseError');


const router = require('express').Router();

router.get('/', async (req, res) => {
    const userService = req.storage.user;
    try {
        if (req.user) {
            const user = await userService.verifyUser(req.user._id);
            res.status(200).json(sanitizeUserData(user));
        } else {
            res.status(204).end();
        }
    } catch (error) {
        const errors = parseErrorMessage(error);
        res.status(400).json({message: errors});
    }
});


router.post('/register', isGuest(),
    body('firstName', 'Please enter your first name!').trim().notEmpty(),
    body('lastName', 'Please enter your last name!').trim().notEmpty(),
    body('address', 'Please enter your address!').trim().notEmpty(),
    body('email', 'Please enter a valid email!').trim().isEmail().notEmpty().normalizeEmail(),
    body('phone', 'Please enter a valid Bulgarian phone number!').matches(/^\+359\d{9}$/),
    body('password', 'Password must be at least 3 characters long!').trim().isLength({min: 3}),
    async (req, res) => {
        const userService = req.storage.user;
        try {
            const errors = Object.values(validationResult(req).mapped());
            if (errors.length > 0) {
                throw new Error(errors.map(error => error.msg).join('\n'));
            } else {
                const {firstName, lastName, email, phone, address, password} = req.body;
                const user = await userService.register({firstName, lastName, email, phone, address, password});
                const token = createToken({_id: user._id, email: user.email, _isAdmin: user._isAdmin});
                res.cookie(COOKIE_NAME, token, {httpOnly: true});
                res.status(201).json(sanitizeUserData(user));
            }
        } catch (error) {
            console.log(error);
            const errors = parseErrorMessage(error);
            res.status(406).json({message: errors});
        }
    }
);


router.post('/login', isGuest(), async (req, res) => {
    const userService = req.storage.user;
    try {
        const {email, password} = req.body;
        const user = await userService.login({email, password});
        const token = createToken({_id: user._id, email: user.email, _isAdmin: user._isAdmin});
        res.cookie(COOKIE_NAME, token, {httpOnly: true});
        res.status(201).json(sanitizeUserData(user));
    } catch (error) {
        const errors = parseErrorMessage(error);
        res.status(406).json({message: errors});
    }
});


router.get('/logout', (req, res) => {
    res.clearCookie(COOKIE_NAME);
    res.status(204).send({message: 'Logged out'});
});

module.exports = router;