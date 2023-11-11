import mongoose from "mongoose"

export interface userSchema {
    username: string
    email: string
    password: string
}

export interface planSchema {
    user_id : mongoose.Schema.Types.ObjectId // associated with a user
    plan_name : string
    itinerary : [
        {
            location_id : string
            location_name : string
            lat : number
            long : number
            photoUrl? : string
            rating? : number // eg. 5.0, 4.5 
            ranking? : string
            price? : string // eg. $23 - $45
            is_closed : boolean
            date : Date // set by user
        }
    ]
}