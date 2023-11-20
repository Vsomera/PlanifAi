import axios from "axios"
import { toast } from "react-toastify"

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