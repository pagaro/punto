const jwt = require("jsonwebtoken");
require("dotenv").config();

function validateToken(req, res, next) {
    // Récupération du token depuis l'en-tête d'autorisation
    const token = req.headers.authorization.split(' ')[1];
    console.log(token)
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        // Vérification de la validité du token
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userId = decoded.id;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }
}

exports.validateToken = validateToken
// export default validateToken();