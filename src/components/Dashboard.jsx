import React, { useState, useEffect } from "react";
import logolight from "../assets/logoLight.png";
import { Home, HelpCircle, Clock, Settings, Menu } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import UseContext from "./UseContext.jsx";
import Loader from "./Loader.jsx";

const Dashboard = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [isLoading,setIsLoading] = useState(false)
   let {  SetPresentUser, PresentCountry } = UseContext();
  const { id } = useParams();
  const [verification, SetVerification] = useState(false);
  useEffect(() => {
        if (!PresentCountry) {
          setIsLoading(true);
        } else {
          setIsLoading(false);
        }
  }, [PresentCountry]);
  const getText = (english, german) => (PresentCountry === 'Germany' ? german : english);
  const getAltText = (english, german) => (PresentCountry === 'Germany' ? german : english);

  useEffect(() => {
    const fetchUserInfo = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`https://centkey-backend.onrender.com/user/${id}`);

        if (!response.ok) {
          throw new Error(getText('Failed to fetch user data', 'Fehler beim Abrufen der Nutzerdaten'));
        }

        const data = await response.json();

        SetVerification(data.verification);
        SetPresentUser(data)
        setIsLoading(false)
      } catch (err) {
        console.error({ error: err });
      }
    };

    fetchUserInfo();
  }, []);

  return (
    !isLoading ? (  <section className="flex flex-col md:flex-row w-full h-full min-h-screen">
      {/* Toggle Button (visible on small screens) */}
      <div className="md:hidden flex justify-between items-center padding20 bg-[#1E2A38] text-white">
        <img src={logolight} alt={getAltText("Centkey logo", "Centkey Logo")} className="h-8" />
        <button onClick={() => setShowSidebar(!showSidebar)}>
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar */}

      <div className={showSidebar ? `w-[100vw] md:w-[20vw] bg-[#1E2A38] text-white padding10 hidden  space-y-8 md:block` : ` w-full md:w-[20vw] bg-[#1E2A38] text-white padding10  visible space-y-8 md:block`}>
        <div className="hidden md:flex items-center space-x-2 text-2xl font-bold ">
          <img src={logolight} alt={getAltText("Centkey logo", "Centkey Logo")} className="padding10" />
        </div>
        <nav className="space-y-4">
          <div className="flex items-center space-x-3 cursor-pointer padding10">
            <Link to="/" className="flex gap-[5px]">
              <Home className="w-5 h-5" />
              <span>{getText("Home", "Startseite")}</span>
            </Link>
          </div>
          <div className="flex items-center space-x-3 cursor-pointer gap-[5px] padding10">
            <Link to="/" className="flex gap-[5px]">
              <HelpCircle className="w-5 h-5" />
              <span>{getText("Customer support", "Kundensupport")}</span>
            </Link>
          </div>
          <div className="flex items-center space-x-3 cursor-pointer gap-[5px] padding10">
            <Link to="/" className="flex gap-[5px]">
              <Clock className="w-5 h-5" />
              <span>{getText("Transactions", "Transaktionen")}</span>
            </Link>
          </div>
          <div className="flex items-center space-x-3 cursor-pointer gap-[5px] padding10">
            <Link to={`/settings/${id}`} className="flex gap-[5px]">
              <Settings className="w-5 h-5" />
              <span>{getText("Settings", "Einstellungen")}</span>
            </Link>
          </div>
        </nav>
      </div>


      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-around bg-gray-100 padding20 w-[100vw] md:w-[80vw]">
        <div className="flex items-center justify-between padding10">
          <h1 className=" font-semibold mb-6">{getText("Dashboard", "Dashboard")}</h1>
          {verification && (<Link to={`/verification/${id}`} className="button md:text-xl  text-md">{getText("Verification", "Verifizierung")}</Link>)}
        </div>


        <div className="bg-white padding20 md:rounded-xl shadow-md mb-6 flex flex-col items-center sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-gray-500 text-sm">{getText("Total Assets", "Gesamtes Vermögen")}</p>
            <h2 className="text-2xl font-bold">$ 0.00</h2>
          </div>
          <Link to={`/connectbank/${id}`} className="bg-[#1E2A38] text-white padding10 rounded-md">
            {getText("Add Bank", "Bank hinzufügen")}
          </Link>
        </div>

        <div className="bg-white p-10 md:rounded-xl shadow-md flex flex-col items-center justify-center h-64">
          <div className="flex flex-col bg-[#E9E9E9] padding20 rounded-lg items-center">
            <Link to={`/connectbank/${id}`} className="flex flex-col items-center">
              <div className="text-6xl text-[#1E2A38] mb-2">+</div>
              <p className="text-lg font-medium text-[#1E2A38]">{getText("Bank Account", "Bankkonto")}</p>
            </Link>
          </div>
        </div>
      </div>
    </section>) :(
      <Loader/>
    )
  
  );
};

export default Dashboard;
