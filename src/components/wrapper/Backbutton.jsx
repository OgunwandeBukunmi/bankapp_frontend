import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UseContext from "../UseContext.jsx"; // Import the context.  Corrected path.

function BackButton({ light = false }) {
  const navigate = useNavigate();
  const { PresentCountry } = UseContext(); // Access PresentCountry from the context
  const [buttonText, setButtonText] = useState('');
  const [isLoading,setIsLoading] = useState(false)


   useEffect(() => {
    if (!PresentCountry) {
      setIsLoading(true);
    } else {
      setIsLoading(false)
      if (PresentCountry === 'Germany') {
        setButtonText('Zurück');
      } else {
        setButtonText('Back');
      }
    }
    
  }, [PresentCountry]);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <button className={light ? `bg-white` : `bg-[#f4f4f4]`} onClick={handleGoBack}>
      &larr; {buttonText}
    </button>
  );
}

export default BackButton;
