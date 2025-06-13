import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import {AppContextProvider} from "./context/AppContext.jsx";
import {ClerkProvider} from "@clerk/clerk-react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if(!PUBLISHABLE_KEY) {
    throw new Error("Publishable_key is missing")
}

createRoot(document.getElementById('root')).render(
  <AppContextProvider>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <App />
    </ClerkProvider>
  </AppContextProvider>,
)
