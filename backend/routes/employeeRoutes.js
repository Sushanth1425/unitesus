const router= require('express').Router()
const verifyToken= require('../middlewares/authMiddleware')
const roleCheck= require('../middlewares/roleMiddleware')

const {createEmployee, getEmployees, updateEmployee, deleteEmployee}= require('../controllers/employeeController')

router.get('/', verifyToken, getEmployees)
router.post('/', verifyToken, roleCheck('admin'), createEmployee)
router.put('/:id', verifyToken, roleCheck('admin'), updateEmployee)
router.delete('/:id', verifyToken, roleCheck('admin'), deleteEmployee)

module.exports= router