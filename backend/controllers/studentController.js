const asyncHandler = require("express-async-handler");
const Student = require("../models/StudentModel");

const registerStudent = asyncHandler(async (req, res) => {
  const {
    student_name,
    fathers_name,
    mothers_name,
    email,
    phone_number,
    address
  } = req.body;

  let date = new Date();
  //let student_id=student_name.substring(0,3)+'/'+date.getDate()+'/'+date.getHours+'/'+date.getMinutes;
  let student_id =
    student_name.substring(0, 3) +
    "/" +
    date.getDate() +
    "/" +
    date.getMonth() +
    "/" +
    date.getFullYear() +
    "/" +
    date.getMinutes() +
    "/" +
    date.getSeconds();
  console.log(student_id);

  if (
    student_name &&
    fathers_name &&
    mothers_name &&
    email &&
    phone_number &&
    address
  ) {
    try {
      const student = await Student.create({
        student_id,
        student_name,
        fathers_name,
        mothers_name,
        email,
        phone_number,
        user: req.user._id,
        address
      });

      if (student) {
        res.status(201).json({
          status:"success",
          _id: student._id,
          student_id:student.student_id,
          student_name: student_name
        });
      }
    } catch (error) {
      res.status(400).json({status:"fail"});
      throw new Error("Unable to add sudent");
    }
  } else {
    res.status(400).json({status:"fail"});
    throw new Error("All fields are not filled up");
  }
});

//Edit Student
const editStudent =asyncHandler (async (req, res) => {
  const { student_name, fathers_name, mothers_name,email,phone_number, address } = req.body;
 
  const query = { _id: req.params.id };
 
  const updateDocuments = {
    $set: { 
      student_name: student_name,
      fathers_name:fathers_name,
      mothers_name:mothers_name,
      email:email,
      phone_number:phone_number,
      address:address
    }
  };

  try {
    const editStudent = await Student.updateOne(query, updateDocuments);
    if (editStudent) {
    res.status(201).json({status:"success"});
    }
  } catch (error) {
    res.status(400).json({status:"fail"});
    throw new Error("Unable to Update class");
  }
});



const updateAllClass=asyncHandler(async(req,res)=>{
 
  const {studentidar,class_details}=req.body;
  const query={student_id:{$in:studentidar }}
  console.log(studentidar)
  const updateDocuments = {
    $set: { class_details: class_details}
  };

  try {
    const updateallclass = await Student.updateMany(query, updateDocuments);
    if (updateallclass) {
      res.status(201).json({status:"success"});
    }
  } catch (error) {
    res.status(400).json({status:"fail"});
    throw new Error("Unable to Update class");
  }

})

const updateCLass =asyncHandler (async (req, res) => {
  const { classupdate } = req.body;
 // console.log(classupdate)
  const query = { _id: req.params.id };
  //const query = { _id: {$in:[req.params.id]} };
  const updateDocuments = {
    $set: { class_details: classupdate}
  };

  try {
    const updateclass = await Student.updateOne(query, updateDocuments);
    if (updateclass) {
    res.status(201).json({status:"success"});
    }
  } catch (error) {
    res.status(400).json({status:"fail"});
    throw new Error("Unable to Update class");
  }
});

const getStudents=asyncHandler(async(req,res)=>{
    const students=await Student.find().select(['student_name','student_id','student_name','fathers_name','mothers_name','phone_number','email','address','class_details'])
    res.status(200).json(students)
})

//Get all students of a class of the
const getStudentsQuery=asyncHandler(async(req,res)=>{
  console.log(req.query.className)
  const students=await Student.find({$and:[{"class_details.class_name":req.query.class_name},{"class_details.session":req.query.session},{"class_details.section":req.query.section}]})
  res.status(200).json(students)
})

module.exports = { registerStudent,editStudent, updateCLass,getStudents,getStudentsQuery,updateAllClass };
