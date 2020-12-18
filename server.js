const express= require('express');
const mongoose=require('mongoose');
const morgan=require('morgan');
const path=require('path');


const app=express();
const PORT=process.env.PORT || 8080;

const feedbackRoute=require('./routes/feedback_route.js');
const destinationRoute=require('./routes/destination_route.js');
const hotelRoute=require('./routes/hotel_route.js');
const cafeRoute=require('./routes/cafe_route.js');
const postRoute=require('./routes/post_route.js');

mongoose.connect('mongodb://localhost/travel_blog', {
    useNewUrlParser:true,
    useUnifiedTopology: true
});


mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!!');
});

//data parsing
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//HTTP request logger
app.use(morgan('tiny'));

app.use('/feedback',feedbackRoute);
app.use('/destinationfile',destinationRoute);
app.use('/hotelfile',hotelRoute);
app.use('/cafefile',cafeRoute);
app.use('/postfile',postRoute);
app.listen(PORT,console.log(`Server is starting at ${PORT}`));