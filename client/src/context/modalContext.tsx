import React, { createContext, useState, ReactNode } from 'react'

interface MarkerContextType {
    modal : boolean
    showModal :  React.Dispatch<React.SetStateAction<boolean>>
}

export const ModalContext = createContext<MarkerContextType>({
    modal : false,
    showModal : () => {}
})

interface Props {
    children : ReactNode
}

export const ModalContextProvider : React.FC<Props> = ({ children }) => {
    // shows a modal popup depending on the boolean value
    const [modal, showModal] = useState(false)
    return (
        <ModalContext.Provider value={{ modal, showModal }}>
            {children}
        </ModalContext.Provider>
    )
}