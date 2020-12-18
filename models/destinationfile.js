const mongoose= require('mongoose');

// Schema

const Schema=mongoose.Schema;
const destinationSchema=new Schema ({
    stateIndia: String,
    place: String,
    traveltip: String,
    experience: String,
    image : String,
    current_date: String
});

//Model
const destinationfile=mongoose.model('destination_details',destinationSchema);

module.exports= destinationfile;