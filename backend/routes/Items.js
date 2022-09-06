const express= require('express');
const router =express.Router();
const {Items, Likes}= require("../models");
const { validateToken }=require('../middlewares/AuthMiddleware')



router.get('/:id', validateToken, async (req, res)=>{
    const id=req.params.id;//idcollection
    const listOfItem= await Items.findAll({where: { CollectionId: id }}, {include: [Likes]});
    
    const likedItem= await Likes.findAll({where: {UserId: req.user.id}});
    res.json({listOfItem:listOfItem, likedItem:likedItem});
});


router.get('/byId/:id', async(req, res)=>{
    const id= req.params.id
    const item =await Items.findByPk(id)
    res.json(item)

});
router.get('/byuserId/:id', async(req, res)=>{
    const userId= req.params.id
    const item= await Items.findAll({where: {UserId: userId}});
    res.json(item)

});
//router.post();
router.post('/:id', validateToken, async (req, res)=>{

    const item =req.body;
    item.CollectionId=req.params.id
    item.username = req.user.username;
    item.UserId = req.user.id;
    console.log(item);
    await Items.create(item);
    res.json(item);
});

router.put('/name', validateToken, async (req, res)=>{
    const {newName, id} =req.body;
    await Items.update({name: newName}, {where: {id:id}})
   
    res.json(newName);
});
router.put('/tags', validateToken, async (req, res)=>{
    const {newTags, id} =req.body;
    await Items.update({tags: newTags}, {where: {id:id}})
   
    res.json(newTags);
});

router.delete("/:itemId", validateToken, async (req, res)=>{
    const itemId =req.params.ideaId
    await Items.destroy({where:{id:itemId}})
    res.json("delete success");
})

module.exports = router;
