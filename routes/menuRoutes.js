const express=require('express');
const router=express.Router();

const Menu=require('../models/Menu');

router.post('/',async (req,res)=>{
  try{
    const data=req.body;
    const menuItem=new Menu(data);
    const response=await menuItem.save();
    console.log('data is saved');
    res.status(200).json(menuItem);
  }catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal server error'})
  }
})

router.get('/',async (req,res)=>{
  try{
    const data=await Menu.find();
    console.log("data is fetched");
    res.status(200).json(data);
  }catch(err){
    console.log(err);
    res.status(500).json({error:"Server error"});
  }
})

router.get('/:tasteType',async (req,res)=>{
  try{
    const tasteType=req.params.tasteType;
    if(tasteType==='sweet'||tasteType==='sour'||tasteType==='spicy'){
      const response=await Menu.find({taste:tasteType});
      res.status(200).json(response);
    }else{
      res.status(404).json({error:'Invalid taste type'});
    }
  }catch(err){
    console.log(err);
    res.status(500).json({error:"Server error"});
  }
})

router.put('/:id',async (req,res)=>{
  try{
    const menuId=req.params.id;
    const updatedMenuData=req.body;
    const response=await Menu.findByIdAndUpdate(menuId,updatedMenuData,{
      new:true,
      runValidators:true
    });
    if(!response){
      return res.status(404),json({error:"Not found"});
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
    const menuId=req.params.id;
    const response=await Menu.findByIdAndDelete(menuId);
    if(!response){
      return res.status(404),json({error:"Not found"});
    }
    console.log("data deleted");
    res.status(200).json({message:"MenuItem deleted successfully"});
  }catch(err){
    console.log(err);
    res.status(500).json({error:"Server error"});
  }
})

module.exports=router;