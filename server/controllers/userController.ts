import { Request, Response } from "express"
import { Types } from "mongoose"
import jwt from "jsonwebtoken"
import hashMiddleware from "../middleware/hashMiddleware"
import User from "../models/userModels"

interface userObj {
    _id : Types.ObjectId
    username : string
    email : string
}

const generateToken = (userObj : userObj) => {
    const accessToken = jwt.sign(
        userObj,
        process.env.ACCESS_TOKEN_SECRET as string
    ) // NOTE : token does not have an expiration date 
    return accessToken
}

// @ desc Register User
// @ route POST /api/users/
// @ access PUBLIC

const registerUser = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body

        // checks if user already exists in database
        const checkEmail = await User.findOne({ email: email })
        if (checkEmail) {
            return res.status(400).json({
                message: "Could not register user",
                error: "User already exists"
            })
        }

        // hash user password
        const hashedPassword = await hashMiddleware.hashPassword(password)

        // adds user to database
        const newUser = await User.create({
            username: username,
            email: email,
            password: hashedPassword
        })

        const userObj = {
            _id : newUser._id,
            username : newUser.username,
            email : newUser.email
        } 

        // send confirmation user has been registered
        if (newUser) {
            return res.status(201).json({
                message: "User Registered",
                userObj,
                accessToken : generateToken(userObj)
            })
        }


    } catch (err) {
        return res.status(400).json({
            message: "Could not register user",
        })
    }
}

// @ desc Login User
// @ route POST /api/users/login
// @ access PUBLIC

const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body

        // checks if user exists in database
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(401).json({
                message: "Could not Login User",
                error: "User does not exist"
            })
        } else {
            // if the user exists compare given password with hashed password in database
            const isMatch = await hashMiddleware.comparePasswordHash(password, user.password)

            if (isMatch) {
                return res.status(201).json({ 
                    message : "User Logged In",
                    userObj : {
                        _id : user._id,
                        username : user.username,
                        email : user.email
                    },
                    accessToken : generateToken({
                        _id : user._id,
                        username : user.username,
                        email : user.email
                    })
                })

            } else {
                return res.status(401).json({
                    message: "Could not Login User",
                    error: "Incorrect Password"
                })
            }

        }

    } catch (err) {
        return res.status(400).json({
            message: "Could not Login User",
            error: err
        })
    }
}

export default {
    registerUser,
    loginUser
}