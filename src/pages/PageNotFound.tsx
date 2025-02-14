import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Ghost } from "lucide-react";

export default function PageNotFound() {
  return (
    <div className="flex flex-col items-center justify-center  bg-gray-50 text-center px-4">
      <Ghost className="w-20 h-20 text-gray-400" />
      <h1 className="text-4xl font-bold mt-4 text-gray-800">404</h1>
      <p className="text-gray-600 text-lg mt-2">Oops! The page you’re looking for doesn’t exist.</p>
      <Button asChild className="mt-6">
        <Link to="/">Go Back Home</Link>
      </Button>
    </div>
  );
}
