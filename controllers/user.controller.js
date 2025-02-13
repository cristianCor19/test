import User from "../models/user.js";
import jwt, { decode } from 'jsonwebtoken';
import { genSalt, hash, compare } from 'bcrypt';
import { createAccessToken } from "../auth/jwt.js";

export async function saveUser(req, res){
  try {
    const {name, email, password} = req.body;
    

    const userFound = await User.findOne({email: email});

    if(!userFound){
      const salt = await genSalt(15);
      const hashedPassword = await hash(password, salt);
      const newUser = new User({
        name,
        email,
        password: hashedPassword
      })

      const userCreate = await newUser.save();

      const payload = {
        id: userCreate.id,
      }

      const token = await createAccessToken(payload);

      return res.status(201).json({
        "status": true,
        "token": token
      })

    }else{
      return res.status(409).json({
        "status": false,
        "message": "Correo ya registrado"
      })
    }

  } catch (error) {
    
  }
}