const express= require('express');
const router =express.Router();
const {Likes}= require("../models");
const { validateToken }=require('../middlewares/AuthMiddleware')

router.post("/", validateToken, async(req, res)=>{
    const {ItemsId} =req.body;
    const UserId = req.user.id;

    const found= await Items.findOne({ where: { ItemsId: ItemsId, UserId:UserId}})
    if(!found){
       await Likes.create({ItemsId: ItemsId, UserId: UserId}) 
       res.json({liked: true})
    }else{
        await Likes.destroy({ where: { ItemsId: ItemsId, UserId:UserId}});
        res.json({liked: false})
    }

})

module.exports = router;