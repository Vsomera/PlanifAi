import { userSchema } from "../interfaces/schemas"
import { Schema } from "mongoose"
import mongoose from "mongoose"

const userSchema = new Schema<userSchema>({
    email: {
        type: String,
        required: [true, "Please Enter an Email"]
    },
    password: {
        type: String,
        required: [true, "Please Enter a Password"]
    }
}, { timestamps: true })

const collection = "users"
export default mongoose.model("User", userSchema, collection)