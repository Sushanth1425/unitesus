const router= require('express').Router()
const verifyToken= require('../middlewares/authMiddleware')
const roleCheck= require('../middlewares/roleMiddleware')

const {createTask, getTasks, updateTask, deleteTask}= require('../controllers/taskController')

router.get('/', verifyToken, getTasks);
router.post('/', verifyToken, roleCheck('admin'), createTask);
router.put('/:id', verifyToken, roleCheck('admin'), updateTask);
router.delete('/:id', verifyToken, roleCheck('admin'), deleteTask);

module.exports= router