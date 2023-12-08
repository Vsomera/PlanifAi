import axios, { AxiosError } from "axios";
import { toast } from "react-toastify"
import { SavedPlace } from "../interfaces/place"

interface ApiErrorResponse {
    error: string
}

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
        const addPlace = await axios.post(`${import.meta.env.VITE_API_URL}/api/plans/${selectedPlanId}`, { place },{
            headers : {
                Authorization : `Bearer ${user.accessToken}`
            }
        }) 
        return addPlace
    } catch (err) {
        const axiosError = err as AxiosError
        console.log(axiosError)
        if (axiosError.response) {
            const responseData = axiosError.response.data as ApiErrorResponse;
            toast.error(responseData.error)
        } else {
            toast.error("Could not add place to plan")
        }
    }
}

export const createPlan = async (user : { accessToken : string }, plan_name : string) => {
    try {
        const newPlan = await axios.post(`${import.meta.env.VITE_API_URL}/api/plans`, { plan_name }, {
            headers : {
                Authorization : `Bearer ${user.accessToken}`
            }
        })
        return newPlan
     } catch (err) {
        const axiosError = err as AxiosError
        console.log(axiosError)
        if (axiosError.response) {
            const responseData = axiosError.response.data as ApiErrorResponse;
            toast.error(responseData.error)
        } else {
            toast.error("Could not add place to plan")
        }
    }
}