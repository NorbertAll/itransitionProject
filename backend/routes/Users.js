const express= require('express');
const router =express.Router();
const {Users}= require("../models");
const bcrypt= require('bcrypt')

const {sign}= require('jsonwebtoken');
const { validateToken } = require('../middlewares/AuthMiddleware');

router.get('/', async (req, res)=>{
    const listOfUsers= await Users.findAll();
    res.json(listOfUsers);
});

router.post('/',async (req, res)=>{
    const {username, password, email} =req.body;
    const us=await Users.findOne({where: {username:username}});
    if(!us){
    bcrypt.hash(password, 10).then((hash)=>{
        Users.create({
            username: username,
            password: hash,
            e_mail: email
        })
       
    }); 
    res.json("Success");
    }else{
        res.json("This user this user is already registered ");
    }
    
   
});

router.post('/login',async (req, res)=>{
    const {username, password} =req.body;
    const user= await Users.findOne({where: {username:username}});
    
    if(!user){
        res.json({error: "User Doesn't exist"});}
    else{
    
        bcrypt.compare(password, user.password).then((match)=>{
        if(!match){ 
            res.json({error: "Wrong username or password"});
            }
        else{
            if(user.status==='blocked'){
                
                res.json("User blocked")
            }else{
                const accessToken = sign({username: user.username, id:user.id, role: user.role}, "importantsecret")
                res.json({token: accessToken, username:username, id: user.id, role: user.role}) 
                let date= new Date();
                Users.update(
                    { last_login_time: date.toLocaleString() },
                    {where:{username:username}}
                );
            } 
        }
        
    })}
    

});

router.get('/byId/:id', async(req, res)=>{
    const id= req.params.id
    const user =await Users.findByPk(id)
    res.json(user)
});
router.get('/token',validateToken,async (req, res)=>{
    res.json(req.user);
});
router.get('/profile/:id', async (req, res)=>{
    const id = req.params.id;
    const basicInfo=await Users.findByPk(id, {attributes:{exclude:['password']}})

    res.json(basicInfo);
});
router.post('/delete', async (req, res)=>{
    let len=Object.keys(req.body).length;
    for(let i=0; i<len; i++){
        await Users.destroy({where:{id:req.body[i]}})
    }
    res.json('success delete');
    
});
router.post('/block', async (req, res)=>{
    let len=Object.keys(req.body).length;
    for(let i=0; i<len; i++){
        await Users.update(
            { status: 'blocked' },
            {where:{id:req.body[i]}}
        );
    }
   
    res.json('blo');
});
router.post('/unlock', async (req, res)=>{
    let len=Object.keys(req.body).length;
    for(let i=0; i<len; i++){
        await Users.update(
            { status: 'active' },
            {where:{id:req.body[i]}}
        );
    }
});
router.post('/addadmin', async (req, res)=>{
    let len=Object.keys(req.body).length;
    for(let i=0; i<len; i++){
        await Users.update(
            { role: 'admin' },
            {where:{id:req.body[i]}}
        );
    }
});
router.post('/deladmin', async (req, res)=>{
    let len=Object.keys(req.body).length;
    for(let i=0; i<len; i++){
        await Users.update(
            { role: 'user' },
            {where:{id:req.body[i]}}
        );
    }
});

module.exports = router;