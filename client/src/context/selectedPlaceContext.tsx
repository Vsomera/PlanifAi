import React, { createContext, useState, ReactNode } from 'react'

interface selectedPlaceContextType {
    selectedPlaceId : string
    setPlaceId : React.Dispatch<React.SetStateAction<string>>
}

export const SelectedPlaceContext = createContext<selectedPlaceContextType>({
    selectedPlaceId : "",
    setPlaceId : () => {}
})

interface Props {
    children: ReactNode;
}

export const SelectedPlaceContextProvider : React.FC<Props> = ({children}) => {
    const [selectedPlaceId, setPlaceId] = useState("")
    return (
        <SelectedPlaceContext.Provider value={{ selectedPlaceId, setPlaceId }}>
            {children}
        </SelectedPlaceContext.Provider>
    )
}