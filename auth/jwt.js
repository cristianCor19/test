import jwt from 'jsonwebtoken';

export async function createAccessToken(payload){
  const {id} = payload;

  if(!process.env.TOKEN_SECRET){
    throw new Error("TOKEN_SECRET no esta definido en las variables de entorno")
  }
  
  try {
    const token = jwt.sign(
      {id}, 
      process.env.TOKEN_SECRET,
      {expiresIn: "15d", algorithm: "HS512"}
    )
    return token;
  } catch (error) {
    throw new Error(`Error al generar el token ${error.message}`);
  }
}