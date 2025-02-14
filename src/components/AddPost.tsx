import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AddPostApi } from "@/api/post.api"; // Import API function
import { useNavigate } from "react-router-dom";


export function DialogDemo({ userId, addPost }: { userId: string; addPost: (newPost: any) => void }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [hashtags, setHashtags] = useState("");
  const [loading, setLoading] = useState(false);

  

  const handleSubmit = async () => {
    if (!name || !image || !hashtags) {
      alert("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("file", image);
    formData.append("hashtags", hashtags);

    const jsonData = {
        name: name,
        file: image,
        hashtags: hashtags
    }

    console.log(jsonData)

    setLoading(true);

    

    try {
        console.log(formData)
      const newPost = await AddPostApi(userId, jsonData); // Call API
      if (newPost) {
        addPost(newPost); // Update frontend state
      }
      setName("");
      setImage(null);
      setHashtags("");
    } catch (error) {
      console.error("Error adding post:", error);
    } finally {
      setLoading(false);
    }
    const navigate = useNavigate();
    const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user == null) {
      setRedirect(true);
    }
  }, []);

  if (redirect) {
    navigate("/");
  }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="bg-black text-white">Add Post</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Post</DialogTitle>
          <DialogDescription>Enter the fields to add a new post.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Name Field */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
          </div>

          {/* Image Upload Field */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-right">Image</Label>
            <Input id="image" type="file" accept="image/*" className="col-span-3" onChange={(e) => setImage(e.target.files?.[0] || null)} />
          </div>

          {/* Hashtags Field */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="hashtags" className="text-right">Hashtags</Label>
            <Input id="hashtags" value={hashtags} onChange={(e) => setHashtags(e.target.value)} className="col-span-3" placeholder="e.g., #nature, #travel" />
          </div>
        </div>

        <DialogFooter>
          <Button type="button" onClick={handleSubmit} disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
