const router= require('express').Router()

const {registerAuth, loginAuth}= require('../controllers/authController')

router.post('/register', registerAuth)
router.post('/login', loginAuth)

module.exports= router