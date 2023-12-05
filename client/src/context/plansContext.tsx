import React, { createContext, useState, ReactNode } from 'react';
import { SavedPlace } from '../interfaces/place'

interface Plan {
  _id: string
  user_id: string
  plan_name: string
  itinerary: SavedPlace[]
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


