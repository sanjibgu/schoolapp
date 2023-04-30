const express=require('express')
const router=express.Router()
const {examAdd,addMarks,getExamMarksQuery}=require('../controllers/examController')
const protect=require('../middlewares/authmiddlewares')

router.route('/add').post(protect,examAdd)
router.route('/addmarks').put(protect,addMarks)
router.route('/exammarks').get(getExamMarksQuery)



module.exports=router;