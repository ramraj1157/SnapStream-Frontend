import { useEffect, useState } from "react";
import { Settings, Upload } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner"; 
import { getCurrentUser, updateProfile } from "@/api/user.api";
import { useNavigate } from "react-router-dom";

export function UserProfile() {
  const [user, setUser] = useState<{ _id: string; name: string; userName: string; userProfile: string; followers: any[]; createdAt: Date } | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // localStorage.clear()

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleImageUpload = async () => {
    if (!selectedFile || !user) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("userName", user.userName);

    try {
      const response = await updateProfile(formData);

      if (!response.success) throw new Error(response.message);

      // Fetch updated user data
      const newUser = await getCurrentUser(user._id);
      if (!newUser) {
        toast.error("Session expired. Please log in again.");
        localStorage.clear();
        navigate("/login"); // Redirect to login page
        return;
      }

      console.log("new user", newUser.user)

      // Update local state and storage
      localStorage.setItem("user", JSON.stringify(newUser.user));
      setUser(newUser.user);
      setSelectedFile(null);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-blue-50 rounded-xl shadow-lg space-y-6">
      {/* Profile Header */}
      <div className="flex flex-col items-center text-center">
        <Avatar className="w-24 h-24">
          <AvatarImage 
            src={user.userProfile || "https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-173524.jpg"} 
            alt="User avatar" 
          />
          <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <h2 className="mt-4 text-xl font-semibold">{user.name}</h2>
        <p className="text-gray-500">@{user.userName}</p>
      </div>

      {/* Image Upload */}
      <div className="flex flex-col items-center space-y-2">
        <Input type="file" accept="image/*" onChange={handleImageChange} />
        <Button 
          onClick={handleImageUpload} 
          disabled={!selectedFile || loading}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Upload className="w-5 h-5" /> {loading ? "Uploading..." : "Update Image"}
        </Button>
      </div>

      {/* Stats & Settings */}
      <div className="flex justify-between items-center w-full">
        <div className="text-center">
          <p className="text-lg font-semibold">{user.followers.length}</p>
          <p className="text-gray-500 text-sm">Followers</p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Settings className="w-5 h-5" /> Settings
        </Button>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200" />

      {/* Created At */}
      <h3 className="text-lg font-semibold">Joined</h3>
      <p className="text-gray-500">{new Date(user.createdAt).toLocaleDateString()}</p>
    </div>
  );
}
