///below functoin from Juicebox

function requireUser(req, res, next) {
    if (!req.user) {
        next({
            name: "MissingUserError",
            message: "You must be logged in to perform this action"
        });
    }

    next();
}

//We'll aslo need a require admin
function requireAdmin(req, res, next) {


    next();
}

module.exports = {
    requireUser,
    requireAdmin
}