const router = require('express').Router()
const CryptoJS = require('crypto-js')
const UserModel = require('../models/UserModel')
const jwt = require('jsonwebtoken')

// REGISTER
router.post("/register", async (req, res) => {
    const newUser = new UserModel(
        {
            ...req.body,
            password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()
        }
    )
    try {
        const user = await newUser.save()
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json(error.message)
    }
})


// LOGIN
router.post('/login', async (req, res) => {
    try {
        const user = await UserModel.findOne({ username: req.body.username })
        !user && res.status(401).json("Wrong password or username")
        const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY)
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8)

        originalPassword !== req.body.password &&
            res.status(401).json("Wrong password or username")

        const { password, ...info } = user._doc
        const accessToken = jwt.sign(
            info,
            process.env.SECRET_KEY,
            {
                expiresIn: "5d"
            })
        res.status(200).json({ "token": accessToken })

    } catch (error) {
        res.status(500).json(error.message)
    }
})

module.exports = router