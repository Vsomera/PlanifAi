import { useContext } from "react"
import { ModalContext } from "../context/modalContext"
import { SelectedPlaceContext } from "../context/selectedPlaceContext"


const Modal = () => {

    const { showModal } = useContext(ModalContext)
    const { selectedPlace } = useContext(SelectedPlaceContext)

    const handleBackdropClick = (event : React.MouseEvent) => {
        // closes the modal if user clicks outside the modal
        if (event.currentTarget === event.target) {
            showModal(false);
        }
    };

    return (
        <div 
            onClick={handleBackdropClick}
            className="fixed bottom-0 left-0 w-full h-full flex z-50 backdrop-blur-sm">
                <div 
                    style={{ backgroundColor : "#333333", color : "white"}}
                    className="w-96 h-96 m-auto rounded-md shadow-lg flex">
                    Add {selectedPlace && selectedPlace.name} to Itinerary
                </div>
        </div>
    )
}

export default Modal