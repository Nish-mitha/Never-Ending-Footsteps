const mongoose= require('mongoose');

// Schema

const Schema=mongoose.Schema;
const postSchema=new Schema ({
    caption: String,
    image : String,
    current_date: String
});

//Model
const postfile=mongoose.model('post_details',postSchema);

module.exports= postfile;