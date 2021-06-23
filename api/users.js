const express = require('express');
const usersRouter = express.Router();


usersRouter.get('/me', requireUser, async (req, res, next) => {

    try {
        res.send(req.user)
    } catch (error) {
        next(error);
    }

});


module.exports = usersRouter;