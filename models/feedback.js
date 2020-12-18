const mongoose= require('mongoose');

// Schema

const Schema=mongoose.Schema;
const feedbackSchema=new Schema ({
    name: String,
    email: String,
    message: String,
    current_date: String
});

//Model
const feedback=mongoose.model('feedback_details',feedbackSchema);

module.exports= feedback;