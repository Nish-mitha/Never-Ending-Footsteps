const express= require('express');
const multer = require('multer');

const router=express.Router();

const destinationfile=require('../models/destinationfile.js');

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
destinationfile.find()
    .then((data) => {
        console.log('Data:',data);
        res.json(data);
    })
    .catch((error)=>{
        console.log('error: ',error);
    });
});

router.get('/navbar',(req,res)=>{
    destinationfile.distinct("stateIndia")
        .then((data) => {
            console.log('Data:',data);
            res.json(data);
        })
        .catch((error)=>{
            console.log('error: ',error);
        });
});


//Get Travel-Tip data
router.get('/:traveltip',(req,res)=>{
    var query={traveltip :req.params.traveltip}
    destinationfile.find(query)
        .then((data) => {
            console.log('Data:',data);
            res.json(data);
        })
        .catch((error)=>{
            console.log('error: ',error);
        });
    });

//Get State wise data
router.get('/India/:stateIndia',(req,res)=>{
    var query={stateIndia:req.params.stateIndia}
    destinationfile.find(query)
        .then((data) => {
            console.log('Data:',data);
            res.json(data);
        })
        .catch((error)=>{
            console.log('error: ',error);
        });
    });

//Post method to insert data to destination collection
router.post('/addDestination',upload.single("image"),(req,res) => {
        const newdestinationfile=new destinationfile({
            stateIndia:req.body.stateIndia,
            place:req.body.place,
            traveltip:req.body.traveltip,
            experience:req.body.experience,
            image:req.file.originalname,
            current_date:new Date()
        });
            newdestinationfile
            .save()
            .then(() => res.json("Data added"))
            .catch((error) => res.status(400).json('Error'));
    });

// Delete method
router.delete('/deletedestination/:id',(req,res) => {
    var id=req.params.id;
    destinationfile
    .findByIdAndDelete(id)
    .then(() => res.json("Data deleted"))
    .catch((error) => res.status(400).json('Error'));
});

// Update destination details
router.put('/updatedestination/:id',upload.single("image"),(req,res) => {
    destinationfile.findByIdAndUpdate(req.params.id, {
        stateIndia:req.body.stateIndia,
        place:req.body.place,
        traveltip:req.body.traveltip,
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
                console.log('Destination updated successfully !')
            }
        })
    })
    


module.exports=router;