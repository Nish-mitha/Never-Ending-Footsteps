const express= require('express');
const multer = require('multer');

const router=express.Router();

const hotelfile=require('../models/hotelfile.js');

const storage= multer.diskStorage({
    destination:(req,file,callback) => {
        callback(null,"./user/public/uploads/");
    },
    filename:(req,file,callback) => {
        callback(null,file.originalname);
    }
})

const upload=multer({storage:storage});

router.get('/',(req,res)=>{
hotelfile.find()
    .then((data) => {
        console.log('Data:',data);
        res.json(data);
    })
    .catch((error)=>{
        console.log('error: ',error);
    });
});

//Post method to insert data to hotel collection
router.post('/addHotel',upload.single("image"),(req,res) => {
        const newhotelfile=new hotelfile({
            stateIndia:req.body.stateIndia,
            place:req.body.place,
            experience:req.body.experience,
            image:req.file.originalname,
            current_date:new Date()
        });
            newhotelfile
            .save()
            .then(() => res.json("Data added"))
            .catch((error) => res.status(400).json('Error'));
    });

// Delete method
router.delete('/deletehotel/:id',(req,res) => {
    var id=req.params.id;
    hotelfile
    .findByIdAndDelete(id)
    .then(() => res.json("Data deleted"))
    .catch((error) => res.status(400).json('Error'));
});

// Update destination details
router.put('/updatehotel/:id',upload.single("image"),(req,res) => {
    hotelfile.findByIdAndUpdate(req.params.id, {
        stateIndia:req.body.stateIndia,
        place:req.body.place,
        experience:req.body.experience,
        image:req.file.originalname,
        current_date:new Date()
        }, (error, data) => {
            if (error)
            {
                return next(error);
                console.log(error)
            } 
            else 
            {
                res.json(data)
                console.log('hotel updated successfully !')
            }
        })
    })
    


module.exports=router;