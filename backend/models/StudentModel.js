const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
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
  email: {
    type: String,
    required: true
  },
  phone_number: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  address: {
    state: {
      type: String,
      required: true
    },
    district: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    pinCode: {
      type: Number,
      required: true
    }
  },
  class_details: {
    session: {
      type: String,
    },
    class_name: {
      type: String,
    },
    section: {
      type: String,
    }
  }
},
{
    timestamps: true,
  }
);

const Student=mongoose.model('student',studentSchema)

module.exports=Student;
