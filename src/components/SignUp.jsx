import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import UseContext from "./UseContext.jsx";
import Loader from './Loader.jsx';

const SignUp = () => {
  const { PresentCountry } = UseContext();
 
  const getText = (english, german) => (PresentCountry === 'Germany' ? german : english);
  const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
          if (!PresentCountry) {
            setIsLoading(true);
          } else {
            setIsLoading(false);
          }
    }, [PresentCountry]);
  const [Error, setError] = useState("");
  const [FirstName, setfirstName] = useState("");
  const [SecondName, setSecondName] = useState("");
  const [OtherName, setOtherName] = useState("");
  const [UserName, setUserName] = useState("");
  const [dateOfBirth, setdateOfBirth] = useState("");
  const [Gender, setGender] = useState("male");
  const [password, setPassword] = useState("");
  const [Email, setEmail] = useState("");
  const [passwordrequirements, setPasswordRequirements] = useState({
    Length: false,
    Symbols: false,
    Numbers: false,
    Capitals: false,
    Lowercase: false,
  });
  const [file, setFile] = useState([]);
  const Navigate = useNavigate();


  const HandlePassword = (e) => {
    const Symbols = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "-", "=", "[", "]", "{", "}", ";", ":", "'", "\"", ",", ".", "<", ">", "/", "?", "\\", "|"];
    const Numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const Capitals = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
    const Lowercase = [..."abcdefghijklmnopqrstuvwxyz"];

    function ContainsElement(Array, checkArray) {
      return Array.some(item => checkArray.includes(item));
    }

    const password = e.target.value;
    setPassword(password);
    let passwordArray = password.split("");

    setPasswordRequirements({
      Length: passwordArray.length >= 8,
      Symbols: ContainsElement(Symbols, passwordArray),
      Numbers: ContainsElement(Numbers, passwordArray),
      Capitals: ContainsElement(Capitals, passwordArray),
      Lowercase: ContainsElement(Lowercase, passwordArray),
    });
  };

  const handleSubmit = async () => {
    if (!FirstName || !SecondName || !OtherName || !UserName || !dateOfBirth || !Gender || !password || !Email || file.length < 2) {
      console.log("error somewhere");
      setError(getText("Incomplete Requirements", "Unvollständige Angaben"));
      return;
    }
    if (!Object.values(passwordrequirements).every(Boolean)) {
      setError(getText("Password Needs To meet Requirements", "Passwort muss Anforderungen erfüllen"));
      return;
    }

    const formData = new FormData();
    formData.append("FirstName", FirstName);
    formData.append("SecondName", SecondName);
    formData.append("OtherName", OtherName);
    formData.append("UserName", UserName);
    formData.append("password", password);
    formData.append("Email", Email);
    formData.append("dateofBirth", dateOfBirth);
    formData.append("files", file[0]);
    formData.append("files", file[1]);

    setIsLoading(true);
    const request = await fetch("http://localhost:3000/signup", {
      method: "POST",
      body: formData,
    });
    const data = await request.json();
    const id = data.id
    if (data.message) {
      localStorage.setItem("token", data.token);
      Navigate(`/dashboard/${id}`)
    }


  };

  return (
    !isLoading ? (
      <section className='signupSection p-5 flex flex-col items-center gap-5'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold'>{getText("Let's Get to Know You", "Lernen wir Sie kennen")}</h1>
          <p className='text-sm mt-2 text-gray-600'>
            {getText("Your personal data is secure in compliance with strict data protection regulations", "Ihre persönlichen Daten sind sicher und entsprechen strengen Datenschutzbestimmungen")}
          </p>
        </div>

        <main className='bg-white w-full max-w-6xl rounded-lg shadow-lg p-8 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>
          {/* First Name */}
          <div className='flex flex-col'>
            <label htmlFor="firstName" className='mb-1 text-sm font-medium'>{getText("First Name", "Vorname")}</label>
            <input type="text" name="firstName" className='input-type' value={FirstName} onChange={(e) => setfirstName(e.target.value)} placeholder={getText("First Name", "Vorname")} />
          </div>

          {/* Second Name */}
          <div className='flex flex-col'>
            <label htmlFor="secondName" className='mb-1 text-sm font-medium'>{getText("Second Name", "Zweiter Name")}</label>
            <input type="text" name="secondName" className='input-type' value={SecondName} onChange={(e) => setSecondName(e.target.value)} placeholder={getText("Second Name", "Zweiter Name")} />
          </div>

          {/* Other Names */}
          <div className='flex flex-col'>
            <label htmlFor="otherNames" className='mb-1 text-sm font-medium'>{getText("Other Names", "Andere Namen")}</label>
            <input type="text" name="otherNames" className='input-type' value={OtherName} onChange={(e) => setOtherName(e.target.value)} placeholder={getText("Other Names", "Andere Namen")} />
          </div>

          {/* Username */}
          <div className='flex flex-col'>
            <label htmlFor="userName" className='mb-1 text-sm font-medium'>{getText("Username", "Benutzername")}</label>
            <input type="text" name="userName" className='input-type' value={UserName} onChange={(e) => setUserName(e.target.value)} placeholder={getText("Username", "Benutzername")} />
          </div>

          {/* Date of Birth */}
          <div className='flex flex-col'>
            <label htmlFor="dateOfBirth" className='mb-1 text-sm font-medium'>{getText("Date of Birth", "Geburtsdatum")}</label>
            <input type="date" name="dateOfBirth" className='input-type' value={dateOfBirth} onChange={(e) => setdateOfBirth(e.target.value)} />
          </div>

          {/* Gender */}
          <div className='flex flex-col'>
            <label htmlFor="gender" className='mb-1 text-sm font-medium'>{getText("Gender", "Geschlecht")}</label>
            <select name="gender" className="input-type" onChange={(e) => setGender(e.target.value)}>
              <option>{getText("Male", "Männlich")}</option>
              <option>{getText("Female", "Weiblich")}</option>
              <option>{getText("Other", "Andere")}</option>
            </select>
          </div>

          {/* Email */}
          <div className='flex flex-col'>
            <label htmlFor="email" className='mb-1 text-sm font-medium'>Email</label>
            <input type="email" name="email" className='input-type' value={Email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          </div>

          {/* Password */}
          <div className='flex flex-col md:col-span-2'>
            <label htmlFor="password" className='mb-1 text-sm font-medium'>{getText("Password", "Passwort")}</label>
            <input type="password" name="password" className='input-type' value={password} onChange={HandlePassword} placeholder={getText("Password", "Passwort")} />
          </div>

          {/* Password Requirements */}
          <div className='grid grid-cols-2 sm:grid-cols-3 gap-2 md:col-span-3'>
            {Object.entries(passwordrequirements).map(([key, value]) => (
              <p key={key} className={`rounded-lg text-center text-xs font-semibold p-2 ${value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {getText(key, {
                  Length: "Länge",
                  Symbols: "Symbole",
                  Numbers: "Zahlen",
                  Capitals: "Großbuchstaben",
                  Lowercase: "Kleinbuchstaben",
                }[key] || key)}
              </p>
            ))}
          </div>

          {/* File Upload */}
          <div className='flex flex-col md:col-span-3'>
            <label className='text-sm font-medium mb-2'>{getText("Upload ID (Both sides)", "Ausweis hochladen (beide Seiten)")}</label>
            <input type="file" multiple onChange={(e) => setFile(e.target.files)} className='input-type' />
          </div>

          {/* Submit Button */}
          <div className='flex md:col-span-3 justify-center'>
            <button onClick={handleSubmit} className="button w-full sm:w-1/2">{getText("Done", "Fertig")}</button>
          </div>

          {/* Error Message */}
          {Error && (
            <div className='col-span-3 text-center bg-red-200 text-red-800 rounded-md p-3 text-sm font-bold'>
              {Error}
            </div>
          )}
        </main>
        <p className='text-sm text-gray-600'>
          {getText("Already have an account?", "Haben Sie bereits ein Konto?")} <Link to="/login" className='text-blue-600 underline font-semibold'>{getText("Log in", "Einloggen")}</Link>
        </p>

      </section>
    ) : (
      <Loader />
    )

  );
};

export default SignUp;
