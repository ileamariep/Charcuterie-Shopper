const express = require('express');
const usersRouter = express.Router();


usersRouter.get('/', async (req, res, next) => {

    try {

    } catch (error) {
        next(error);
    }

});


module.exports = usersRouter;