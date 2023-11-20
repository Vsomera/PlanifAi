import { fetchPlans } from "../services/planService"
import { UserContext } from "../context/userContext"
import { PlansContext } from "../context/plansContext"
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { AiOutlineDelete } from "react-icons/ai";

import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';


import { FiEdit2 } from "react-icons/fi";

import { useContext, useEffect, useState } from "react"

const MainDashboard = () => {

    const { user } = useContext(UserContext)
    const { plans, setPlans } = useContext(PlansContext)

    const [dropDown, setDropDown] = useState(false)

    useEffect(() => {
        const getUserPlans = async () => {
            if (user) {
                const getPlans = await fetchPlans(user)
                if (getPlans) {
                    const planArr = [...getPlans.data.plans]
                    setPlans(planArr)
                }
            }
        }
        getUserPlans()
    }, [])

    return (
        <div
            style={{
                backgroundColor: "rgba(255, 255, 255, 0.8)"
            }}
            className="z-20 h-full backdrop-blur-sm flex">

                <div className="w-full flex flex-col overflow-y-auto	">
                    <div 
                        style={{ height: "95%" }} 
                        className="w-11/12 m-auto flex flex-col justify-between">

                            <div className=" w-full flex items-center justify-between">
                                <h1 className="text-4xl font-thin tracking-widest">
                                    Dashboard
                                </h1>
                                <button 
                                    style={{ border : "1px solid #006AFF"}} 
                                    className="w-7/12 bg-white rounded-md relative">
                                        <div 
                                            onClick={() => setDropDown(!dropDown)}
                                            className="p-3 flex justify-between">
                                                <p>Select a Plan</p>
                                                { dropDown 
                                                    ?
                                                    <IoIosArrowUp 
                                                        style={{ 
                                                            color : "#006AFF",
                                                            width : "24px", 
                                                            height : "24px"}}/>
                                                    :
                                                    <IoIosArrowDown 
                                                        style={{ 
                                                            color : "#006AFF",
                                                            width : "24px", 
                                                            height : "24px"}}/>
                                                }
                                        </div>
                                        
                                            { dropDown &&
                                                <div className="w-full absolute z-10 mt-2 rounded-lg shadow-lg">
                                                    <div 
                                                        style={{ border : "1px dashed #006AFF", color : "#006AFF"}}
                                                        className="bg-white onHover flex justify-between p-3 text-left rounded-md">
                                                        <h1>Create New Plan</h1>
                                                    </div>

                                                    {plans && 
                                                        plans.map((plan) => {
                                                            return (
                                                                <div 
                                                                    key={plan._id}
                                                                    className="onHover bg-white flex justify-between p-4 text-left rounded-md">
                                                                    <h1>{plan.plan_name}</h1>
                                                                    <div className="flex w-12 items-center justify-between">
                                                                        <FiEdit2 />
                                                                        <AiOutlineDelete />
                                                                    </div>
                                                                </div>
                                                            )
                                                        })}
                                                </div>
                                            }
                                </button>
                            </div>

                            <div
                                style={{ border : "1px solid #006AFF"}} 
                                className="p-3 bg-white rounded-md mt-6 h-1/2">
                                    <p>Places Near Me</p>
                            </div> 
                            
                            <div className="flex w-full h-1/2">

                                <div className="w-1/2 my-auto">
                                    <DateCalendar 
                                        showDaysOutsideCurrentMonth 
                                        fixedWeekNumber={6} />
                                </div>

                                <div className="w-1/2 h-3/4 my-auto">
                                    <h1 className="text-xl text-center">
                                        Itinerary
                                    </h1>
                                </div>

                            </div>

                    </div>
                </div>
        </div>
    )
}

export default MainDashboard