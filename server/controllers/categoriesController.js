const { Category } = require('../models')

class CategoryController {
  static async getCategories(req, res, next){
    try {
      const categories = await Category.findAll()
      if(categories.length === 0 || !categories || categories === undefined || Array.isArray(categories) === false) throw new Error('Not found')
      res.status(200).json(categories)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = CategoryController