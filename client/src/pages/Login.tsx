import AppLogo from "../assets/AppLogo"
import { loginUser } from "../services/userService"
import { useState } from "react"
import { toast } from "react-toastify"

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async () => {
        if ((email && password) !== "") {
            const login = await loginUser(email, password)
            if (login) {
                const accessToken = login.data.accessToken
                console.log(accessToken)
                return // TODO : save access token to local storage
            }
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
                        src="https://cdn.discordapp.com/attachments/838245124827774997/1174152644047151236/airplane.jpeg?ex=65668ddd&is=655418dd&hm=3700a59715ddfc12ceba106bebd1c40233a51f3f498d1017129c4aa50ca14a91&" alt="" />
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