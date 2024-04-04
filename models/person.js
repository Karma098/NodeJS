const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

const personSchema=new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  age:{
    type:Number
  },
  work:{
    type:String,
    enum:['Chef','Waiter','Manager'],
    required:true
  },
  mobile:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  address:{
    type:String
  },
  salary:{
    type:Number,
    required:true
  },
  username:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  }
});

personSchema.pre('save',async function(next){
  const person=this;
  if(!person.isModified('password')) return next();
  try{
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(person.password,salt);
    person.password=hashedPassword;
    next();
  }catch(err){
    return next(err);
  }
});

personSchema.methods.comparePassword=async function(candidatePassword){
  try{
    //Use bcrpt to compare the provided password with the hashed password
    const isMatch=await bcrypt.compare(candidatePassword,this.password);
    return isMatch;
  }catch(err){
    throw err;
  }
}

//karma---->>nmbmbhgbhbhbhbhbmnbmb
//login----->akabane

//nmbmbhgbhbhbhbhbmnbmb---->extract salt
//salt+akabane--->hash---->hbjy4ghbrwbybffrfd55  hash is different therefore wrong password;


const Person=mongoose.model('Person',personSchema);
module.exports=Person;