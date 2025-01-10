const express = require('express')
const { addCategory, getCategories } = require('../Controllers/categoryController')
const categoryRouter = express.Router()

categoryRouter.post('/add-category', addCategory)
categoryRouter.get('/get-categories', getCategories)

module.exports=categoryRouter