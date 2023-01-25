const User = require("../schema/User");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
router.post('/', async (req, res) => {
    try {
        const { email, dob, password } = req.body;
        let user = await User.findOne({email});

        if (user) {
            throw new Error('Adresse email déjà utilisée');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({ email, dob, password: hashedPassword });
        await user.save();
        res.status(201).send();
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
});

module.exports = router;