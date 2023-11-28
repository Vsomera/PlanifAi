import { useContext, useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/userContext"
import { toast } from "react-toastify";
import { fetchPlans } from "../services/planService";
import ReactMapGL, { NavigationControl, Marker, MapRef } from 'react-map-gl';
import ReactLoading from 'react-loading';
import Sidebar from "../components/Sidebar"
import MainDashboard from "../components/MainDashboard";
import ItineraryMap from "../components/ItineraryMap";
import { PlansContext } from "../context/plansContext";
import Recommended from "../components/Recommended";
import { MarkerContext } from "../context/markerContext";
import { Place } from "../interfaces/place";
import MarkerPopUp from "../components/MarkerPopUp";
import { SelectedPlaceContext } from "../context/selectedPlaceContext";


type UserLocationState = {
    latitude: number | null
    longitude: number | null
} | null

const Dashboard = () => {
    
    const { user } = useContext(UserContext)
    const { setPlans } = useContext(PlansContext)
    const { markers } = useContext(MarkerContext)
    const { selectedPlaceId, setPlaceId } = useContext(SelectedPlaceContext)

    const navigate = useNavigate()

    const mapRef = useRef<MapRef>()

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

    const flyToLocation = (longitude : number, latitude : number) => {
        if (mapRef.current) {
            const mapInstance = mapRef.current.getMap()
            if (mapInstance) {
                mapInstance.flyTo({center:[longitude, latitude], zoom: 16 })
            }
        }
    }

    const resetView = () => {

        if (userLocation?.latitude && userLocation.longitude) {
            const { longitude, latitude } = userLocation

            if (mapRef.current) {
                const mapInstance = mapRef.current.getMap()
                if (mapInstance) {
                    mapInstance.flyTo({center:[longitude, latitude], zoom: 10.5 })
                }
            }
        }
    }

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
            const getUserPlans = async () => {
                // fetches all plan objects from database owned by user
                if (user) {
                    const getPlans = await fetchPlans(user)
                    if (getPlans) {
                        const planArr = [...getPlans.data.plans]
                        setPlans(planArr)
                    }
                }
            }
            getUserPlans()
        }
    }, [navigate, user?.accessToken, setPlans, user])

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
                                ? <MainDashboard 
                                    userLocation={userLocation} 
                                    flyToLocation={flyToLocation} 
                                    resetView={resetView}/>
                                : selected == sidebarItem.map 
                                    ? <ItineraryMap />
                                    : selected == sidebarItem.recommended 
                                        && <Recommended />
                        }
                    </main>
                    { user?.accessToken ?
                            <ReactMapGL
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                ref={mapRef} // ignore error
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
                                    { // show fetched places on map as markers
                                        markers.length > 0 && markers.map((place : Place) => {
                                            return (
                                                <Marker    
                                                    onClick={() => {
                                                        flyToLocation(parseFloat(place.longitude), parseFloat(place.latitude))
                                                        setPlaceId(place.location_id)
                                                    }}
                                                    key={place.location_id}
                                                    longitude={parseFloat(place.longitude)}
                                                    latitude={parseFloat(place.latitude)}
                                                    >
                                                        <div className="flex object-cover">
                                                            <img 
                                                                className="cursor-pointer w-5 h-5 object-cover z-10 text-yellow"
                                                                src="https://docs.mapbox.com/help/demos/custom-markers-gl-js/mapbox-icon.png" 
                                                                alt="" 
                                                                />
                                                                { selectedPlaceId == place.location_id && <MarkerPopUp place={place}/> }
                                                        </div>
                                                </Marker>
                                        )
                                    })
                                    }
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