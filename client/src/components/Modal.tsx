import { useContext, useEffect, useState } from "react"
import { ModalContext } from "../context/modalContext"
import { SelectedPlaceContext } from "../context/selectedPlaceContext"
import { FiEdit2 } from "react-icons/fi";
import { IoIosArrowUp } from "react-icons/io";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegCircleCheck } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import Rating from '@mui/material/Rating';
import { PlansContext } from "../context/plansContext";
import { SelectedPlanContext } from "../context/selectedPlanContext";
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import dayjs, { Dayjs } from "dayjs";
import React from "react";
import { savePlaceToPlan } from "../services/planService";
import { UserContext } from "../context/userContext";
import { SavedPlace } from "../interfaces/place";
import { toast } from "react-toastify"

const Modal = () => {

    const { user } = useContext(UserContext)
    const { showModal } = useContext(ModalContext)
    const { selectedPlace } = useContext(SelectedPlaceContext)
    const { plans } = useContext(PlansContext)
    const { selectedPlan, setSelectedPlan } = useContext(SelectedPlanContext)

    const [dropDown, setDropDown] = useState(false)
    const [dateVal, setDateVal] = React.useState<Dayjs | null>(dayjs('2022-04-17'))

    useEffect(() => {
        console.log(dateVal)
    }, [dateVal])

    const handleBackdropClick = (event : React.MouseEvent) => {
        // closes the modal if user clicks outside the modal
        if (event.currentTarget === event.target) {
            showModal(false);
        }
    };

    const handleSavePlace = async () => {
        // adds selected place to selected itinerary in database
        if (!selectedPlace || !selectedPlace.location_id || !user || !selectedPlan) {
            return toast.error("Missing required fields to save the place");
        }
        if (!dateVal) {
            return toast.warning("Date is required");
        }
        console.log(selectedPlace)
        const savedPlace: SavedPlace = {...selectedPlace, date: dateVal, location_id: selectedPlace.location_id }
        await savePlaceToPlan(user, selectedPlan._id, savedPlace)
        showModal(false)
    }
    

    return (
        <div 
            onClick={handleBackdropClick}
            className="fixed bottom-0 left-0 w-full h-full flex z-50">
                <div 
                    style={{ 
                        borderRadius : "0.5rem",
                        backgroundColor : "#333333", 
                        color : "white",
                        width : "625px",
                        height : "740px"
                    }}
                    className="m-auto shadow-2xl flex flex-col">
                        <div className="relative">
                            <div style={{ borderRadius : "0.4rem"}}>

                                    <div className="absolute bottom-10 left-8 w-inherit h-inherit z-50">
                                        <h1 className="text-4xl mb-2">
                                            {selectedPlace  && selectedPlace.name}
                                        </h1>
                                        <p>{selectedPlace && selectedPlace.ranking}</p>
                                        { selectedPlace && 
                                            <Rating 
                                                name="read-only" 
                                                value={parseFloat(selectedPlace?.rating)} 
                                                precision={0.5} readOnly /> 
                                        }
                                    </div>

                                    <img 
                                        className="object-cover w-full h-60"
                                        style={{ borderRadius : "0.5rem 0.5rem 0 0"}}
                                        src={selectedPlace ? selectedPlace.photo.images.original.url : ""} 
                                        alt="" />

                                    <div 
                                        // gradient overlay for image
                                        style={{ borderRadius : "0.5rem 0.5rem 0 0"}}
                                        className="gradient-overlay absolute inset-0" />
                            </div>
                        </div>

                        <div className="w-full h-full flex">   
                                <div style={{ width : "88%"}} className="mx-auto flex flex-col">
                                    <div className="w-full relative">
                                        <div 
                                            onClick={() => setDropDown(!dropDown)}
                                            className="onHover-dark rounded-md mt-3 p-3 flex justify-between cursor-pointer">
                                                <p>{ selectedPlan ? `${selectedPlan.plan_name}`: "Select a Plan"}</p>
                                                { 
                                                    selectedPlan 
                                                    ?
                                                        <FaRegCircleCheck
                                                            style={{ 
                                                                color : "#006AFF",
                                                                width : "24px", 
                                                                height : "24px"}}/>
                                                    :
                                                        dropDown 
                                                            ?
                                                            <IoIosArrowUp 
                                                                style={{ 
                                                                    color : "#006AFF",
                                                                    width : "24px", 
                                                                    height : "24px"}}/>
                                                            :
                                                            <IoIosArrowDown 
                                                                style={{ 
                                                                    color : "#006AFF",
                                                                    width : "24px", 
                                                                    height : "24px"}}/>
                                                }
                                        </div>
                                        { dropDown &&
                                                <div className="absolute w-full z-10 mt-2 rounded-lg shadow-lg">
                                                    <div 
                                                        style={{ backgroundColor : "#333333", border : "1px dashed #006AFF", color : "#006AFF"}}
                                                        className="onHover-dark cursor-pointer flex justify-between p-3 text-left rounded-md">
                                                        <h1>Create New Plan</h1>
                                                    </div>
                                                    {plans && 
                                                        plans.map((plan) => {
                                                            return (
                                                                <div 
                                                                    key={plan._id}
                                                                    style={{ backgroundColor : "#333333"}}
                                                                    onClick={() => (setSelectedPlan(plan), setDropDown(false))}
                                                                    className="onHover-dark  flex justify-between p-4 text-left rounded-md cursor-pointer">
                                                                    <h1>{plan.plan_name}</h1>
                                                                    <div className="flex w-12 items-center justify-between">
                                                                        <FiEdit2 />
                                                                        <AiOutlineDelete />
                                                                    </div>
                                                                </div>
                                                            )
                                                        })}

                                                </div>
                                        }
                                    </div>

                                    <div className="w-full h-full">
                                        <StaticDatePicker 
                                            value={dateVal}
                                            onChange={(newValue) => setDateVal(newValue)}
                                            className="modal w-full" 
                                            orientation="landscape" />
                                        <div className="flex justify-end">
                                            <div className="w-32 flex justify-between mr-5">
                                                <button onClick={() => showModal(false)}>Cancel</button>
                                                <button onClick={() => handleSavePlace()}>Save</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </div>
                </div>
        </div>
    )
}

export default Modal