import React, { createContext, useState, ReactNode } from 'react'

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

  interface SelectedPlanContextType {
    selectedPlan: Plan | null
    setSelectedPlan: React.Dispatch<React.SetStateAction<Plan | null>>
  }

  export const SelectedPlanContext = createContext<SelectedPlanContextType>({
    selectedPlan : null,
    setSelectedPlan : () => {}
  })
  interface Props {
    children: ReactNode;
  }
  export const PlanContextProvider: React.FC<Props> = ({ children }) => {
    const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
    return (
      <SelectedPlanContext.Provider value={{ selectedPlan, setSelectedPlan }}>
        {children}
      </SelectedPlanContext.Provider>
    )
  }