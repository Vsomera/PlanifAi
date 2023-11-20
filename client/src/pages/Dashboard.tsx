import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/userContext"
import { toast } from "react-toastify";
import ReactMapGL, { NavigationControl, Marker } from 'react-map-gl';
import ReactLoading from 'react-loading';
import Sidebar from "../components/Sidebar"
import MainDashboard from "../components/MainDashboard";
import ItineraryMap from "../components/ItineraryMap";
import Recommended from "../components/Recommended";

type UserLocationState = {
    latitude: number | null
    longitude: number | null
} | null

const Dashboard = () => {
    
    const { user } = useContext(UserContext)
    const navigate = useNavigate()

    const [userLocation, setUserLocation] = useState<UserLocationState>(null)

    const [selected, select] = useState(0)
    const sidebarItem = {
        main: 0,
        map: 1,
        recommended: 2
    }

    const [viewState, setViewState] = useState({
        longitude: -123.10,
        latitude: 49.24,
        zoom: 10.5
    });

    const locationSuccess = (position: GeolocationPosition) => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        setUserLocation({ latitude, longitude })
    }
    const locationError = () => {
        toast.warning("Location permissions denied")
        toast.info("Enable location permissions for the best experience")
    }



    useEffect(() => {
        if (user?.accessToken == null) {
            // redirect to login page if user is not authorized
            navigate("/login");
        } else {
            if (navigator.geolocation) { // fetches user location
                navigator.geolocation.getCurrentPosition(locationSuccess, locationError);
            } else  {
                toast.info("GeoLocation not supported on device");
            }
        }
    }, [navigate, user?.accessToken])

    return (
        <>
            <div className="flex w-full h-full overflow-hidden">
                <Sidebar
                    sidebarItem={sidebarItem}
                    select={select}
                    selected={selected} />
                    <main className="w-2/3 shadow-lg z-30">
                        {
                            // Render Components based on the selected state
                            selected == sidebarItem.main 
                                ? <MainDashboard />
                                : selected == sidebarItem.map 
                                    ? <ItineraryMap />
                                    : selected == sidebarItem.recommended 
                                        && <Recommended />
                        }
                    </main>
                    { user?.accessToken ?
                            <ReactMapGL
                                mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
                                {...viewState}
                                onMove={evt => setViewState(evt.viewState)}
                                mapStyle="mapbox://styles/mapbox/streets-v12">
                                    { userLocation // show user location on map
                                        && userLocation.longitude !== null 
                                            && userLocation.latitude !== null &&
                                        <Marker
                                            longitude={userLocation.longitude}
                                            latitude={userLocation.latitude}>
                                            <img
                                                className="cursor-pointer"
                                                src="https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png" alt="" />
                                        </Marker>
                                    }
                                    {/* <Marker
                                        longitude={-123.1038}
                                        latitude={49.2734}>
                                        <img
                                            className="cursor-pointer"
                                            src="https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png" alt="" />
                                    </Marker> */}
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