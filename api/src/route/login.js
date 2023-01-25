const User = require("../schema/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require('express');
require("dotenv").config();
const router = express.Router();
router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error('Utilisateur non trouvé');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new Error('Mot de passe incorrect');
        }

        const token = jwt.sign({ userId: user._id },process.env.JWT_KEY,{
            expiresIn: '1d'
        });

        res.send({ token });

    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;