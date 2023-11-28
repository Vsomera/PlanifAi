import React, { createContext, useState, ReactNode } from 'react';

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

interface Plan {
  _id: string
  user_id: string
  plan_name: string
  itinerary: ItineraryItem[]
}
interface PlansContextType {
  plans: Plan[]
  setPlans: React.Dispatch<React.SetStateAction<Plan[]>>
}
export const PlansContext = createContext<PlansContextType>({
  plans : [],
  setPlans: () => {}
})

interface Props {
  children: ReactNode;
}
export const PlanContextProvider: React.FC<Props> = ({ children }) => {
  const [plans, setPlans] = useState<Plan[]>([])
  return (
    <PlansContext.Provider value={{ plans, setPlans }}>
      {children}
    </PlansContext.Provider>
  )
}


