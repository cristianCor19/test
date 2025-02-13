import jwt from 'jsonwebtoken'

export function authRequired(req, res, next) {
    //formato del header
    const authHeader = req.header('Authorization')
  
    if (!authHeader) {
        return res.status(401).json({
            "message": "No existe token, autorizacion denegada"
        })
    }

    //formato bearer del token
    if (!authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            "message": "formato invaliudo, el token debe contener Bearer en el formato del token"
        });
    }
    
    const token = authHeader.slice(7);

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) =>{
        if(err){
            return res.status(403).json({
                "message": "Token invalido"
            })
        }

        req.user = user

        next();
    });
}