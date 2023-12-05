import { SavedPlace } from "./place"
  
export interface Plan {
    _id: string
    user_id: string
    plan_name: string
    itinerary: SavedPlace[]
  }