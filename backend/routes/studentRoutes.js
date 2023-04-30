const express=require('express')
const router=express.Router()
const{registerStudent,editStudent,updateCLass,updateAllClass,getStudents,getStudentsQuery}=require('../controllers/studentController')
const protect=require('../middlewares/authmiddlewares')

router.route('/register').post(protect,registerStudent)
router.route('/editstudent/:id').put(protect,editStudent)
router.route('/updateclass/:id').put(protect,updateCLass)
router.route('/updateallclass').put(protect,updateAllClass)
router.route('/students').get(protect,getStudents)
router.route('/studentsquery').get(protect,getStudentsQuery)



module.exports=router;