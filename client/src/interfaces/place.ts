export interface Place {
    location_id : string
    name : string
    longitude : string // convert to number
    latitude : string // convert to number
    address : string
    description : string
    photo : {
        images : {
            original : {
                url : string // photo URL
            }
        }
    }
    location_string : string
    rating : string
    booking : {
        provider : string // OpenTable
        url : string
    }
    price : string // "CA$15 - CA$258"
    price_level : string // "$$$$"
    address_obj : {
        city : string
        country : string
        state : string | null
        street1 : string
        street2 : string
    }
    ranking : string
    category : { // restaurant, hotel, attraction...
        key : string
        name : string
    }
}