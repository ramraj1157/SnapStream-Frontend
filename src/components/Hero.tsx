import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-white via-blue-400 to-white text-center px-6">
      
      {/* App Name / Quote */}
      <h1 className="text-5xl lg:text-6xl font-extrabold text-blue-900 mb-4 animate-fadeIn">
        SnapStream
      </h1>
      <p className="text-lg lg:text-xl text-white mb-8">
        "Connect, Share, and Grow Together 🚀"
      </p>

      {/* Authentication Buttons */}
      <div className="flex flex-col sm:flex-row sm:justify-center space-y-4 sm:space-y-0 sm:space-x-6">
        <Link to="/signup">
          <Button variant="outline" className="bg-blue-900 rounded-md text-white font-semibold px-8 py-3  shadow-lg transition">
            Sign Up
          </Button>
        </Link>
        <Link to="/login">
          <Button
            variant="outline"
            className="bg-black text-white font-semibold px-8 py-3 rounded-md shadow-lg hover:bg-white hover:text-blue-600 transition"
          >
            Login
          </Button>
        </Link>
      </div>

      {/* Features Section */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 text-left max-w-4xl">
        {[
          
          {
            title: "Sign Up and Verify Email",
            description:
              "Account security is our first policy"
          },
          {
            title: "Access All features",
            description:
              "You can access all features , Thankyou for choosing us"
          },{
            title: "Community Building",
            description:
              "Join a vibrant community of like-minded individuals and grow together."
          },
          {
            title: "Networking Opportunities",
            description:
              "Connect with professionals and expand your network in various fields."
          },
        ].map((feature, index) => (
          <Card
            key={index}
            className="p-6 rounded-lg shadow-2xl bg-blue-950 bg-opacity-30 cursor-pointer"
          >
            <h3 className="text-2xl font-semibold text-black">
              {feature.title}
            </h3>
            <p className="mt-3 text-gray-800">{feature.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Hero;
