const express = require("express");
const router = express.Router();
const CategoryController = require('../controllers/categoriesController')

router.get('/', CategoryController.getCategories)

module.exports = router
