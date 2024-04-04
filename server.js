const express=require('express');
const app=express();
const db=require('./db');
require('dotenv').config();
const passport=require('./auth');

const bodyParser=require('body-parser');
app.use(bodyParser.json());
const PORT=process.env.PORT || 3000;

//Middleware function
const logRequest=(req,res,next)=>{
  console.log(`(${new Date().toLocaleString()}) Request made to: ${req.originalUrl}`);
  next();
}

app.use(logRequest);

app.use(passport.initialize());
const localAuthMiddleware=passport.authenticate('local',{session:false});

app.get('/',function(req,res){
  res.send('Welcome to my hotel...How can i help you?,, we have list of menus');
});


const menuRoutes=require('./routes/menuRoutes');
app.use('/menu',menuRoutes);


const personRoutes=require('./routes/personRoutes');
app.use('/person',localAuthMiddleware,personRoutes);

app.listen(PORT,()=>{
  console.log('listening on port 3000');
});