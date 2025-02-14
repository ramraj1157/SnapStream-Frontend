import { CircleUserRound, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import MobileNavLinks from "./MobileNavLinks";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


const MobileNav = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<{ email: string; authToken: string; id: string }>({
    email: "",
    authToken: "",
    id: "",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const currentUser = JSON.parse(storedUser);
      setUser({
        email: currentUser.email,
        authToken: currentUser.authToken,
        id: currentUser.id,
      });
    }
  }, []);

  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-black" />
      </SheetTrigger>

      <SheetContent className="space-y-3">
        <SheetTitle>
          {user.email ? (
            <span className="flex items-center font-bold gap-2">
              <CircleUserRound className="text-black" />
              {user.email}
            </span>
          ) : (
            <span>Welcome to SnapStream</span>
          )}
        </SheetTitle>

        <Separator />

        <SheetDescription className="flex flex-col gap-4">
          {user.email ? (
            <MobileNavLinks />
          ) : (
            <>
            <Button
              onClick={() => navigate("/login")}
              className="flex-1 font-bold bg-black"
            >
              Log In
            </Button>
  
            </>
            
          )}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;