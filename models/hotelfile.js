const mongoose= require('mongoose');

// Schema

const Schema=mongoose.Schema;
const hotelSchema=new Schema ({
    stateIndia: String,
    place: String,
    experience: String,
    image : String,
    current_date: String
});

//Model
const hotelfile=mongoose.model('hotel_details',hotelSchema);

module.exports= hotelfile;