import { useEffect, useState } from "react";
import { Settings, Upload } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner"; // Assuming you use a toast system
import { Card, CardContent } from "@/components/ui/card";
import { updateProfile } from "@/api/user.api";
import { useNavigate } from "react-router-dom";

export function UserProfile() {
  const [user, setUser] = useState<{ name: string; userName: string; userProfile: string; followers: any[]; createdAt: Date } | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

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
    formData.append("userName", user.userName); // Pass user data if required
  
    try {
      const response = await updateProfile(formData);
  
      if (!response.success) throw new Error(response.message);
  
      // Update user profile in local storage and state
      const updatedUser = { ...user, userProfile: response.userProfile };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
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
          <AvatarImage src={user.userProfile || "https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-173524.jpg?t=st=1739522130~exp=1739525730~hmac=b554c4e49fe8635661b15a734e406c8e48f9089321156a703ab4f47d7c3f88cb&w=740"} alt="User avatar" />
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
          <p className="text-lg font-semibold">1.2K</p>
          <p className="text-gray-500 text-sm">Followers</p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Settings className="w-5 h-5" /> Settings
        </Button>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200" />

      {/* Created At */}
      <h3 className="text-lg font-semibold">Created At</h3>
      <p className="text-gray-500">14/02/2025</p>
    </div>
  );
}
