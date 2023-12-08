import React, { createContext, useState, ReactNode } from 'react'
import { SavedPlace } from '../interfaces/place'

interface PlacesForDateContextType {
    placesForDate : SavedPlace[]
    setPlacesForDate :  React.Dispatch<React.SetStateAction<SavedPlace[]>>
}

export const PlacesForDateContext = createContext<PlacesForDateContextType>({
    placesForDate : [],
    setPlacesForDate : () => {}
})

interface Props {
    children : ReactNode
}

export const PlacesForDateContextProvider : React.FC<Props> = ({ children }) => {
    // array of places from the selected date on the calendar
    const [placesForDate, setPlacesForDate] = useState<SavedPlace[]>([])
    return (
        <PlacesForDateContext.Provider value={{ placesForDate, setPlacesForDate }}>
            {children}
        </PlacesForDateContext.Provider>
    )
   
}