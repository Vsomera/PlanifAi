import { useState, useContext, useEffect } from "react"
import { UserContext } from "../context/userContext"
import { useNavigate } from "react-router-dom"
import { loginUser } from "../services/userService"
import { toast } from "react-toastify"
import ReactLoading from 'react-loading';
import AppLogo from "../assets/AppLogo"
import airplaneImage from "../images/airplane.jpeg"


const Login = () => {

    const { user, setUser } = useContext(UserContext)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setLoading] = useState(false)


    const navigate = useNavigate()

    useEffect(() => {
        // redirect to dashboard if user is already logged in
        if (user?.accessToken != null) {
            navigate("/")
        }
    })

    const handleLogin = async () => {
        if ((email && password) !== "") {
            setLoading(true)
            const login = await loginUser(email, password)
            if (login) {
                const accessToken = login.data.accessToken
                setUser({ "accessToken" : accessToken })
            }
            setLoading(false)
        } else {
            toast.error("Empty Login Fields")
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
                    <div className="auth-container text-center flex flex-col justify-around">
                        { !isLoading ?
                                <>
                                    <h1 className="text-xl font-bold tracking-wider">
                                        Log In with Email
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
                                    </div>

                                    <button 
                                        onClick={() => handleLogin()}
                                        className="auth-btn">
                                        Log In
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
                        <h3>Do not have an Account? <a style={{ color : "#006AFF"}} href="/register">Sign Up</a></h3>
                </div>
                
            </div>
        </div>
    )
}

export default Login