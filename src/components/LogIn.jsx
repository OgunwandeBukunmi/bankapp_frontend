import { useNavigate, Link } from 'react-router-dom';
import React, { useState,useEffect } from 'react';
import UseContext from "./useContext.jsx";
import Loader from './Loader.jsx';

const LoginForm = () => {
  const { PresentCountry } = UseContext();
  const [isLoading,setIsLoading] = useState(false)
 
  useEffect(() => {
    // Simulate loading, and then check for PresentCou
        if (!PresentCountry) {
          setIsLoading(true);
        } else {
          setIsLoading(false);
        }
  }, [PresentCountry]);
  const getText = (english, german) => (PresentCountry === 'Germany' ? german : english);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(''); // Error state to hold error messages
  const Navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      const request = await fetch("https://centkey-backend.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password }),
        credentials: "include"
      });
      const data = await request.json();

      if (data.error) {
        setError(data.error); // Set the error message from the backend
      } else if (data.message) {
        Navigate(`/dashboard/${data.id}`); // Redirect to dashboard if login is successful
      }
    } catch (err) {
      setError(getText("An error occurred while logging in. Please try again.", "Ein Fehler ist beim Anmelden aufgetreten. Bitte versuchen Sie es erneut."));
      console.error(err); // Log the error for debugging
    }
  };

  return (
    !isLoading ? (
      <div className="w-[100vw] h-[100vh] p-8 flex flex-col justify-center items-center gap-[30px] rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">{getText("Log in", "Anmelden")}</h2>

      <main className="space-y-4 bg-white w-[90vw] sm:w-[70vw] md:w-[55vw] h-[80vh] sm:h-[75vh] md:h-[70vh] flex flex-col gap-5 justify-center items-center rounded-lg">

        {/* Error Message Section */}
        {error && (
          <div className="w-3/4 bg-red-100 text-red-700 p-4 rounded-md border border-red-400">
            {error}
          </div>
        )}

        <div className="w-3/4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            {getText("Email", "E-Mail")}
          </label>
          <input
            type="email"
            id="email"
            placeholder={getText("Email", "E-Mail")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow input-type appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="w-3/4">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
            {getText("Password", "Passwort")}
          </label>
          <input
            type="password"
            id="password"
            placeholder={getText("Password", "Passwort")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow input-type appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="w-3/4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <input type="checkbox" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
            <label>{getText("Remember Me", "Angemeldet bleiben")}</label>
          </div>

          <Link to="/" className="text-xs link text-blue-500 hover:text-blue-700 focus:outline-none focus:shadow-outline">
            {getText("Forgot password?", "Passwort vergessen?")}
          </Link>
        </div>

        <button
          onClick={handleSubmit}
          className="bg-blue-500 button hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-3/4"
        >
          {getText("Log in", "Anmelden")}
        </button>

        <div className="flex items-center justify-center my-4 w-3/4">
          <div className="border-t border-gray-300 w-1/3"></div>
          <span className="text-gray-500 mx-2 text-sm">{getText("or", "oder")}</span>
          <div className="border-t border-gray-300 w-1/3"></div>
        </div>

        <p className="text-center text-gray-600 text-sm">
          {getText("Don't have an account?", "Noch kein Konto?")}{' '}
          <Link
            to="/signup"
            className="text-blue-500 link hover:text-blue-700 font-semibold focus:outline-none focus:shadow-outline"
          >
            {getText("Sign up", "Registrieren")}
          </Link>
        </p>
      </main>
    </div>) :(
        <Loader/>
    )
    
  );
};

export default LoginForm;