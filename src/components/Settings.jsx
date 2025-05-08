import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UseContext from "./useContext.jsx";
import BackButton from "./wrapper/Backbutton.jsx";
import Loader from "./Loader.jsx";

const UserInfoDisplay = ({ userInfo, isGerman }) => (
  <div className="rounded-xl w-[100vw] padding20 min-h-screen bg-[#f4f4f4]">
    <div className="mb10 flex justify-around gap-[30px] items-center">
      <p className="font-semibold">{isGerman ? 'Vorname:' : 'First Name:'}</p>
      <p className="padding10 rounded-md">{userInfo?.FirstName || 'N/A'}</p>
    </div>

    <div className="mb10 flex justify-around gap-[30px] items-center">
      <p className="font-semibold">{isGerman ? 'Zweiter Name:' : 'Second Name:'}</p>
      <p className="padding10 rounded-md">{userInfo?.SecondName || 'N/A'}</p>
    </div>

    <div className="mb10 flex justify-around gap-[30px] items-center">
      <p className="font-semibold">{isGerman ? 'Anderer Name:' : 'Other Name:'}</p>
      <p className="padding10 rounded-md">{userInfo?.OtherName || 'N/A'}</p>
    </div>

    <div className="mb10 flex justify-around gap-[30px] items-center">
      <p className="font-semibold">{isGerman ? 'Benutzername:' : 'Username:'}</p>
      <p className="padding10 rounded-md">{userInfo?.UserName || 'N/A'}</p>
    </div>

    <div className="mb10 flex justify-around gap-[30px] items-center">
      <p className="font-semibold">{isGerman ? 'Geburtsdatum:' : 'Date of Birth:'}</p>
      <p className="padding10 rounded-md">{userInfo?.dateofBirth || 'N/A'}</p>
    </div>

    <div className="mb10 flex justify-around gap-[30px] items-center">
      <p className="font-semibold">E-Mail:</p>
      <p className="padding10 rounded-md">{userInfo?.Email || 'N/A'}</p>
    </div>
  </div>
);

const Settings = () => {
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const { PresentUser, PresentCountry } = UseContext();
    const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    // Simulate loading, and then check for PresentCou
        if (!PresentCountry) {
          setIsLoading(true);
        } else {
          setIsLoading(false);
        }
  }, [PresentCountry]);

  useEffect(() => {
    if (PresentUser) {
      setUserInfo(PresentUser);
      console.log(PresentUser);
    }
  }, [PresentUser]);
  useEffect(()=>{
    if(!userInfo){
      setIsLoading(true)
    }else{
      setIsLoading(false)
    }
  },[userInfo])

  if (error) {
    return <div>Fehler: {error}</div>;
  }

  const isGerman = PresentCountry === 'Germany';
 

  return (
    !isLoading ? (
      <>
       <BackButton />
        <UserInfoDisplay userInfo={userInfo} isGerman={isGerman} />
        </>
      ) : (
        <Loader/>
      )
  );
};

export default Settings;