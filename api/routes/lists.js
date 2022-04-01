const express = require('express')
const router = express.Router()
const ListModel = require('../models/ListModel')
const verifyToken = require('../verifyToken')


// GET
router.get('/', verifyToken, async (req, res) => {
    console.log(req.query)
    let allList = await ListModel.find(req.query)
    if (allList) {
        res.status(200).json(allList)
    } else {
        res.status(400).json("Something went wrong")
    }
})
// GET BY ID
router.get('/:id', verifyToken, async (req, res) => {
    try {
        let List = await ListModel.findById(req.params.id)
        if (List) {
            res.status(200).json(List)
        } else {
            res.status(400).json("Something went wrong")
        }
    } catch (error) {
        res.status(500).json(error.message)
    }

})
// POST 
router.post('/', verifyToken, async (req, res) => {
    try {
        const newList = await ListModel.create(req.body)
        if (newList) {
            res.json(newList)
        } else {
            res.status(400).json("Something went wrong")
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
})
// UPDATE
router.put('/:id', verifyToken, async (req, res) => {
    try {
        const updateList = await ListModel.findByIdAndUpdate(req.params.id, req.body, { "new": true })
        res.json(updateList)
    } catch (error) {
        res.status(500).json(error.message)
    }
})
// DELETE
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const deleteList = await ListModel.findByIdAndDelete(req.params.id)
        res.json(deleteList)
    } catch (error) {
        res.status(500).json(error.message)
    }
})

module.exports = router