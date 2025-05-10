import React, { useState } from 'react';
import logo from "../assets/logo.png";
import UseContext from "./UseContext.jsx";
import Loader from './Loader.jsx';

const About = () => {
  const { PresentCountry } = UseContext();
  const [isLoading,setIsLoading] = useState(false)
  useEffect(() => {
    if (!PresentCountry) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
}, [PresentCountry]);

  const getText = (english, german) => (PresentCountry === 'Germany' ? german : english);

  return (
    !isLoading ?(
      <> <nav className=" w-full flex p-5 items-center justify-between padding20">
      <a href="/"><img src={logo} className="w-[175px] h-[52px]" alt="" /></a>
      <div className='flex gap-[20px] items-center jusity-around'>
        <a href='/about' className='text-underline'>{getText('About', 'Über uns')}</a>
        <a className='button w-[70px] mx-4' href='./signup'>{getText('Sign Up', 'Anmelden')}</a>
      </div>
    </nav>
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ color: "#2c3e50" }}>{getText('About Centkey', 'Über Centkey')}</h1>
      <p style={{ fontSize: "16px", lineHeight: "1.6" }}>
        {getText(
          'Welcome to Centkey, a modern platform designed to help users securely manage their accounts and access protected resources. With a focus on security and ease of use, Centkey simplifies the process of authentication while ensuring that your personal information remains safe.',
          'Willkommen bei Centkey, einer modernen Plattform, die entwickelt wurde, um Nutzern zu helfen, ihre Konten sicher zu verwalten und auf geschützte Ressourcen zuzugreifen. Mit einem Fokus auf Sicherheit und Benutzerfreundlichkeit vereinfacht Centkey den Authentifizierungsprozess und stellt gleichzeitig sicher, dass Ihre persönlichen Informationen sicher bleiben.'
        )}
      </p>
      <h2 style={{ color: "#34495e" }}>{getText('What is Centkey?', 'Was ist Centkey?')}</h2>
      <p style={{ fontSize: "16px", lineHeight: "1.6" }}>
        {getText(
          'Centkey is a comprehensive user authentication system that allows you to create accounts, log in, and securely store data. Whether you\'re looking to build an app or integrate secure login functionality, Centkey makes it easier with features like token-based authentication and file upload capabilities.',
          'Centkey ist ein umfassendes Benutzerauthentifizierungssystem, mit dem Sie Konten erstellen, sich anmelden und Daten sicher speichern können. Egal, ob Sie eine App entwickeln oder eine sichere Anmeldefunktionalität integrieren möchten, Centkey erleichtert dies mit Funktionen wie der tokenbasierten Authentifizierung und Datei-Upload-Funktionen.'
        )}
      </p>
      <h2 style={{ color: "#34495e" }}>{getText('Our Mission', 'Unsere Mission')}</h2>
      <p style={{ fontSize: "16px", lineHeight: "1.6" }}>
        {getText(
          'Our mission at Centkey is to empower developers and users with a reliable and secure platform to manage their credentials and digital presence. We are committed to providing the best user experience while ensuring top-tier security for all our users.',
          'Unsere Mission bei Centkey ist es, Entwickler und Nutzer mit einer zuverlässigen und sicheren Plattform zur Verwaltung ihrer Anmeldeinformationen und ihrer digitalen Präsenz auszustatten. Wir sind bestrebt, die beste Benutzererfahrung zu bieten und gleichzeitig erstklassige Sicherheit für alle unsere Nutzer zu gewährleisten.'
        )}
      </p>
      <h2 style={{ color: "#34495e" }}>{getText('Why Choose Centkey?', 'Warum Centkey wählen?')}</h2>
      <ul style={{ fontSize: "16px" }}>
        <li>{getText('Easy account setup and management', 'Einfache Kontoerstellung und -verwaltung')}</li>
        <li>{getText('Fast and secure authentication with JWT', 'Schnelle und sichere Authentifizierung mit JWT')}</li>
        <li>{getText('File upload support', 'Unterstützung für Datei-Upload')}</li>
        <li>{getText('Comprehensive error handling and user feedback', 'Umfassende Fehlerbehandlung und Benutzer-Feedback')}</li>
      </ul>
    </div></>
     
    ):(
      <Loader/>
    )
      
    
  );
};

export default About;