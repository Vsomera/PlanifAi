import { useState, useContext, useEffect } from "react"
import { registerUser } from "../services/userService"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/userContext"
import { toast } from "react-toastify"
import ReactLoading from 'react-loading';
import AppLogo from "../assets/AppLogo"
import airplaneImage from "../images/airplane.jpeg"


const Register = () => {

    const { user, setUser } = useContext(UserContext)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confPass, setConfPass] = useState("")
    const [isLoading, setLoading] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        // redirect to dashboard if user is already logged in
        if (user?.accessToken != null) {
            navigate("/")
        }
    })

    const validPassword = () => {
        if (password == confPass) {
            const minLength = 10
            const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/

            const validLength =  password.length >= minLength 
            const containsSpecial = password && specialCharRegex.test(password)

            if (validLength && containsSpecial) {
                return true
            } else if (!validLength) {
                toast.error("Password must contain at least 10 characters")
            } else if (!containsSpecial) {
                toast.error("Password must contain a special character (eg. !@#$%^&*)(-=))")
            }
        } else {
            toast.error("Passwords do not match")
        }
        return false
    }

    const validEmail = () => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (emailRegex.test(email)) {
            return true
        }
        toast.error("Invalid Email Address")
        return false
    }

    const handleRegister = async () => {
        if ( (email && password && confPass) !== "" ) {
            if (validPassword() && validEmail()) {
                setLoading(true)
                const register = await registerUser(email, password)
                if (register) {
                    const accessToken = register.data.accessToken
                    setUser({ "accessToken" : accessToken})
                    console.log(user)
                }
                setLoading(false)
            }
        } else {
            toast.error("Empty Registration Fields")
        }
    }

    return (
        <div className="flex h-full">

            <div className="w-2/4 relative text-center">
                <div className="h-full p-3">
                    <img 
                        className="h-full w-full object-cover rounded-3xl"
                        src={airplaneImage} alt="" />
                    {/* <div className="gradient-overlay rounded-3xl absolute inset-3" /> */}
                </div>
            </div>

            <div className="w-2/4 flex flex-col">
                <div className="flex justify-center p-3">
                    <div className="flex items-center justify-between" style={{ width : "5.2rem"}}>
                        <AppLogo height="20px" width="20px" />
                        <h1>PlanifAi</h1>
                    </div>
                </div>

                <div className="flex items-center justify-center h-full w-full">
                    <div className="auth-container text-center flex flex-col justify-between">
                            { !isLoading ?
                                    <>
                                        <h1 className="text-xl font-bold tracking-wider">
                                            Sign Up with Email
                                        </h1>

                                        <div>
                                            <div className="input-container">
                                                <input 
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="outline-none w-full auth-input"
                                                    type="text" required/>
                                                <label htmlFor="">Email</label>
                                            </div>

                                            <div className="input-container">
                                                <input 
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    className="outline-none w-full auth-input"
                                                    type="password" required/>
                                                <label htmlFor="">Password</label>
                                            </div>

                                            <div className="input-container">
                                                <input 
                                                    value={confPass}
                                                    onChange={(e) => setConfPass(e.target.value)}
                                                    className="outline-none w-full auth-input"
                                                    type="password" required/>
                                                <label htmlFor="">Confirm Password</label>
                                            </div>
                                        </div>

                                        <button 
                                            onClick={() => handleRegister()}
                                            className="auth-btn">
                                            Sign In
                                        </button>
                                    </>
                                :                             
                                    <div className="m-auto">
                                        <ReactLoading 
                                            type="spin" 
                                            height={"5rem"} 
                                            width={"5rem"} 
                                            color="#006AFF" />
                                    </div>
                            }
                    </div>
                </div>

                <div 
                    className="w-11/12 mx-auto flex justify-center p-4"
                    style={{ borderTop : "1px solid #e0e3eb"}}>
                        <h3>Already have an Account? <a style={{ color : "#006AFF"}} href="/login">Log In</a></h3>
                </div>


            </div>

        </div>
    )
}

export default Register