const router= require('express').Router()
const verifyToken= require('../middlewares/authMiddleware')

const {dashboardData}= require('../controllers/dashboardController')

router.get('/', verifyToken, dashboardData)

module.exports= router