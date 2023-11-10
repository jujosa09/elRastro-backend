const express = require('express')
const {uploadImageController} = require('../controllers/imageController')
const multer = require('multer')
const storage = multer.memoryStorage()

const parser = multer({storage: storage})

const routerImage = express.Router()

routerImage.post('/:id', parser.single('image'), uploadImageController)

module.exports = {
    routerImage
}