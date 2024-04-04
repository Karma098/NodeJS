const express=require('express');
const router=express.Router();
const Person=require('../models/person');
const {jwtAuthMiddleware,generateToken}=require('../jwt');

router.post('/signup',async (req,res)=>{
  try{
    const data=req.body
    const newPerson=new Person(data);
    const response=await newPerson.save();
    console.log('data saved');
    const payload={
      id:response.id,
      username:response.username
    }
    const token=generateToken(payload);
    console.log("Token is: ",token);
    res.status(200).json({response:response,token:token});
  }
  catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal server error'});
  }
})

router.post('/login',async (req,res)=>{
  try{
    const {username,password}=req.body;
    const user=await Person.findOne({username:username});
    if(!user|| !(await user.comparePassword(password))){
      return res.status(401).json({error:"Invalid username or password"});
    }

    const payload={
      id:user.id,
      username:user.username
    }
    const token=generateToken(payload);

    res.json(token);

  }catch(err){
    console.error(err);
    res.status(500).json({error:"Internal server error"});
  }
})

router.get('/profile',jwtAuthMiddleware,async(req,res)=>{
  try{
    const userData=req.user;
    console.log("User data: ",userData);
    const userId=userData.id;
    const user=await Person.findById(userId);
    res.status(200).json(user);
  }catch(err){
    console.log(err);
    res.status(500).json({error:"Internal server error"});
  }
})

router.get('/',jwtAuthMiddleware,async (req,res)=>{
  try{
    const data =await Person.find({age:{$gt:22}});
    console.log('data fetched');
    res.status(200).json(data);
  }catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal server error'});
  }
})

router.get('/:workType',async (req,res)=>{
  try{
    const workType=req.params.workType;
    if(workType==='Chef'||workType==='Manager'||workType==='Waiter'){
      const response=await Person.find({work:workType});
      console.log('response fetched');
      res.status(200).json(response);
    }else{
      res.status(404).json({error:'INvalid work type'});
    }
  }catch(err){
    console.log(err);
    res.status(500).json({error:"Server error"});
  }
})

router.put('/:id',async (req,res)=>{
  try{
    const personId=req.params.id;
    const updatePersonData=req.body;
    const response=await Person.findByIdAndUpdate(personId,updatePersonData,{
      new:true,
      runValidators:true
    });
    if(!response){
      return res.status(404).json({error:'Person not found'});
    }
    console.log("Data updated");
    res.status(200).json(response);

  }catch(err){
    console.log(err);
    res.status(500).json({error:"Server error"});
  }
})

router.delete('/:id',async (req,res)=>{
  try{
    const personId=req.params.id;
    const response=await Person.findByIdAndDelete(personId);
    if(!response){
      return res.status(404).json({error:'Person not found'});
    }
    console.log("Data deleted");
    res.status(200).json({message:"Person Deleted successfully"});
  }catch(err){
    console.log(err);
    res.status(500).json({error:"Server error"});
  }
})



module.exports=router;