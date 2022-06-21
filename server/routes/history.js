const express = require('express')
const HistoryController = require('../controllers/historyController')
const router = express.Router()

router.get('/:userId', HistoryController.getHistories)

module.exports = router