const express = require('express');
const boardsRouter = express.Router();


boardsRouter.get('/', async (req, res, next) => {

    try {

    } catch (error) {
        next(error);
    }

});


module.exports = boardsRouter;