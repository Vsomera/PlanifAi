import express, {Request, Response} from "express"
import userController from "../controllers/userController"
import authMiddleware from "../middleware/authMiddleware"
const router = express.Router()

// @ desc   Register User
// @ route  POST /api/users/
// @ access Public
/*
    email : string
    password : string
*/

router.post("/", userController.registerUser)

// @ desc   Login User
// @ route  POST /api/users/login
// @ access Public
/*
    email : string
    password : string
*/
router.post("/login", userController.loginUser)


// @ desc   User Info from Access Token
// @ route  GET /api/users/me
// @ access Private

router.get("/me", authMiddleware.authenticateToken, (req : Request, res : Response) => {
    res.status(200).json({
        // @ts-ignore
        user : req.user
    })})

module.exports = router