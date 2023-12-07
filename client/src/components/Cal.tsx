import { Calendar, Badge } from 'rsuite';
import { useContext, useEffect } from "react"
import { SelectedPlanContext } from '../context/selectedPlanContext';
import dayjs from 'dayjs';
import 'rsuite/dist/rsuite-no-reset.min.css';
import { PlacesForDateContext } from '../context/placesForDateContext';

interface Props {
    selectedDate : Date
    setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
}

const Cal = (props : Props) => {

    const { selectedPlan } = useContext(SelectedPlanContext);
    const { selectedDate, setSelectedDate } = props
    const { setPlacesForDate } = useContext(PlacesForDateContext)

    // useEffect(() => {
    //     console.log(placesForDate); // for debug
    // }, [placesForDate])

    useEffect(() => {
        // update places for selected date
        const updatePlacesForDate = () => {
            if (selectedPlan && selectedPlan.itinerary) {
                const day = dayjs(selectedDate).format('YYYY-MM-DD');

                const places = selectedPlan.itinerary.filter(item => 
                    dayjs(item.date).format('YYYY-MM-DD') === day)

                setPlacesForDate(places);
            }
        }
        updatePlacesForDate()
    }, [setSelectedDate, selectedPlan, selectedDate, setPlacesForDate])


    const itineraryDates = (date : Date) => {
        if (!selectedPlan || !selectedPlan.itinerary) {
          return [];
        }
    
        const day = dayjs(date).format('YYYY-MM-DD');
        const list = selectedPlan.itinerary.filter(item => dayjs(item.date).format('YYYY-MM-DD') === day)
        // console.log("List for", day, ":", list) // for debug
        return list;
    }
    
    const renderCell = (date : Date) => {
        const list = itineraryDates(date);
        if (list.length) {
          return (
            <>
                <Badge className="calendar-todo-item-badge" /> 
                <p></p>
            </>
          ) 
        }
        return null;
    }

    return (
        <div style={{ width: '100%', height: 'auto' }}>
            <Calendar 
                onChange={(date : Date) => setSelectedDate(date)}
                onSelect={(date : Date) => setSelectedDate(date)}
                compact
                renderCell={renderCell} />
        </div>
    )
}

export default Cal
