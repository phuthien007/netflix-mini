const express = require('express')
const router = express.Router()
const MovieModel = require('../models/MovieModel')
const verifyToken = require('../verifyToken')


// GET
router.get('/', verifyToken, async (req, res) => {
    let allMovie = await MovieModel.find({})
    if (allMovie) {
        res.status(200).json(allMovie)
    } else {
        res.status(400).json("Something went wrong")
    }
})
// GET BY ID
router.get('/:id', verifyToken, async (req, res) => {
    try {
        let movie = await MovieModel.findById(req.params.id)
        if (movie) {
            res.status(200).json(movie)
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
        const newMovie = await MovieModel.create(req.body)
        if (newMovie) {
            res.json(newMovie)
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
        const updateMovie = await MovieModel.findByIdAndUpdate(req.params.id, req.body, { "new": true })
        res.json(updateMovie)
    } catch (error) {
        res.status(500).json(error.message)
    }
})
// DELETE
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const deleteMovie = await MovieModel.findByIdAndDelete(req.params.id)
        res.json(deleteMovie)
    } catch (error) {
        res.status(500).json(error.message)
    }
})

module.exports = router