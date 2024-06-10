const authorizeRoles = (...permittedRoles) => {
    return (req, res, next) => {
        const userRole = req.payload.role; // Assuming `req.user` is set by previous auth middleware

        if (permittedRoles.includes(userRole)) {
            next();
        } else {
            return res.status(403).send({ message: "Forbidden: You don't have permission to access this resource." });
        }
    };
};
module.exports = authorizeRoles
