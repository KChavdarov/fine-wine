const isAuth = () => (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.status(401).json({message: ['Please sign in!']});
    }
};

const isGuest = () => (req, res, next) => {
    if (req.user) {
        res.status(400).json({message: ['You are already signed in!']});
    } else {
        next();
    }
};

const isAdmin = () => (req, res, next) => {
    if (req.user && res.user.isAdmin) {
        next();
    } else {
        res.status(403).json({message: ['You are not an administrator']});
    }
};

const isOwner = () => (req, res, next) => {
    const item = req.data;
    if (!req.data) {
        res.status(404).json({message: ['Item not found']});
    } else if (req.user && ((req.user._id == item._creator) || req.user._isAdmin)) {
        next();
    } else {
        res.status(403).json({message: ['You are not the owner of this item']});
    }
};

module.exports = {
    isAuth,
    isGuest,
    isAdmin,
    isOwner,
};