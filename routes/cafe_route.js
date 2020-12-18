const express= require('express');
const multer = require('multer');

const router=express.Router();

const cafefile=require('../models/cafefile.js');

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
cafefile.find()
    .then((data) => {
        console.log('Data:',data);
        res.json(data);
    })
    .catch((error)=>{
        console.log('error: ',error);
    });
});

//Post method to insert data to cafe collection
router.post('/addCafe',upload.single("image"),(req,res) => {
        const newcafefile=new cafefile({
            stateIndia:req.body.stateIndia,
            place:req.body.place,
            shopName:req.body.shopName,
            famousFood:req.body.famousFood,
            experience:req.body.experience,
            image:req.file.originalname,
            current_date:new Date()
        });
            newcafefile
            .save()
            .then(() => res.json("Data added"))
            .catch((error) => res.status(400).json('Error'));
    });

// Delete method
router.delete('/deletecafe/:id',(req,res) => {
    var id=req.params.id;
    cafefile
    .findByIdAndDelete(id)
    .then(() => res.json("Data deleted"))
    .catch((error) => res.status(400).json('Error'));
});

// Update destination details
router.put('/updatecafe/:id',upload.single("image"),(req,res) => {
    cafefile.findByIdAndUpdate(req.params.id, {
        stateIndia:req.body.stateIndia,
        place:req.body.place,
        shopName:req.body.shopName,
        famousFood:req.body.famousFood,
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
                console.log('Cafe & Eateries updated successfully !')
            }
        })
    })
    


module.exports=router;