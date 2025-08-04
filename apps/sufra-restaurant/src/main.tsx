import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import RestaurantRegistration from '@pages/RestaurantRegistrationPage'
createRoot(document.getElementById('root')!).render(
    <RestaurantRegistration />
)
