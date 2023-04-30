const mongoose = require("mongoose");

const examSchema = mongoose.Schema(
  {
    exam_session: {
      type: String,
      required: true
    },
    exam_type: {
      type: String,
      required: true
    },
    class_name: {
      type: String,
      required: true
    },
    section: {
      type: String,
      required: true
    },
    subject: {
      type: String,
      required: true,
    },
    exam_id: {
      type: String,
      required: true,
      unique:true
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true
    },
    
    marks: [
      {
        student_id: {
          type: String,
          required: true
        },
        student_name: {
          type: String,
          required: true
        },
        fathers_name: {
          type: String,
          required: true
        },
        mothers_name: {
          type: String,
          required: true
        },
        marks: { type: Number }
      }
    ]
  },
  {
    timestamps: true
  }
);

const Exam = mongoose.model("exam", examSchema);

module.exports = Exam;
