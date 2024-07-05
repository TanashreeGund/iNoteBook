const jwt = require('jsonwebtoken');
const JWT_SECRET = 'itisaiNotebookApp'

const fetchUser = (req, res, next) => {
    // get user form jwt token and add id to request object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please authenticate using valid email" });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    }
    catch (error) {
        res.status(401).send({ error: "Please authenticate using valid email" });
    }
}

module.exports = fetchUser;