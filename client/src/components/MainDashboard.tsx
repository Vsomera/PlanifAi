import { PlansContext } from "../context/plansContext"
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { AiOutlineDelete } from "react-icons/ai";
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { FiEdit2 } from "react-icons/fi";
import { useContext, useState } from "react"
import { SelectedPlanContext } from "../context/selectedPlanContext";
import { Plan } from "../interfaces/plan";

const MainDashboard = () => {

    const { plans } = useContext(PlansContext)
    const { selectedPlan, setSelectedPlan } = useContext(SelectedPlanContext)

    const [dropDown, setDropDown] = useState(false)

    const selectPlan = (plan : Plan) => {
        setSelectedPlan(plan)
    }   

    return (
        <div
            style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
            className="z-20 h-full backdrop-blur-sm flex">
                <div className="w-full flex flex-col overflow-y-auto">
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
                                                                    onClick={() => selectPlan(plan)}
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
                            
                            <div className="flex justify-around items-center w-full h-1/2">
                                
                                    <div className="w-1/2">
                                        <DateCalendar 
                                            showDaysOutsideCurrentMonth 
                                            fixedWeekNumber={6} />
                                    </div>

                                    <div className="w-1/2">
                                    <h1 className="text-xl text-center">
                                            {
                                                selectedPlan?.itinerary && selectedPlan.itinerary.length > 0
                                                    ? selectedPlan.itinerary.map((place) => (
                                                        <h1 key={place.location_id}>
                                                            {place.location_name}
                                                        </h1> 
                                                    ))
                                                    : <p>No places in itinerary</p> // placeholder for now
                                            }
                                        </h1>
                                    </div>

                            </div>

                    </div>
                </div>
        </div>
    )
}

export default MainDashboard