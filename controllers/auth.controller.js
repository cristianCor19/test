import User from "../models/user.js";
import jwt, { decode } from 'jsonwebtoken';
import { genSalt, hash, compare } from 'bcrypt';
import { createAccessToken } from "../auth/jwt.js";


export async function login(req, res) {
  try {
      const { email, password } = req.body
      const userFound = await User.findOne({ email: email })
      if (!userFound) {
          return res.status(404).json({
              "status": false,
              "message": "Usuario o contraseña incorrecta"
          })
      }
      
      const passwordMatch = await compare(password, userFound.password)
      if (!passwordMatch) {
          return res.status(401).json({
              "status": false,
              "message": "Usuario o contraseña incorrecta"
          })
      }
     
      const payload = {
        id: userFound.id,
      }

      const token = await createAccessToken(payload);
    
      return res.status(200).json({
          "status": true,
          "token": token,
          "message": "Inicio de sesión exitoso",
      })
  } catch (error) {
      return res.status(500).json({
          "status": false,
          "error": error.message
      })
  }
}