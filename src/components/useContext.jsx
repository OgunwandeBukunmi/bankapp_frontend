import { useContext } from "react";
import { UserContext } from "../App.jsx";

 function UseContext(){
    const {PresentUser,SetPresentUser,PresentCountry} =  useContext(UserContext);

    const result  = {PresentUser,SetPresentUser,PresentCountry}
    
    
    return result;
}

export default UseContext;