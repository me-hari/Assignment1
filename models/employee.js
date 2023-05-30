const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
