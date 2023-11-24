import axios from "axios"
import { calculateBoundingCoordinates } from "../helper/geoHelper"

export const fetchNearby = async ( 
    longitude : number, 
    latitude : number, 
    km : number, // units in km away from location
    fetchOption : number  // 0 : fetch for restaurants, 1 : fetch for hotels, 2 : fetch for attractions
    ) => {

    // returns a list of restaurants, hotels, or attractions near given coordinates

    const boxCoords = calculateBoundingCoordinates(longitude, latitude, km) // box surrounding given location
    const { topRight, bottomLeft } = boxCoords

    if (fetchOption > 2) {
        throw new Error("Invalid fetch option")
    }

    const fetchType: { [key: number]: string } = {
        0 : "restaurants",
        1 : "hotels",
        2 : "attractions"
    }

    const option = fetchType[fetchOption];

    const options = {
        method: 'GET',
        url: `https://travel-advisor.p.rapidapi.com/${option}/list-in-boundary`,
        params: {
            bl_latitude: bottomLeft.latitude,
            tr_latitude: topRight.latitude,
            bl_longitude: bottomLeft.longitude,
            tr_longitude: topRight.longitude,
          limit: '20',
          currency: 'CAD',
          open_now: 'false',
          lunit: 'km',
          lang: 'en_US'
        },
        headers: {
          'X-RapidAPI-Key': `${import.meta.env.VITE_RAPID_API_KEY}`,
          'X-RapidAPI-Host': `${import.meta.env.VITE_RAPID_API_TRAVEL_ADV}`
        }
      }

    const response = await axios.request(options)
    return response.data.data
}