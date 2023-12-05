import axios from "axios"
import { toast } from "react-toastify"
import { SavedPlace } from "../interfaces/place"

export const fetchPlans = async (user : { accessToken : string }) => {
    try {
        const plans = await axios.get(`${import.meta.env.VITE_API_URL}/api/plans`, {
            headers : {
                Authorization : `Bearer ${user.accessToken}`
            }
        })
        return plans
    } catch (err) {
        console.log(err)
        toast.error("An error occurred fetching plans")
    }
}

export const savePlaceToPlan = async (user : { accessToken : string }, selectedPlanId : string, place : SavedPlace) => {
    try {
        const addPlace = await axios.post(`${import.meta.env.VITE_API_URL}/api/plans/${selectedPlanId}`, {place},{
            headers : {
                Authorization : `Bearer ${user.accessToken}`
            }
        }) 
        return addPlace
    } catch (err) {
        console.log(err)
        toast.error("An error occurred saving place to plan")
    }
}