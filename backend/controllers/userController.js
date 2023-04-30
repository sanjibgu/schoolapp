const asyncHandler = require("express-async-handler");
const User = require("../models/UserModel");
const generateWebToken = require("../utils/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  } else {
    if (name && email && password && role ) {
      const user = await User.create({
        name,
        email,
        password,
        role
      });

      if (user) {
        res.status(200).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          role:user.role,
          token: generateWebToken(user._id,role)
        });
      }
      else {
        res.status(400);
        throw new Error("User not created");
      }
    } else {
      res.status(400).send("All fields are not filled up");
      throw new Error("All fields are not filled up");
    }
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password} = req.body;

  if(email && password){
      const userExists = await User.findOne({ email });

      if(userExists){
          if(userExists && (await userExists.matchPassword(password))){
            res.status(200).json({
              _id: userExists._id,
              name: userExists.name,
              email: userExists.email,
              role:userExists.role,
              token: generateWebToken(userExists._id,userExists.role)
            })  
          }
          else
          {
            res.status(400);
            throw new Error("Wrong user name and password");
          }
      }
      else
      {
        res.status(400);
        throw new Error("User Does not exist");
      }
 
    }
  else
  {
    res.status(400).send("All fields are not filled up");
    throw new Error("All fields are not filled up");
  }

  
});

const logout=asyncHandler(async(req,res)=>{
  
})

const getAllUser=asyncHandler(async(req,res)=>{
  const users=await User.find().select(-['password']);
  res.status(200).json(users)
})

module.exports={registerUser,loginUser,getAllUser}