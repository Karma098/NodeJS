const express=require('express');

const app=express();

const db=require('./db');

const bodyParser=require('body-parser');
app.use(bodyParser.json());


const Person=require('./models/person');
const Menu=require('./models/Menu');

app.get('/',function(req,res){
  res.send('Welcome to my hotel...How can i help you?,, we have list of menus');
});

app.post('/person',async (req,res)=>{
  try{
    const data=req.body
    const newPerson=new Person(data);
    const response=await newPerson.save();
    console.log('data saved');
    res.status(200).json(response);
  }
  catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal server error'});
  }

  // newPerson.name=data.name;
  // newPerson.age=data.age;
  // newPerson.mobile=data.mobile;
  // newPerson.save((error,savedPerson)=>{
  //   if(error){
  //     console.log('Error saving person: ',error);
  //     res.status(500).json({error:"Internal server error"})
  //   }else{
  //     console.log('data saved successfully');
  //     res.status(200).json(savedPerson);
  //   }
  // })
})

app.get('/person',async (req,res)=>{
  try{
    const data =await Person.find({age:{$gt:22}});
    console.log('data fetched');
    res.status(200).json(data);
  }catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal server error'});
  }
})

app.post('/items',async (req,res)=>{
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

app.listen(3000,()=>{
  console.log('listening on port 3000');
});