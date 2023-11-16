import axios from "axios"
import { toast } from "react-toastify"

export const registerUser = async (email : string, password : string) => {
        try {
            const data = { email, password }
            const userToken = await axios.post(`${import.meta.env.VITE_API_URL}/api/users`, data) 
            toast.success("Registration Successful")
            return userToken
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) { 
                if (err.response) { // if error message is provided
                    const { error } = err.response.data
                    toast.error(`Error - ${error}`)
                } else {
                    console.log(err)
                    toast.error("Could not register User")
                }
            }
    }
}

export const loginUser = async (email : string, password : string) => {
    try {
        const data = { email, password } 
        const userToken = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/login`, data) 
        toast.success("Login Successful")
        return userToken
    } catch (err) {
        if (axios.isAxiosError(err)) { 
            if (err.response) { // if error message is provided
                const { error } = err.response.data
                toast.error(`Error - ${error}`);
            } else {
                console.log(err)
                toast.error("Could not login User")
            }
        }
    }
}
