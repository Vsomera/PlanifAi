import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/userContext"
import Sidebar from "../components/Sidebar"

const Dashboard = () => {

    const { user } = useContext(UserContext)
    const navigate = useNavigate()

    const [selected, select] = useState(0)
    const sidebarItem = {
        main : 0,
        map: 1,
        recommended : 2
    }

    useEffect(() => {
        if (user?.accessToken == null) {
            // redirect to login page if user is not authorized
            navigate("/login")
        }
    })

    return (
        <div className="flex w-full h-full">
            <Sidebar 
                sidebarItem={sidebarItem} 
                select={select}
                selected={selected}/>
        </div>
    )
}

export default Dashboard