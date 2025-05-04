
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const VerificationForm = () => {
  const {id} = useParams();
  const [OTP, setOtp] = useState('');
 

  const handleSubmit =  async (e) => {
  
    const request = await fetch(`https://centkey-backend.onrender.com/otp`,{
      method :"POST",
      headers:{
        "Content-Type" : "application/json"
      },
      credentials : 'include',
      body : JSON.stringify({OTP})
    })
    const response =await request.json();
    if(response.message){
      console.log(response.message)
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] p-8 flex flex-col justify-center items-center  rounded-lg shadow-md ">
    
    <div className='bg-white w-[90vw] sm:w-[70vw] md:w-[55vw] flex flex-col items-center padding10'> 
      <h2 className="text-2xl font-semibold text-gray-800 bg-white text-center">OTP Verification</h2>
    <p>Please Input the OTP Code sent to you</p> </div> 
      <main className="  w-[90vw] sm:w-[70vw] md:w-[55vw] h-[35vh] sm:h-[30vh] md:h-[30vh] flex flex-col gap-5 justify-center items-center rounded-lg bg-white">
      

        <div className="w-3/4">
          <input
            type="text"
            id="password"
            placeholder="Code"
            value={OTP}
            onChange={(e) => setOtp(e.target.value)}
            className="shadow input-type appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="bg-blue-500 button hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-3/4"
        >
          Done
        </button>

      
       
      </main>
    </div>
  );
};

export default VerificationForm;
