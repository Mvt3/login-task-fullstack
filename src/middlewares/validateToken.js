import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js'

//Considerado middleware
export const authRequired = (req, res, next) => {
    const { token } = req.cookies
    if(!token) return res.status(401).json({message: "Token not found, "})

    //se descodifica(resuelve) y se almacena la id en "user"
    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({message: "invalid token"})

        req.user = user // lo utilizaré a lo largo de la cadena middleware

        next();
        
    })

    

}