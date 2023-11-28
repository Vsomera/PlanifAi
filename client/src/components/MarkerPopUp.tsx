import '../index.css'
import { Place } from '../interfaces/place'
import Rating from '@mui/material/Rating';


interface Props {
    place : Place
}

const MarkerPopUp = (props : Props) => {

    const { name, photo, price, description, rating, booking, website } = props.place

    return (
        <div 
            style={{ top : "-15rem", left : "2rem"}}
            className="absolute bg-white rounded-md h-fit w-72 flex flex-col z-50">

            <div className='h-3/6'>
                <img 
                    style={{ borderRadius : "10px 10px 0 0"}}
                    className='w-full h-full object-cover'
                    src={photo.images.original.url} 
                    alt="" />
            </div>

            <div className='w-5/6 py-4 m-auto flex flex-col'>
                <h1 className='text-lg font-black'>{name}</h1>
                <p>{price}</p>
                {booking && 
                    <a 
                        className="underline text-cyan-800" 
                        target="_blank"
                        rel="noopener noreferrer"
                        href={booking.url}>Book with {booking.provider}</a>
                } 
                {website && 
                    <a 
                        className="underline text-cyan-800" 
                        target="_blank"
                        rel="noopener noreferrer"
                        href={website}>Website</a>
                } 
                <Rating className="mt-2" name="read-only" value={parseFloat(rating)} precision={0.5} readOnly />
                <p className='mt-2'>{description}</p>
            </div>

        </div>
    )
}

export default MarkerPopUp