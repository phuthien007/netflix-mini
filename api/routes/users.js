const router = require('express').Router();
const UserModel = require('../models/UserModel')
const CryptoJS = require('crypto-js');
const verify = require('../verifyToken');


// UPDATE 

router.patch('/:id', verify, (req, res) => {
    if (req.user._id === req.params.id || req.user.isAdmin) {
        if (req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(
                req.body.password,
                process.env.SECRET_KEY
            ).toString()
        }
        try {
            UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
                .then(data => {
                    if (data) {
                        console.log(data)
                        res.json(data)
                    } else {
                        res.status(400).json("Something went wrong")
                    }
                })

        } catch (error) {
            res.status(500).json(error)
        }

    } else {
        res.status(403).json("You can update only your account!")
    }
})

// DELETE 
router.delete("/:id", verify, async (req, res) => {
    if (req.user.isAdmin) {
        UserModel.findByIdAndDelete(req.params.id)
            .then(data => {
                if (data) {
                    res.status(200).json(data)
                } else {
                    res.status(400).json("Cant delete")
                }
            }).catch(err => {
                res.status(400).json(err.message)
            })
    } else {
        res.status(403).json("You can delete or not authorization")
    }
})
// GET
router.get("/:id", verify, async (req, res) => {
    if (req.user._id === req.params.id || req.user.isAdmin) {
        currentUser = await UserModel.findById(req.params.id)
        if (currentUser) {
            res.json(currentUser)
        } else {
            res.status(401).json("Not found by id: " + req.params.id)
        }
    } else {
        res.status(403).json("You can delete or not authorization")

    }
})

// GET ALL 
router.get("/", verify, async (req, res) => {
    if (req.user.isAdmin) {
        UserModel.find({})
            .then(data => {
                if (data) {
                    res.status(200).json(data)
                } else {
                    res.status(400).json("Something went wrong")
                }
            }).catch(err => {
                res.status(400).json(err.message)
            })
    } else {
        res.status(403).json("You can delete or not authorization")
    }
})

// GET USER STAT


module.exports = router