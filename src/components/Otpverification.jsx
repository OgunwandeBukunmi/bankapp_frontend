import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import UseContext from "./UseContext.jsx"; // Import the useContext
import Loader from './Loader.jsx';

const VerificationForm = () => {
  const { id } = useParams();
  const [OTP, setOtp] = useState('');
  const { PresentCountry } = UseContext(); // Use the useContext
  const [message, setMessage] = useState(''); // State for message
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const Navigate = useNavigate()

  useEffect(() => {
  
          if (!PresentCountry) {
              setIsLoading(true);
          } else {
              setIsLoading(false);
          }

  }, [PresentCountry]);

  // Function to get text based on the current language
  const getText = (english, german) => (PresentCountry === 'Germany' ? german : english);


  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setIsLoading(true)
    try {
      const token = localStorage.getItem("token");
      const request = await fetch(`http://localhost:3000/otp`, {
        method: "POST",
        headers: {
          "Authorization" : `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        
        body: JSON.stringify({ OTP, id }) // Include the id
      });

      const response = await request.json();
      setIsLoading(false)
      if(response.message){
          Navigate(`/dashboard/${id}`)
      }else{
        setMessage("Something went wrong")

      }
      
    } catch (error) {
      setMessage(getText('An error occurred. Please try again.', 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.'));
      console.error("Error:", error);
    }
  };

  

  return (
    !isLoading ?(
      <> <div className="w-[100vw] h-[100vh] p-8 flex flex-col justify-center items-center  rounded-lg shadow-md ">

      <div className='bg-white w-[90vw] sm:w-[70vw] md:w-[55vw] flex flex-col items-center padding10'>
        <h2 className="text-2xl font-semibold text-gray-800 bg-white text-center">{getText('OTP Verification', 'OTP-Verifizierung')}</h2>
        <p>{getText('Please Input the OTP Code sent to you', 'Bitte geben Sie den Ihnen zugesandten OTP-Code ein')}</p>
      </div>
      <main className="  w-[90vw] sm:w-[70vw] md:w-[55vw] h-[35vh] sm:h-[30vh] md:h-[30vh] flex flex-col gap-5 justify-center items-center rounded-lg bg-white">


        <div className="w-3/4">
          <input
            type="text"
            id="otp"
            placeholder={getText("Code", "Code")}
            value={OTP}
            onChange={(e) => setOtp(e.target.value)}
            className="shadow input-type appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
          {message && <p className="text-red-500 text-sm">{message}</p>}
        <button
          onClick={handleSubmit}
          className="bg-blue-500 button hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-3/4"
        >
          {getText('Done', 'Fertig')}
        </button>



      </main>
    </div></>
    ):(
      <Loader/>
    )
   
  );
};

export default VerificationForm;
