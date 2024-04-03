const express=require('express');
const app=express();
const db=require('./db');
require('dotenv').config();

const bodyParser=require('body-parser');
app.use(bodyParser.json());


app.get('/',function(req,res){
  res.send('Welcome to my hotel...How can i help you?,, we have list of menus');
});


const menuRoutes=require('./routes/menuRoutes');
app.use('/menu',menuRoutes);


const personRoutes=require('./routes/personRoutes');
app.use('/person',personRoutes);

const PORT=process.env.PORT || 3000;

app.listen(PORT,()=>{
  console.log('listening on port 3000');
});