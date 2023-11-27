import { PlansContext } from "../context/plansContext"
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { AiOutlineDelete } from "react-icons/ai";
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { FiEdit2 } from "react-icons/fi";
import { useContext, useState } from "react"
import { SelectedPlanContext } from "../context/selectedPlanContext";
import { RiRestaurant2Line } from "react-icons/ri";
import { TbBeach } from "react-icons/tb";
import { MdOutlineHotel } from "react-icons/md";
import { Plan } from "../interfaces/plan";
import { fetchNearby } from "../api/travelAdv";
import { toast } from "react-toastify"
import ReactLoading from "react-loading"
import { Place } from "../interfaces/place";
import { MarkerContext } from "../context/markerContext";

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

    const { userLocation } = props
    const latitude = userLocation?.latitude
    const longitude = userLocation?.longitude


    const { plans } = useContext(PlansContext)
    const { selectedPlan, setSelectedPlan } = useContext(SelectedPlanContext)

    const [fetchedNearby, setFetchedNearby] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [dropDown, setDropDown] = useState(false)

    const [selectedCategory, setCategory] = useState("")

    const { setMarkers } = useContext(MarkerContext)

    const selectPlan = (plan : Plan) => {
        setSelectedPlan(plan)
    }   

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
                                className="p-3 bg-white rounded-md mt-6 h-1/2 overflow-hidden">
                                    <div className="flex w-full gap-x-2 overflow-hidden">
                                            <div 
                                                onClick={() => (handleNearby(0), setCategory(categories.RESTAURANTS))}
                                                className="onHover2 grow p-2 bg-slate-100 rounded-xl cursor-pointer flex justify-center items-center">
                                                    <RiRestaurant2Line />
                                                    <p className="ml-2">Restaurants</p>
                                            </div>
                                            <div 
                                                onClick={() => (handleNearby(2), setCategory(categories.ATTRACTIONS))}
                                                className="onHover2 grow p-2 bg-slate-100 rounded-xl cursor-pointer flex justify-center items-center">
                                                    <TbBeach />
                                                    <p className="ml-2">Attractions</p>
                                            </div>
                                            <div 
                                                onClick={() => (handleNearby(1), setCategory(categories.HOTELS))}
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

                                                            { fetchedNearby.length > 0 && 
                                                                fetchedNearby.map((place : Place, index : number) => {
                                                                        return (
                                                                            <div 
                                                                                onClick={() => flyToLocation(parseFloat(place.longitude), parseFloat(place.latitude))}
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
                                                            }
                                                            
                                                        </div>
                                                    
                                            }
                                    </div>
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