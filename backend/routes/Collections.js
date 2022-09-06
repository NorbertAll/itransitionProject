const express= require('express');
const router =express.Router();
const {Collections, Items}= require("../models");
const { validateToken }=require('../middlewares/AuthMiddleware')



router.get('/', validateToken, async (req, res)=>{
    const likedCoollection= await Collections.findAll();
    res.json({listOfCollection:likedCoollection});
});


router.get('/byId/:id', async(req, res)=>{
    const id= req.params.id
    const collection =await Items.findByPk(id)
    res.json(collection)

});
router.get('/byuserId/:id', async(req, res)=>{
    const userId= req.params.id
    const collection= await Collections.findAll({where: {UserId: userId}});
    res.json(collection)

});
//router.post();
router.post('/', validateToken, async (req, res)=>{
    const collection =req.body;
    collection.username = req.user.username;
    collection.UserId = req.user.id;
    await Collections.create(collection);
    res.json(collection);
});

router.put('/name', validateToken, async (req, res)=>{
    const {newName, id} =req.body;
    await Collections.update({name: newName}, {where: {id:id}})
   
    res.json(newName);
});
router.put('/decritpion', validateToken, async (req, res)=>{
    const {newDecritpion, id} =req.body;
    await Collections.update({tags: newDecritpion}, {where: {id:id}})
   
    res.json(newDecritpion);
});
router.put('/topic', validateToken, async (req, res)=>{
    const {newTopic, id} =req.body;
    await Collections.update({tags: newTopic}, {where: {id:id}})
   
    res.json(newTopic);
});

router.delete("/:collectionId", validateToken, async (req, res)=>{
    const collectionId =req.params.collectionId
    await Collections.destroy({where:{id:collectionId}})
    res.json("delete success");
})

module.exports = router;
