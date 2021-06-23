const express = require('express');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

//Routers
const apiRouter = express.Router();
const usersRouter = require('./users');
const ingredientsRouter = require('./ingredients');
const boardsRouter = require('./boards');
const reviewsRouter = require('./reviews');

apiRouter.use(async (req, res, next) => {
    const prefix = 'Bearer ';
    const auth = req.header('Authorization');

    if (!auth) {
        next();
    } else if (auth.startsWith(prefix)) {
        const token = auth.slice(prefix.length);

        try {
            const parsedToken = jwt.verify(token, JWT_SECRET);
            const id = parsedToken && parsedToken.id
            if (id) {
                //   req.user = await getUserById(id);
                next();
            }
        } catch ({ name, message }) {
            next({ name, message });
        }
    } else {
        next({
            name: 'AuthorizationHeaderError',
            message: `Authorization token must start with ${prefix}`
        });
    }
});


apiRouter.use('/users', usersRouter);
apiRouter.use('/ingredients', ingredientsRouter);
apiRouter.use('/boards', boardsRouter);
apiRouter.use('/reviews', reviewsRouter);



module.exports = apiRouter;