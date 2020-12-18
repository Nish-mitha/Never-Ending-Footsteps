const mongoose= require('mongoose');

// Schema

const Schema=mongoose.Schema;

const cafeSchema=new Schema ({
    stateIndia: String,
    place: String,
    shopName: String,
    famousFood: String,
    experience: String,
    image : String,
    current_date: String
});

//Model
const cafefile=mongoose.model('cafe_details',cafeSchema);

module.exports= cafefile;