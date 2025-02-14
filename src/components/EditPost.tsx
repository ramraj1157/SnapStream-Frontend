import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UpdatePostApi } from "../api/post.api";
import { toast } from "sonner";

export function EditPost({ post, userId, updatePost }: any) {
  const [formData, setFormData] = useState({
    name: post.name,
    image: post.image,
    hashTags: post.hashTags,
  });
  const [open, setOpen] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const updatedData = new FormData();
    updatedData.append("name", formData.name);
    updatedData.append("hashTags", formData.hashTags);
    if (formData.image !== post.image) {
      updatedData.append("image", formData.image);
    }

    const jsonData = {
      name:formData.name,
      hashTags: formData.hashTags,
      file: formData.image,

    }
    try {
      const updatedPost = await UpdatePostApi(userId, post._id, jsonData);
      if (updatedPost) {
        updatePost(post._id, updatedPost);
        toast.success("Post updated successfully!");
        setOpen(false);
      }
    } catch (error) {
      toast.error("Failed to update post.");
      console.error("Update Error:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>
      <DialogContent className="p-6 space-y-4">
        <h2 className="text-xl font-semibold">Edit Post</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input name="name" value={formData.name} onChange={handleChange} placeholder="Post Name" />
          <Input type="file" onChange={handleFileChange} />
          <Input name="hashTags" value={formData.hashTags} onChange={handleChange} placeholder="Hashtags (comma separated)" />
          <Button type="submit" className="w-full">Save Changes</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
