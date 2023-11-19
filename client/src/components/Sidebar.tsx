import AppLogo from "../assets/AppLogo"
import DashLogo from "../assets/DashIcon"
import ItineraryIcon from "../assets/ItineraryIcon"
import RecommendIcon from "../assets/RecommendIcon"
import { useContext } from "react"
import { IoExitOutline } from "react-icons/io5";
import { UserContext } from "../context/userContext"
import { toast } from "react-toastify"

interface Props {
    sidebarItem : {
        main : number // 0
        map : number // 1
        recommended : number // 2
    },
    select: React.Dispatch<React.SetStateAction<number>> // useState function
    selected : number
}


const Sidebar = (props : Props) => {


    const { sidebarItem, select, selected } = props
    const { setUser } = useContext(UserContext)

    const handleSignOut = () => {
        setUser(null)
        toast.success("Logged Out")
    }

    return (
        <div className="sidebar h-full flex justify-center items-center shadow-lg">
            <div className="side-container flex flex-col justify-between">

                <div className="flex flex-col items-center">
                    <div className="flex-col flex items-center">
                        <AppLogo height="46px" width="46px" />
                        <p className="flex font-thin">Planif<p className="font-black">Ai</p></p>
                    </div>

                    <div
                        onClick={() => select(sidebarItem.main)} 
                        className={`rounded-md p-2 mt-10 cursor-pointer ${ selected == 0 && "shadow-xl"}`}
                        style={{ backgroundColor : `${ selected == 0 ? '#006AFF' : "#fff"}` }}>
                        <DashLogo width="28px" height="28px" fill={`${selected == 0 ? "#fff" : "#292D32" }`}/>
                    </div>

                    <div 
                        onClick={() => select(sidebarItem.map)} 
                        className={`rounded-md p-2 mt-10 cursor-pointer ${ selected == 1 && "shadow-xl"}`}
                        style={{ backgroundColor : `${ selected == 1 ? '#006AFF' : "#fff"}` }}>
                        <ItineraryIcon width="28px" height="28px" fill={`${selected == 1 ? "#fff" : "#292D32" }`} />
                    </div>

                    <div 
                        onClick={() => select(sidebarItem.recommended)} 
                        className={`rounded-md p-2 mt-10 cursor-pointer ${ selected == 2 && "shadow-xl"}`}
                        style={{ backgroundColor : `${ selected == 2 ? '#006AFF' : "#fff"}` }}>
                        <RecommendIcon width="28px" height="28px" fill={`${selected == 2 ? "#fff" : "#292D32" }`} />
                    </div>
                </div>

                <div className="flex justify-center cursor-pointer" onClick={() => handleSignOut()}>
                    <IoExitOutline style={{ width: "28px", height: "28px" }} color="#292D32" />
                </div>

            </div>
        </div>
    )
}

export default Sidebar