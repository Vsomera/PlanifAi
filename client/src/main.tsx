import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { MarkerContextProvider } from './context/markerContext.tsx';
import { SelectedPlanContextProvider } from './context/selectedPlanContext.tsx';
import { UserContextProvider } from './context/userContext.tsx';
import { PlanContextProvider } from './context/plansContext.tsx';
import { SelectedPlaceContextProvider } from "./context/selectedPlaceContext.tsx"
import { ModalContextProvider } from './context/modalContext.tsx';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { PlacesForDateContextProvider } from './context/placesForDateContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <PlacesForDateContextProvider>
        <ModalContextProvider>
          <SelectedPlaceContextProvider>
            <MarkerContextProvider>
              <SelectedPlanContextProvider>
                <PlanContextProvider>
                  <UserContextProvider>
                    <App />
                    <ToastContainer theme='colored' />
                  </UserContextProvider>
                </PlanContextProvider>
              </SelectedPlanContextProvider>
            </MarkerContextProvider>
          </SelectedPlaceContextProvider>
        </ModalContextProvider>
      </PlacesForDateContextProvider>
    </LocalizationProvider>
  </React.StrictMode>,
)
