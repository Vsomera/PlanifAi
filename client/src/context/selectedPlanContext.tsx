import React, { createContext, useState, ReactNode } from 'react'
import { SavedPlace } from '../interfaces/place'

  interface Plan {
    _id: string
    user_id: string
    plan_name: string
    itinerary: SavedPlace[]
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
  export const SelectedPlanContextProvider: React.FC<Props> = ({ children }) => {
    const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
    return (
      <SelectedPlanContext.Provider value={{ selectedPlan, setSelectedPlan }}>
        {children}
      </SelectedPlanContext.Provider>
    )
  }