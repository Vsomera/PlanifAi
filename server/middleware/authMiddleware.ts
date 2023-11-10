import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

const authenticateToken = (
    req : Request, 
    res : Response, 
    next : NextFunction
) => {
// Protects routes by verifying tokens sent by client

    const authHeader = req.headers['authorization']

    // collects auth token from bearer token
    const token = authHeader?.split(" ")[1]
    if (!token) {
        return res.status(401).json({
            error : "User not authorized"
        })
    }

    // verify the token collected with Access token secret
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err, user) => {
        if (err) return res.status(401).json({
            error : "Invalid Token"
        })
        // @ts-ignore
        req.user = user
        next()
    })
}

export default { authenticateToken }