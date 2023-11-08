import { planSchema } from "../interfaces/schemas"
import { Schema } from "mongoose"
import mongoose from "mongoose"

const planSchema = new Schema<planSchema>({
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "User"
    },
    plan_name : String
})

const collection = "plans"
export default mongoose.model("Plan", planSchema, collection)