import fb from "../icons/facebook.svg";
import tw from "../icons/icons8-twitter-logo.svg";
import li from "../icons/icons8-linkedin.svg";
function Footer() {
  return (
    <div className="bg-gradient-to-r border-t-2 border-t-gray-800 bg-white py-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
 
        <span className="text-3xl text-black font-bold tracking-tight">
          SnapStream
        </span>


        <div className="text-black font-bold tracking-tight flex gap-6 flex-wrap justify-center">
          <span className="hover:cursor-pointer hover:text-gray-800">
            Privacy Policy
          </span>
          <span className="text-black hover:cursor-pointer hover:text-gray-800">
            Terms of Service
          </span>
          <span className="text-black hover:cursor-pointer hover:text-gray-800">
            FAQs
          </span>
          <span className="text-black hover:cursor-pointer hover:text-gray-800">
            Contact Us
          </span>
        </div>


        <div className="flex gap-4 mt-6 md:mt-0">
          <a href="#" aria-label="Facebook">
            <img
              src={fb}
              alt="Facebook"
              className="h-6 w-6 hover:opacity-80"
            />
          </a>
          <a href="#" aria-label="Twitter">
            <img
              src={tw}
              alt="Twitter"
              className="h-6 w-6 hover:opacity-80"
            />
          </a>
          <a href="#" aria-label="LinkedIn">
            <img
              src={li}
              alt="LinkedIn"
              className="h-6 w-6 hover:opacity-80"
            />
          </a>
        </div>
      </div>


      <div className=" text-black text-center mt-8 text-sm">
        © {new Date().getFullYear()} SnapStream. All rights reserved.
      </div>
    </div>
  );
}

export default Footer;