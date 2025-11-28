const router= require('express').Router()
const verifyToken= require('../middlewares/authMiddleware')
const roleCheck= require('../middlewares/roleMiddleware')
const verifyEmployee= require('../middlewares/employeeAuthMiddleware')
const {employeeDashboard, changeEmployeePassword}= require('../controllers/employeeController')


const {createEmployee, getEmployees, updateEmployee, deleteEmployee}= require('../controllers/employeeController')

router.get('/', verifyToken, getEmployees)
router.post('/', verifyToken, roleCheck('admin'), createEmployee)
router.put('/:id', verifyToken, roleCheck('admin'), updateEmployee)
router.delete('/:id', verifyToken, roleCheck('admin'), deleteEmployee)
router.get('/me/tasks', verifyEmployee, employeeDashboard)
router.put('/me/change-password', verifyEmployee, changeEmployeePassword)


module.exports= router