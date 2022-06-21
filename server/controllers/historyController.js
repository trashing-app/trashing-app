const { History } = require('../models')

class HistoryController {
  static async getHistories(req, res, next){
    try {
      const userId = +req.params.userId
      const histories = await History.findAll({
        where:{
          userId
        }
      })
      res.status(200).json(histories)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = HistoryController