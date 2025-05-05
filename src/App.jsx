import React, { createContext ,useState,useEffect} from 'react';
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom';
import Home from './components/Home';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import BankDetails from './components/BankDetails';
import Dashboard from './components/Dashboard';
import Verification from "./components/Otpverification"
import ProtectedRoute from './components/wrapper/Protectedroute';
import About from "./components/About"
import Settings from "./components/Settings.jsx"


 export let UserContext = createContext();


 export function UserContextProvider ({children}){
const [PresentUser,SetPresentUser] = useState(null)
const [PresentCountry,SetPresentCountry] = useState("Germany");

useEffect(() => {
  async function getUserCountry() {
    let country;
    try {
      // Attempt to use an alternative IP geolocation service (ip-api.com)
      const alternativeResponse = await fetch('https://ipapi.co/json/');
  
      if (alternativeResponse.ok) {
          const data = await alternativeResponse.json();
          country  = await data.country_name;
         
          SetPresentCountry(country);
          return; // IMPORTANT: Return after successful response
      }
  
      // If the alternative API also fails, try the original one (ipapi.co) and handle errors
      const response = await fetch('https://ip-api.com/json');
      if (!response.ok) {
        // Check for 429 specifically
        if (response.status === 429) {
          throw new Error('Too Many Requests from ipapi.co. Please try again later.');
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }
      const text = await response.json();
        country = text.country_name
    } catch (error) {
      console.error('Error fetching location:', error);
      res.status(500).json({ error: error.message || 'Failed to fetch location' }); // Include the error message
    }

    
  }

  getUserCountry();
}, []);
  return (
    <UserContext.Provider value={{PresentUser,SetPresentUser,PresentCountry}}>
      {children}
    </UserContext.Provider>
  )
}

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route index element={<Home />} /> {/* Index route for / */}
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/connectbank/:id" element={<BankDetails />} />
        <Route path="/dashboard/:id" element={ <ProtectedRoute> <Dashboard /> </ProtectedRoute>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/settings/:id' element={<ProtectedRoute><Settings/></ProtectedRoute>}/>
         <Route path='/verification/:id' element={<Verification/>}/>
      </Route>
    )
  )
  return (
    <>
    
  <RouterProvider router={router} />
  
    </>
  )
}

export default App