const express = require("express");
const {validateToken} = require("../validateToken");
const router = express.Router();


router.get('/', validateToken, (req, res) => {
    return res.status(200).json({ message: 'Token is valid' });
});

module.exports = router;