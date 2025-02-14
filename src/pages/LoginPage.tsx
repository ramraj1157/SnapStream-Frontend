import { loginUser } from "@/api/user.api";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    userName: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: value.trim() ? "" : `${name} is required` }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.userName || !formData.password) {
      setErrors({
        userName: formData.userName ? "" : "Username is required",
        password: formData.password ? "" : "Password is required",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await loginUser(formData);
      if (response.success) {
        toast.success(`Welcome back, ${response.user.name}!`);
        navigate("/");
      } else {
        toast.error(response.message);
      }
    } catch (error: any) {
      toast.error("Failed to log in.");
    } finally {
      setLoading(false);
    }

   
        const [redirect, setRedirect] = useState(false);
      useEffect(() => {
        const user = localStorage.getItem('user');
        if (user ) {
          setRedirect(true);
        }
      }, []);
    
      if (redirect) {
        navigate("/");
      }
  };

  return (
    <div className="flex items-center justify-center">
      <Card className="w-full max-w-lg shadow-xl rounded-xl bg-gray-50 p-6">
        <CardHeader className="text-center mb-4">
          <h1 className="text-2xl font-bold text-black">SnapStream</h1>
          <p className="text-sm text-gray-600">Connect, Share, and Grow Together</p>
        </CardHeader>
        <CardDescription>
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label htmlFor="userName" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <Input
                type="text"
                id="userName"
                name="userName"
                placeholder="Enter your username"
                value={formData.userName}
                onChange={handleChange}
                disabled={loading}
                className="mt-1 w-full border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-lg"
                required
              />
              {errors.userName && <p className="text-red-500 text-xs mt-1">{errors.userName}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <Input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
                className="mt-1 w-full border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-lg"
                required
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <Button
              type="submit"
              disabled={loading}
              className={`w-full text-white hover:bg-gray-600 focus:ring-2 focus:ring-gray-500 py-2 px-4 rounded-lg ${
                loading ? "bg-gray-300 cursor-not-allowed" : "bg-black"
              }`}
            >
              {loading ? "Please wait..." : "Sign In"}
            </Button>
          </form>
        </CardDescription>

        {/* Sign Up & Forgot Password Links */}
        <CardFooter className="flex flex-col items-center text-sm text-gray-600 mt-4">
          <p>
            Don’t have an account?{" "}
            <Link to={"/signup"} className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
          <p className="mt-2">
            <Link to={"/reset-password"} className="text-blue-600 hover:underline">
              Forgot password?
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
