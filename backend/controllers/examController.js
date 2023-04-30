const asyncHandler = require("express-async-handler");
const Exam = require("../models/ExamModel");

const examAdd = asyncHandler(async (req, res) => {
  const { exam_session, exam_type, class_name, section, subject } = req.body;

  let exam_id =
    exam_session +
    "/" +
    exam_type +
    "/" +
    subject +
    "/" +
    class_name +
    "/" +
    section;

  if (exam_session && exam_type && class_name && subject && section) {
    try {
      const exam = await Exam.create({
        exam_session,
        exam_type,
        class_name,
        section,
        subject,
        exam_id,
        user: req.user._id
      });

      if (exam) {
        res.status(201).json({
          _id: exam._id,
          exam_id: exam.exam_id,
          status: "success"
        });
      }
    } catch (error) {
      res.status(400).json({ status: "fail" });
      console.log(error);
      throw new Error("Unable to create exam");
    }
  } else {
    res.status(400).json({ status: "fail" });
    throw new Error("All fields are mandatory");
  }
});

//Get Exam Marks
const getExamMarksQuery = asyncHandler(async (req, res) => {
 
  // const fields=[ { "exam_session": req.query.exam_session },
  // { "class_name": req.query.class_name },
  // { "section": req.query.section },
  // { "subject": req.query.subject }]

  // const exam_marks = await Exam.find({$or:fields}).select(['exam_id']);
  //console.log(req.query)
  const exam_marks = await Exam.find({
    $and: [
      { "exam_session": req.query.exam_session },
      { "class_name": req.query.class_name },
      { "section": req.query.section },
      { "subject": req.query.subject },
      { "exam_type": req.query.exam_type }
    ]
  });
  // console.log(req.query.className)
  res.status(200).json(exam_marks);
  //console.log(exam_marks)

  //
  

});

const addMarks = asyncHandler(async (req, res) => {
  const { exam_id, marks } = req.body;

  const query = { exam_id: exam_id };
  console.log(exam_id, marks);
  const updateDocuments = {
    $set: {
      marks: marks
    }
  };

  try {
    const insertMarks = await Exam.updateMany(query, updateDocuments);
    if (insertMarks) {
      res.status(201).json({ status: "success" });
    }
  } catch (error) {
    res.status(400).json({ status: "fail" });
    //throw new Error("Unable to Update class");
    console.log(error);
  }
});

module.exports = { examAdd, getExamMarksQuery,addMarks };
