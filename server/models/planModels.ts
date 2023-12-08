import { planSchema } from "../interfaces/schemas"
import { Schema } from "mongoose"
import mongoose from "mongoose"

const planSchema = new Schema<planSchema>({
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "User" // associated with a user
    },
    plan_name : String,
    itinerary : Array<{
        location_id : string
        name : string
        longitude : string // convert to number
        latitude : string // convert to number
        address : string
        description : string
        photo : {
            images : {
                original : {
                    url : string // photo URL
                }
            }
        }
        hotel_class : string
        location_string : string
        rating : string // 5.0
        booking : {
            provider : string // OpenTable
            url : string
        }
        price : string // "CA$15 - CA$258"
        price_level : string // "$$$$"
        address_obj : {
            city : string
            country : string
            state : string | null
            street1 : string
            street2 : string
        }
        ranking : string
        category : { // restaurant, hotel, attraction...
            key : string
            name : string
        }
        website : string // website url
        web_url : string // tripadvisor url
        date : Date
    }>
})

const collection = "plans"
export default mongoose.model("Plan", planSchema, collection)