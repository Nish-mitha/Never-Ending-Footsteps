const express= require('express');
const multer = require('multer');

const router=express.Router();

const postfile=require('../models/postfile.js');

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
postfile.find()
    .then((data) => {
        console.log('Data:',data);
        res.json(data);
    })
    .catch((error)=>{
        console.log('error: ',error);
    });
});

//Post method to insert data to post collection
router.post('/addPost',upload.single("image"),(req,res) => {
        const newpostfile=new postfile({
            caption:req.body.caption,
            image:req.file.originalname,
            current_date:new Date()
        });
            newpostfile
            .save()
            .then(() => res.json("Data added"))
            .catch((error) => res.status(400).json('Error'));
    });

// Delete method
router.delete('/deletepost/:id',(req,res) => {
    var id=req.params.id;
    postfile
    .findByIdAndDelete(id)
    .then(() => res.json("Data deleted"))
    .catch((error) => res.status(400).json('Error'));
});

// Update destination details
router.put('/updatepost/:id',upload.single("image"),(req,res) => {
    postfile.findByIdAndUpdate(req.params.id, {
        caption:req.body.caption,
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
                console.log('post updated successfully !')
            }
        })
    })
    


module.exports=router;