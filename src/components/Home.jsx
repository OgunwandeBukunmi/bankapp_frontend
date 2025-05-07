import React, { useState, useEffect } from 'react';
import logo from "../assets/logo.png";
import bankImage from "../assets/bankImage.png";
import shield from "../assets/shield.png";
import timer from "../assets/timer.png";
import workingTogether from "../assets/undrawWorkingTogether.png";
import { Link } from 'react-router-dom';
import UseContext from "./useContext.jsx";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true); // Start with loading true
  const { PresentUser, SetPresentUser, PresentCountry } = UseContext();

  useEffect(() => {
    // Simulate loading, and then check for PresentCountry
    const timer = setTimeout(() => {
        if (!PresentCountry) {
          setIsLoading(true);
        } else {
          setIsLoading(false);
        }
    }, 500); // reduced timeout to 500ms for faster loading

    return () => clearTimeout(timer); //clear timeout
  }, [PresentCountry]);

  console.log({ PresentUser, SetPresentUser, PresentCountry });

  const getText = (english, german) => (PresentCountry === 'Germany' ? german : english);
  const getAltText = (english, german) => (PresentCountry === 'Germany' ? german : english);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <>
      <section className='w-full flex flex-col items-center padding5'>
        <nav className="w-full flex flex-wrap gap-[10px] items-center justify-between padding20">
          <Link to="/">
            <img src={logo} className="w-[175px] h-[52px]" alt={getAltText("Centkey Logo", "Centkey Logo")} />
          </Link>
          <div className='flex gap-4 items-center justify-around mt-4 md:mt-0'>
            <Link to='/about' className='text-underline padding10 whitespace-nowrap'>{getText('About', 'Über uns')}</Link>
            <Link className='button w-[100px] whitespace-nowrap' to='./signup'>{getText('Sign Up', 'Anmelden')}</Link>
          </div>
        </nav>
        <main className='flex flex-col padding60 gap-[30px]' >
          <h1 className='text-2xl md:text-5xl   text-center font-bold'>{getText('Track, Monitor and Manage all your bank balances in One Place', 'Verfolgen, Überwachen und Verwalten Sie alle Ihre Bankguthaben an einem Ort')}</h1>
          <p className='md:text-[26px] text-[15px] text-center'>{getText('Tracking, monitoring and managing your funds has never been this easy. Start now and let’s take you on a memorable journey', 'Das Verfolgen, Überwachen und Verwalten Ihrer Gelder war noch nie so einfach. Starten Sie jetzt und lassen Sie sich auf eine unvergessliche Reise mitnehmen')}</p>
          <Link className='button w-30 p-4 self-center' to='/signup'>{getText('Get Started', 'Loslegen')}</Link>
        </main>
        <div className='mt-[20px] flex flex-col  md:flex-row items-center justify-around gap-[20px] bg-white  padding20 rounded-lg w-[80vw]'>
          <div className='flex flex-col text-center items-center justify-center'>
            <img src={shield} alt={getAltText("Shield Icon", "Schild Symbol")} />
            <h1>{getText('Secure', 'Sicher')}</h1>
            <p>{getText('End to end encrypted security', 'Ende-zu-Ende verschlüsselte Sicherheit')}</p>
          </div>
          <div className='flex flex-col text-center items-center justify-center'>
            <img src={timer} alt={getAltText("Timer Icon", "Timer Symbol")} />
            <h1>{getText('Real-time Updates', 'Echtzeit-Updates')}</h1>
            <p>{getText('Time to time update for a perfect user experience', 'Regelmäßige Updates für eine perfekte Benutzererfahrung')}</p>
          </div>
          <div className='flex flex-col text-center items-center justify-center'>
            <img src={bankImage} alt={getAltText("Bank Icon", "Bank Symbol")} />
            <h1>{getText('Bank Integrations', 'Bankintegrationen')}</h1>
            <p>{getText('We use special integration to analyse all bank results', 'Wir nutzen spezielle Integrationen zur Analyse aller Bankergebnisse')}</p>
          </div>
        </div>
        <main className='flex flex-col items-center gap-6 padding20 '>
          <h1 className='text-2xl md:text-4xl font-bold text-center'>{getText('Get to Know Us Better', 'Lernen Sie uns besser kennen')}</h1>
          <div className='flex flex-col md:flex-row items-center gap-8'>
            <img src={workingTogether} className='w-full md:w-1/2 rounded-lg shadow-md' alt={getAltText("People Working Together", "Menschen arbeiten zusammen")} />
            <p className='text-gray-700 text-md md:text-lg max-w-xl'>
              {getText(
                'Since its launch in 2022, Centkey has transformed how people manage their finances by providing a secure and very convenient platform to track and control all their money in one place.',
                'Seit seiner Einführung im Jahr 2022 hat Centkey die Art und Weise, wie Menschen ihre Finanzen verwalten, revolutioniert, indem es eine sichere und sehr bequeme Plattform bietet, um all ihr Geld an einem Ort zu verfolgen und zu kontrollieren.'
              )}
              <br /><br />
              {getText(
                'The app has empowered thousands of users to stay on top of their income, expenses, savings, and investments with real-time and smart budgeting tools. Over the years, it has earned trust for its simplicity, security, and ability to connect multiple accounts, making fund management easier than ever before.',
                'Die App hat Tausende von Nutzern in die Lage versetzt, ihre Einnahmen, Ausgaben und Investitionen mit Echtzeit- und intelligenten Budgetierungstools im Blick zu behalten. Im Laufe der Jahre hat sie Vertrauen gewonnen für ihre Einfachheit, Sicherheit und Fähigkeit, mehrere Konten zu verbinden, was die Fondsverwaltung einfacher denn je macht.'
              )}
            </p>
          </div>
        </main>
        <main className="w-full bg-gray-50 padding60 flex flex-col items-center ">
          <h2 className="text-3xl font-bold mb-8 text-center">{getText('What Our Users Are Saying', 'Was unsere Nutzer sagen')}</h2>

          <div className="bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row gap-[20px] items-center gap-6 max-w-4xl w-full">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
              alt={getAltText("User profile", "Nutzerprofil")}
              className="w-24 h-24 rounded-full object-cover"
            />

            <div className="flex flex-col  gap-[10px] items-center md:items-start">
              <div className="flex mb-2">
                {/* 5 Stars */}
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.91c.969 0 1.371 1.24.588 1.81l-3.974 2.888a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.54 1.118L10 15.347l-3.974 2.888c-.784.57-1.838-.197-1.539-1.118l1.518-4.674a1 1 0 00-.364-1.118L1.667 10.1c-.783-.57-.38-1.81.588-1.81h4.91a1 1 0 00.95-.69l1.518-4.674z" />
                  </svg>
                ))}
              </div>

              <h3 className="text-lg font-semibold">{PresentCountry === 'Germany' ? 'Gretchen Silberstein' : 'Seun lumberwood'}</h3>
              <p className="text-gray-600 text-sm text-center md:text-left mt-2">
                {getText(
                  '"Centkey has completely transformed the way I manage my finances. The real-time updates and easy integrations with banks are absolutely amazing!"',
                  '"Centkey hat die Art und Weise, wie ich meine Finanzen verwalte, komplett verändert. Die Echtzeit-Updates und die einfache Integration mit Banken sind absolut erstaunlich!"'
                )}
              </p>
            </div>
          </div>
        </main>
      </section>
      <footer className="w-full bg-gray-800 text-white padding20 flex flex-col items-center gap-4">
        <div className="w-full flex flex-col md:flex-row justify-between items-center max-w-7xl px-4">
          <div className="text-center md:text-left">
            <h1 className="text-xl font-bold">Centkey</h1>
            <p className="text-sm text-gray-400">{getText('Manage your finances, your way.', 'Verwalten Sie Ihre Finanzen, auf Ihre Weise.')}</p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mt-4 md:mt-0">
            <Link to="/about" className="text-gray-300 hover:text-white transition duration-300 text-sm">{getText('About', 'Über uns')}</Link>
            <Link to="/services" className="text-gray-300 hover:text-white transition duration-300 text-sm">{getText('Services', 'Dienste')}</Link>
            <Link to="/contact" className="text-gray-300 hover:text-white transition duration-300 text-sm">{getText('Contact', 'Kontakt')}</Link>
            <Link to="/privacy" className="text-gray-300 hover:text-white transition duration-300 text-sm">{getText('Privacy Policy', 'Datenschutzbestimmungen')}</Link>
          </div>
        </div>

        <div className="text-center text-gray-500 text-xs">
          &copy; {new Date().getFullYear()} Centkey. {getText('All rights reserved.', 'Alle Rechte vorbehalten.')}
        </div>
      </footer>
    </>
  );
};

export default Home;
