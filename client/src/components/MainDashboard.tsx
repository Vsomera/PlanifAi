import { PlansContext } from "../context/plansContext"
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { useContext, useState, useRef, useEffect } from "react"
import { SelectedPlanContext } from "../context/selectedPlanContext";
import { RiRestaurant2Line } from "react-icons/ri";
import { TbBeach } from "react-icons/tb";
import { MdOutlineHotel } from "react-icons/md";
import { fetchNearby } from "../api/travelAdv";
import { toast } from "react-toastify"
import ReactLoading from "react-loading"
import { Place } from "../interfaces/place";
import { MarkerContext } from "../context/markerContext";
import { SelectedPlaceContext } from "../context/selectedPlaceContext";
import { PlacesForDateContext } from '../context/placesForDateContext';
import Cal from "./Cal";
import dayjs from "dayjs";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { motion } from "framer-motion"
import { createPlan } from "../services/planService";
import { UserContext } from "../context/userContext";
import { IoCloseCircleOutline } from "react-icons/io5";
import { editPlanName } from "../services/planService";



interface Props {
    userLocation : {
        latitude : number | null
        longitude : number | null
    } | null
    flyToLocation: (longitude: number, latitude: number) => void;
    resetView : () => void
}

const MainDashboard = (props : Props) => {

    const categories = {
        RESTAURANTS : "restaurants",
        ATTRACTIONS : "attractions",
        HOTELS : "hotels"
    }

    // map handling
    const { flyToLocation } = props
    const { resetView } = props
    const { setSelectedPlace } = useContext(SelectedPlaceContext) // shows marker popup based on the selected place

    const { user } = useContext(UserContext)

    const createModalRef = useRef<HTMLDivElement>(null);

    const { userLocation } = props
    const latitude = userLocation?.latitude
    const longitude = userLocation?.longitude

    const [showCreateModal, setCreateModal] = useState(false) // showing create plan modal

    const { plans, setPlans } = useContext(PlansContext)
    const { selectedPlan, setSelectedPlan } = useContext(SelectedPlanContext)

    const [fetchedNearby, setFetchedNearby] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [dropDown, setDropDown] = useState(false)

    const [selectedDate, setSelectedDate] = useState<Date>(new Date())
    const { placesForDate } = useContext(PlacesForDateContext)

    const [selectedCategory, setCategory] = useState("")

    const [planName, setPlanName] = useState("")
    const [planToEdit, setPlanToEdit] = useState("") // holds plan id to edit
    const [newPlanName, setNewPlanName] = useState("") // state for holding the new plan name

    const { setMarkers } = useContext(MarkerContext)

    const handleNearby = async (fetchOption : number) => {
        // fetch nearby places from user coordinates
        if (typeof latitude === 'number' && typeof longitude === 'number') {
            resetView()
            setLoading(true)
            const nearbyPlaces = await fetchNearby(longitude, latitude, 10, fetchOption)
            setLoading(false)

            const filteredPlaces = nearbyPlaces
                .filter((place: Place) => place.name != null) 
                .map((place: Place) => ({ ...place }))

            setFetchedNearby(filteredPlaces)
            setMarkers(filteredPlaces)

        } else {
            toast.warning("Please Allow Location in Browser")
        }
    }

    const handleSaveNewPlan = async (e : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation()
        setCreateModal(false)
        if (user && planName !== "") {
            const newPlan = await createPlan(user, planName)
            if (newPlan?.status == 201) {
                toast.success("New Plan Added")
                setPlans([...plans, {
                    _id : newPlan.data.plan_id,
                    user_id : user.accessToken,
                    plan_name : planName,
                    itinerary : []
                }])
            }
        }
        setPlanName("")
    }

    const handleEditPlan = async (plan_id : string , e : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation()
        if (user) {
            const editPlan = await editPlanName(user, newPlanName, plan_id)
            if (editPlan?.status == 200) {
                const updatedPlans = plans.map(plan => {
                    if (plan._id === plan_id) {
                        return { ...plan, plan_name: newPlanName };
                    }
                    return plan
                })
                setPlans(updatedPlans)
                setPlanToEdit("")
                setNewPlanName("")
                toast.success("Plan name updated successfully");
            } else {
                toast.error("Failed to update plan name");
            }
        }
        setPlanToEdit("")
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // close create plan modal if user clicks outside the modal
            const target = event.target as Node
            if (createModalRef.current && !createModalRef.current.contains(target)) {
                setCreateModal(false)
                setPlanName("")
            }
        }
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [createModalRef]);

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
                                            onClick={() => (setDropDown(!dropDown), setCreateModal(false))}
                                            className="p-3 flex justify-between">
                                                <p>{ selectedPlan ? `${selectedPlan.plan_name}`: "Select a Plan"}</p>
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
                                                        onClick={() => setCreateModal(true)}
                                                        style={{ border : "1px dashed #006AFF", color : "#006AFF"}}
                                                        className="bg-white onHover flex justify-between p-3 text-left rounded-md relative">
                                                        <h1>Create New Plan</h1>

                                                        <div>
                                                            <motion.div 
                                                                ref={createModalRef}
                                                                style={{ position : "fixed" }}
                                                                initial={{
                                                                    opacity: showCreateModal ? 0 : 1,
                                                                    y: -35,
                                                                }}
                                                                animate={{
                                                                    x: showCreateModal ? [100, 40] : [40, 100],
                                                                    opacity: showCreateModal ? 1 : 0
                                                                }}
                                                                transition={{
                                                                    duration: showCreateModal ? 0.3 : 0
                                                                }}
                                                                >
                                                                    <div 
                                                                        style={{ backgroundColor : "#333333"}}
                                                                        className="z-50 w-96 rounded-md shadow-md flex">
                                                                        <div className="m-auto flex justify-around w-11/12">
                                                                            <div className="input-container w-full">
                                                                                <input 
                                                                                    value={planName}
                                                                                    onChange={(e) => setPlanName(e.target.value)}
                                                                                    style={{ backgroundColor : "#333333", color : "white" }}
                                                                                    className="outline-none w-full auth-input"
                                                                                    type="text" required/>
                                                                                <label 
                                                                                    style={{ backgroundColor : "transparent", color : "white"}}
                                                                                    htmlFor="">Plan Name</label>
                                                                            </div>
                                                                            <div className="flex items-center justify-centers">
                                                                                <button onClick={(e) => handleSaveNewPlan(e)}>
                                                                                    {
                                                                                        planName !== "" 
                                                                                            ? <IoCheckmarkDoneSharp style={{ color : "green"}} className="w-6 h-6"/>
                                                                                            : <IoCloseCircleOutline  style={{ color : "white"}} className="w-6 h-6"/>
                                                                                    }
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                            </motion.div>
                                                        </div>
                                                    </div>

                                                    {plans && 
                                                        plans.map((plan) => {
                                                            return (
                                                                <div 
                                                                    key={plan._id}
                                                                    onDoubleClick={() => (setSelectedPlan(plan), setDropDown(false))}
                                                                    className="onHover bg-white flex justify-between p-4 text-left rounded-md">
                                                                    <h1>{plan.plan_name}</h1>
                                                                    <div className="flex w-12 items-center justify-between">
                                                                        <FiEdit2 onClick={() => {
                                                                            setNewPlanName(plan.plan_name)
                                                                            setPlanToEdit(plan._id) // sets the selected plan to edit
                                                                        }}/>
                                                                        <AiOutlineDelete />
                                                                        <motion.div 
                                                                            style={{ position : "fixed" }}
                                                                            initial={{
                                                                                opacity: plan._id === planToEdit ? 0 : 1,
                                                                                y: -10,
                                                                            }}
                                                                            animate={{
                                                                                x: plan._id === planToEdit ? [80, 90] : [80, 80],
                                                                                opacity: plan._id == planToEdit ? 1 : 0
                                                                            }}
                                                                            transition={{
                                                                                duration: plan._id == planToEdit ? 0.3 : 0
                                                                            }}
                                                                            >
                                                                                <div 
                                                                                    style={{ backgroundColor : "#333333"}}
                                                                                    className="z-50 w-96 h-42 rounded-md shadow-md flex">
                                                                                    <div className="m-auto flex justify-around w-11/12">
                                                                                        <div className="input-container w-full">
                                                                                            <input 
                                                                                                value={newPlanName}
                                                                                                onChange={(e) => setNewPlanName(e.target.value)}
                                                                                                style={{ backgroundColor : "#333333", color : "white" }}
                                                                                                className="outline-none w-full auth-input"
                                                                                                type="text" required/>
                                                                                            <label 
                                                                                                style={{ backgroundColor : "transparent", color : "white"}}
                                                                                                htmlFor="">Edit Plan Name</label>
                                                                                        </div>
                                                                                        <div className="flex items-center justify-centers">
                                                                                            <button onClick={(e) => { newPlanName !== "" && newPlanName !== plan.plan_name ? handleEditPlan(plan._id, e) : setPlanToEdit("")}}>
                                                                                                {
                                                                                                    newPlanName !== "" && newPlanName !== plan.plan_name
                                                                                                        ? <IoCheckmarkDoneSharp style={{ color : "green"}} className="w-6 h-6"/>
                                                                                                        : <IoCloseCircleOutline  style={{ color : "white"}} className="w-6 h-6"/>
                                                                                                }
                                                                                            </button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                        </motion.div>
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
                                className="p-3 bg-white rounded-md mt-6 h-1/2 overflow-hidden">
                                    <div className="flex w-full gap-x-2 overflow-hidden">
                                            <div 
                                                onClick={() => (handleNearby(0), setCategory(categories.RESTAURANTS), setSelectedPlace(null))}
                                                className="onHover2 grow p-2 bg-slate-100 rounded-xl cursor-pointer flex justify-center items-center">
                                                    <RiRestaurant2Line />
                                                    <p className="ml-2">Restaurants</p>
                                            </div>
                                            <div 
                                                onClick={() => (handleNearby(2), setCategory(categories.ATTRACTIONS), setSelectedPlace(null))}
                                                className="onHover2 grow p-2 bg-slate-100 rounded-xl cursor-pointer flex justify-center items-center">
                                                    <TbBeach />
                                                    <p className="ml-2">Attractions</p>
                                            </div>
                                            <div 
                                                onClick={() => (handleNearby(1), setCategory(categories.HOTELS), setSelectedPlace(null))}
                                                className="onHover2 grow p-2 bg-slate-100 rounded-xl cursor-pointer flex justify-center items-center">
                                                    <MdOutlineHotel />
                                                    <p className="ml-2">Hotels</p>
                                            </div>
                                    </div>
                                    <div className="h-5/6 overflow-y-auto mt-5">
                                            {
                                                isLoading 
                                                    ? 
                                                        <div className="flex w-full h-full">
                                                            <ReactLoading 
                                                                className="m-auto"
                                                                type="spin" 
                                                                height={"5rem"} 
                                                                width={"5rem"} 
                                                                color="#006AFF" />
                                                        </div>
                                                    :
                                                        <div className="overflow-y-auto flex flex-col w-full">

                                                            { fetchedNearby.length > 0 ? 
                                                                fetchedNearby.map((place : Place, index : number) => {
                                                                        return (
                                                                            <div 
                                                                                onClick={() => {(
                                                                                    flyToLocation(parseFloat(place.longitude), parseFloat(place.latitude)), 
                                                                                    setSelectedPlace(place)
                                                                                    )
                                                                                }}
                                                                                key={place.location_id}
                                                                                style={{ border : "1px solid #006AFF", height : "130px" }}
                                                                                className={`onHover2 w-full rounded-md flex cursor-pointer ${index == 0 ? "" : "mt-2"}`}>
                                                                                    <div className="w-1/3 flex items-center justify-center">
                                                                                        { place.photo 
                                                                                            ?
                                                                                                <img 
                                                                                                    style={{ borderRadius : "1rem "}}
                                                                                                    className="w-full h-full p-2"
                                                                                                    src={place.photo.images.original.url} 
                                                                                                    alt="" />
                                                                                            :   
                                                                                                <div className="flex items-center justify-center p-2">                                                                                                
                                                                                                    {
                                                                                                        selectedCategory == categories.HOTELS 
                                                                                                            ? <MdOutlineHotel size={50}/>
                                                                                                                : selectedCategory == categories.RESTAURANTS
                                                                                                                    ? <RiRestaurant2Line size={50}/> 
                                                                                                                        : selectedCategory == categories.ATTRACTIONS
                                                                                                                            && <TbBeach size={50}/>
                                                                                                    }
                                                                                                </div>
                                                                                        }
                                                                                    </div>
                                                                                    <div className="w-2/3">

                                                                                        <div className="p-2 flex justify-between items-center h-1/3">
                                                                                            <h1 className={`font-black text-lg truncate ${ selectedCategory == categories.HOTELS ? "w-3/5" : "w-2/3"}`}>{place.name}</h1>
                                                                                            <p style={{ color : "#006AFF"}} className="text-xs text-end">
                                                                                                {
                                                                                                    selectedCategory == categories.RESTAURANTS || categories.HOTELS ? place.price  : ""
                                                                                                }
                                                                                            </p>
                                                                                        </div>

                                                                                        <div className="p-2 h-2/3">
                                                                                            <p style={{ color : "#006AFF", whiteSpace : "nowrap"}} className="text-sm">{place.location_string}</p>
                                                                                            <p className="text-xs truncate">
                                                                                                {   selectedCategory == categories.RESTAURANTS || categories.ATTRACTIONS ? place.address
                                                                                                        : selectedCategory == categories.HOTELS && place.ranking
                                                                                                }
                                                                                            </p>
                                                                                            <p className="text-xs">{place.ranking}</p>

                                                                                        </div>

                                                                                    </div>
                                                                            </div>
                                                                        )
                                                                })

                                                                : // placeholder
                                                                    <>
                                                                        <div 
                                                                            style={{ border : "1px solid #006AFF", height : "110px" }}
                                                                            className={`w-full rounded-md flex shadow-md`}>
                                                                                <div className="w-full flex items-center">
                                                                                    <div className="p-2 h-2/3 w-full">
                                                                                        <p className="w-5/6 h-2 bg-slate-100 rounded-md" />
                                                                                        <p className="w-4/6 mt-2 h-2 bg-slate-100 rounded-md" />
                                                                                        <p className="w-2/6 mt-2 h-2 bg-slate-100 rounded-md" />
                                                                                    </div>
                                                                                </div>
                                                                        </div>

                                                                        <div 
                                                                            style={{ border : "1px solid #006AFF", height : "110px" }}
                                                                            className={`w-full rounded-md flex mt-2 shadow-md`}>
                                                                                <div className="w-full flex items-center">
                                                                                    <div className="p-2 h-2/3 w-full">
                                                                                        <p className="w-5/6 h-2 bg-slate-100 rounded-md" />
                                                                                        <p className="w-4/6 mt-2 h-2 bg-slate-100 rounded-md" />
                                                                                        <p className="w-2/6 mt-2 h-2 bg-slate-100 rounded-md" />
                                                                                    </div>
                                                                                </div>
                                                                        </div>

                                                                        <div 
                                                                            style={{ border : "1px solid #006AFF", height : "110px" }}
                                                                            className={`w-full rounded-md flex mt-2 shadow-md`}>
                                                                                <div className="w-full flex items-center">
                                                                                    <div className="p-2 h-2/3 w-full">
                                                                                        <p className="w-5/6 h-2 bg-slate-100 rounded-md" />
                                                                                        <p className="w-4/6 mt-2 h-2 bg-slate-100 rounded-md" />
                                                                                        <p className="w-2/6 mt-2 h-2 bg-slate-100 rounded-md" />
                                                                                    </div>
                                                                                </div>
                                                                        </div>
                                                                        
                                                                    </>
                                                            }
                                                            
                                                        </div>
                                                    
                                            }
                                    </div>
                            </div> 
                            
                            <div className="flex justify-around items-center w-full h-1/2">
                                
                                    <div className="w-1/2 h-full flex">
                                        <div className="w-full my-auto">
                                            <Cal setSelectedDate={setSelectedDate} selectedDate={selectedDate}/>
                                        </div>
                                    </div>

                                    <div className="w-1/2 h-full flex">
                                        <div className="text-xl w-full my-auto">
                                            <p className="p-4 text-center text-sm">Plan for :   
                                                <a style={{ color : "#006AFF"}} className="ml-2">
                                                    { dayjs(selectedDate).format("MM-DD-YYYY") }
                                                </a>
                                            </p>
                                            <div className="overflow-y-auto h-80">
                                                {
                                                    placesForDate && placesForDate.length > 0
                                                        ? placesForDate.map((place) => (
                                                            <div 
                                                                onClick={() => flyToLocation(parseFloat(place.longitude), parseFloat(place.latitude))}                                                               
                                                                key={place.location_id} 
                                                                className=" rounded-xl shadow-md relative onHover mt-2 h-24 flex cursor-pointer">
                                                                    <img 
                                                                        className="w-full h-full object-cover"
                                                                        style={{ borderRadius : "0.5rem"}}
                                                                        src={place.photo.images.original.url} 
                                                                        alt="" />
                                                                    <div 
                                                                        // gradient overlay for image
                                                                        style={{ borderRadius : "0.5rem"}}
                                                                        className="gradient-overlay absolute inset-0" />
                                                                    <div className="absolute text-white z-50 w-full h-full flex justify-center">
                                                                        <div className="w-11/12 flex flex-col justify-center">
                                                                            <p>{place.name}</p> 
                                                                            <p className="text-xs font-thin">{place.address}</p>
                                                                        </div>
                                                                    </div>
                                                            </div>
                                                        ))
                                                        : // show placeholder
                                                            <>                                     
                                                                <div 
                                                                    style={{ border: "1px solid #eee"}}
                                                                    className="rounded-xl shadow-md relative mt-2 h-24 flex cursor-pointer">
                                                                        <div className="absolute text-white z-50 w-full h-full flex justify-center">
                                                                            <div className="w-11/12 flex flex-col justify-center">
                                                                                <p className="text-xs font-thin bg-slate-100 w-4/5 h-2 rounded-md"/>
                                                                                <p className="text-xs font-thin bg-slate-100 w-2/4 h-2 rounded-md mt-2"/>
                                                                            </div>
                                                                        </div>
                                                                </div>                                    
                                                                <div 
                                                                    style={{ border: "1px solid #eee"}}
                                                                    className="rounded-xl shadow-md relative mt-2 h-24 flex cursor-pointer">
                                                                        <div className="absolute text-white z-50 w-full h-full flex justify-center">
                                                                            <div className="w-11/12 flex flex-col justify-center">
                                                                                <p className="text-xs font-thin bg-slate-100 w-4/5 h-2 rounded-md"/>
                                                                                <p className="text-xs font-thin bg-slate-100 w-2/4 h-2 rounded-md mt-2"/>
                                                                            </div>
                                                                        </div>
                                                                </div>                                    
                                                                <div 
                                                                    style={{ border: "1px solid #eee"}}
                                                                    className="rounded-xl shadow-md relative mt-2 h-24 flex cursor-pointer">
                                                                        <div className="absolute text-white z-50 w-full h-full flex justify-center">
                                                                            <div className="w-11/12 flex flex-col justify-center">
                                                                                <p className="text-xs font-thin bg-slate-100 w-4/5 h-2 rounded-md"/>
                                                                                <p className="text-xs font-thin bg-slate-100 w-2/4 h-2 rounded-md mt-2"/>
                                                                            </div>
                                                                        </div>
                                                                </div>
                                                            </>
                                                }
                                            </div>

                                        </div>
                                    </div>
                            </div>

                    </div>
                </div>
        </div>
    )
}

export default MainDashboard