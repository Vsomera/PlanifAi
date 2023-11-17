import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/userContext"
import { toast } from "react-toastify"

const Dashboard = () => {

    const { user, setUser } = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (user?.accessToken == null) {
            // redirect to login page if user is not authorized
            navigate("/login")
        }
    })

    const handleSignOut = () => {
        setUser(null)
        toast.success("Logged Out")
    }

    return (
        <>
            <button onClick={() => handleSignOut()}> SignOut </button>
        </>
    )
}

export default Dashboard