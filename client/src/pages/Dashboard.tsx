import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/userContext"
import ReactMapGL, { NavigationControl, Marker } from 'react-map-gl';
import ReactLoading from 'react-loading';
import Sidebar from "../components/Sidebar"

const Dashboard = () => {

    const { user } = useContext(UserContext)
    const navigate = useNavigate()

    const [selected, select] = useState(0)
    const sidebarItem = {
        main: 0,
        map: 1,
        recommended: 2
    }

    const [viewState, setViewState] = useState({
        longitude: -123.10,
        latitude: 49.24,
        zoom: 11
    });

    useEffect(() => {
        if (user?.accessToken == null) {
            // redirect to login page if user is not authorized
            navigate("/login")
        }
    })

    return (
        <>
            <div className="flex w-full h-full">
                <Sidebar
                    sidebarItem={sidebarItem}
                    select={select}
                    selected={selected} />
                    { user?.accessToken ?
                            <ReactMapGL
                                mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
                                {...viewState}
                                onMove={evt => setViewState(evt.viewState)}
                                mapStyle="mapbox://styles/mapbox/streets-v12">
                                <Marker
                                    longitude={-123.076570}
                                    latitude={49.254670}>
                                    <img
                                        className="cursor-pointer"
                                        src="https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png" alt="" />
                                </Marker>
                                <NavigationControl visualizePitch={true} showZoom={false}/>
                            </ReactMapGL>
                        : 
                            <div className="m-auto">
                                <ReactLoading 
                                    type="spin" 
                                    height={"5rem"} 
                                    width={"5rem"} 
                                    color="#006AFF" />
                            </div>
                    }
            </div>
        </>
    )
}

export default Dashboard