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
        location_id: string;
        location_name: string;
        lat: number;
        long: number;
        photoUrl?: string;
        rating?: number;
        ranking?: string;
        price?: string;
        is_closed: boolean;
        date: Date;
    }>
})

const collection = "plans"
export default mongoose.model("Plan", planSchema, collection)