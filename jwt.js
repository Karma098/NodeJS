const jwt=require('jsonwebtoken');

const jwtAuthMiddleware=(req,res,next)=>{
  const authorization=req.headers.authorization;
  if(!authorization) return res.status(401).json({error:'Unauthorized'});
  //Extract the jwt token from the request header
  const token=req.headers.authorization.split(' ')[1];
  if(!token) return res.status(401).json({error:'Unauthorized'});
  try{
    //verify the jwt token
    const decoded=jwt.verify(token,process.env.JWT_SECRET);

    //Attach user information to the request object
    req.user=decoded;
    next();
  }catch(err){
    console.error(err);
    res.status(401).json({error:'Invalid token'});
  }
};

//Function to generate JWT token
const generateToken=(userData)=>{
  return jwt.sign(userData,process.env.JWT_SECRET,{expiresIn:3000});
}

module.exports={jwtAuthMiddleware,generateToken};