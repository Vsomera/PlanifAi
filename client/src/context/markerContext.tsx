import React, { createContext, useState, ReactNode } from 'react'
import { Place } from '../interfaces/place'

interface MarkerContextType {
    markers : Place[]
    setMarkers :  React.Dispatch<React.SetStateAction<Place[]>>
}

export const MarkerContext = createContext<MarkerContextType>({
    markers : [],
    setMarkers : () => {}
})

interface Props {
    children: ReactNode;
}

export const MarkerContextProvider : React.FC<Props> = ({ children }) => {
    // an array of places => to be shown on map
    const [markers, setMarkers] = useState<Place[]>([])
    return (
      <MarkerContext.Provider value={{ markers, setMarkers }}>
        {children}
      </MarkerContext.Provider>
    )
}