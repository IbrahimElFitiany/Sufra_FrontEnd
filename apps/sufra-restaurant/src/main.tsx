import { createRoot } from 'react-dom/client'
import './index.css'

import LandingPage from '@pages/LandingPage'
createRoot(document.getElementById('root')!).render(
    <LandingPage />
)
