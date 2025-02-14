import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";


const MobileNavLinks = () => {
  const [user, setUser] = useState<{ email: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("user"); 
    setUser(null); 
  };

  return (
    <>
      {user && (
        <>
          <Link
            to="/all-posts"
            onClick={(e) => {
              e.preventDefault();
              toast.info("All Posts feature is coming soon!");
            }}
            
            className="flex bg-white dark:bg-black items-center font-bold hover:text-blue-500"
          >
            All Posts
          </Link>
          <Link
            to="/chats"
            onClick={(e) => {
              e.preventDefault();
              toast.info(" Chats feature is coming soon!");
            }}
            
            className="flex bg-white dark:bg-black items-center font-bold hover:text-blue-500"
          >
            Chats
          </Link>
       
          <Link
            
            to="/user-profile"
            className="flex bg-white dark:bg-black items-center font-bold hover:text-blue-500"
          >
            User Profile
          </Link>
          <Link
            
            to="/feed"
            className="flex bg-white dark:bg-black items-center font-bold hover:text-blue-500"
          >
           Feed
          </Link>
          <Button
            onClick={logout} // Correct invocation of the logout function
            className="flex items-center px-3 bg-black font-bold hover:bg-gray-600"
          >
            Log Out
          </Button>
        
        </>
      )}
    </>
  );
};

export default MobileNavLinks;