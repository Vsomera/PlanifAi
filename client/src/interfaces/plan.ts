interface ItineraryItem {
    location_id: string
    location_name: string
    lat: number
    long: number
    photoURL: string
    ranking: string
    price: string
    is_closed: boolean
    date: string
  }
  
export interface Plan {
    _id: string
    user_id: string
    plan_name: string
    itinerary: ItineraryItem[]
  }