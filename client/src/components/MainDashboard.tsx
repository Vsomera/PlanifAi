const MainDashboard = () => {
    return (
        <div 
            style={{ 
                width : "95%",
                backgroundColor: "rgba(255, 255, 255, 0.8)" }}
            className="absolute z-10 h-full backdrop-blur-sm flex">
           <div className="w-4/6 flex">
                <div 
                    style={{ height : "95%"}}
                    className="w-11/12 m-auto flex justify-center items-center">
                        <div>
                            Main Dashboard
                        </div>
                </div>
           </div>
           <div className="w-2/6 flex">
                <div 
                    style={{ height : "95%"}}
                    className="w-11/12 m-auto flex justify-center items-center">
                    Itinerary
                </div>
           </div>
        </div>
    ) 
}

export default MainDashboard