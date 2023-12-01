import React, { createContext, useState, ReactNode } from 'react'
import { Place } from '../interfaces/place';

interface selectedPlaceContextType {
    selectedPlace : Place | null
    setSelectedPlace : React.Dispatch<React.SetStateAction<Place | null>>
}

export const SelectedPlaceContext = createContext<selectedPlaceContextType>({
    selectedPlace : null,
    setSelectedPlace : () => {}
})

interface Props {
    children: ReactNode;
}

export const SelectedPlaceContextProvider : React.FC<Props> = ({children}) => {
    const [selectedPlace, setSelectedPlace] = useState<Place | null >(null)
    return (
        <SelectedPlaceContext.Provider value={{ selectedPlace, setSelectedPlace }}>
            {children}
        </SelectedPlaceContext.Provider>
    )
}