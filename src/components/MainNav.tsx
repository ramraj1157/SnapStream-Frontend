import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import UsernameMenu from "./UserMenu";
import { useState, useEffect } from "react";


const MainNav = () => {
  const [loggedin, setIsloggedIn] = useState(false);
  const navigate = useNavigate(); 

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    console.log(storedUser)
    if (storedUser) {
      
      setIsloggedIn(true); 
    }
  }, []); 

  return (
    <span className="flex space-x-3 items-center">
      {loggedin ? (
        <>
          
          <UsernameMenu />
        </>
      ) : (
        <>
        <Button
          variant="ghost"
          className="font-bold hover:text-blue-500 "
          onClick={() => navigate("/login")} 
        >
          Log In
        </Button>
    
        </>
      )}
    </span>
  );
};

export default MainNav;