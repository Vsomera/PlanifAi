import { itinerarySchema } from "../interfaces/schemas"
import { Schema } from "mongoose"
import mongoose from "mongoose"

const itinerarySchema = new Schema<itinerarySchema>({
    plan_id : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "Plan"
    },
    itinerary_name : String,
    places : Array<{
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