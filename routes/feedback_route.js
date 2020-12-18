const express= require('express');

const router=express.Router();

const feedback=require('../models/feedback.js');

router.get('/',(req,res)=>{

feedback.find({ })
    .then((data) => {
        console.log('Data:',data);
        res.json(data);
    })
    .catch((error)=>{
        console.log('error: ',error);
    });
});


//Post method to insert data to feedback collection
router.post('/addFeedback',(req,res) => {

    feedback.find({})
    .exec()
    .then(() => 
    {
        const data= req.body;

        const newFeedback=new feedback(data);

            newFeedback.save((error) => 
            {
                if(error) 
                {
                    res.status().json({ msg: 'Sorry,internal server error'});
                } 
                else 
                {
                    res.json({
                        msg: 'Your data has been saved !!!!!'
                    });
                }
            });
    });
    
});


module.exports=router;