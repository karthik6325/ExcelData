const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  mobileNo: String,
  dateOfBirth: Date,
  workExperience: String,
  resumeTitle: String,
  currentLocation: String,
  postalAddress: String,
  currentEmployer: String,
  currentDesignation: String
});

module.exports = mongoose.model('Candidate', candidateSchema);
