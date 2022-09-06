const express= require('express');
const { validateToken } = require('../middlewares/AuthMiddleware');
const router =express.Router();
const {Comments}= require("../models");




router.get('/:itemId', async(req, res)=>{
    const itemId= req.params.itemId;
    const comments =await Comments.findAll({where: {ItemId: itemId}});
    res.json(comments)

});

//router.post();
router.post('/', validateToken, async (req, res)=>{
    const comment =req.body;
    const username= req.user.username;
    comment.username=username;
    await Comments.create(comment);
    res.json(comment);
});
router.delete('/:commentId', validateToken, async (req, res)=>{
    const commentId =req.params.commentId;
    await Comments.destroy({where:{id:commentId}})
    res.json("delete success");
});

module.exports = router;