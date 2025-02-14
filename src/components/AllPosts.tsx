import { useState, useEffect } from "react";
import { Heart, MessageCircle, Trash } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DialogDemo } from "./AddPost";
import { EditPost } from "./EditPost";
import {
  AddPostApi,
  SetAllPostApi,
  UpdatePostApi,
  DeletePostApi,
} from "../api/post.api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export function AllPosts() {
  const [posts, setPosts] = useState<any[]>([]);
  const [commentText, setCommentText] = useState<{ [key: string]: string }>({});
  const [user, setUser] = useState<{ _id: string; name: string; userName: string; userProfile: string; followers: any[]; createdAt: Date } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const userId = user?._id;

  useEffect(() => {
    if (!userId) return;

    const fetchPosts = async () => {
      const data = await SetAllPostApi(userId);
      if (data) setPosts(data.posts);
    };

    fetchPosts();
  }, [userId]);

  const addPost = async (formData: FormData) => {
    const newPost = await AddPostApi(userId || "", formData);
    if (newPost) setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  const deletePost = async (postId: string) => {
    try {
      await DeletePostApi(userId || "", postId);
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
      toast.success("Post deleted successfully.");
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Failed to delete post.");
    }
  };

  const handleLike = async (postId: string) => {
    try {
      const updatedPosts = posts.map((post) =>
        post._id === postId
          ? {
              ...post,
              likes: post.likes.includes(userId)
                ? post.likes.filter((id: string) => id !== userId)
                : [...post.likes, userId],
            }
          : post
      );
      setPosts(updatedPosts);
      await UpdatePostApi(userId || "", postId, new FormData());
    } catch (error) {
      console.error("Error liking post:", error);
      toast.error("Failed to like post.");
    }
  };

  const addComment = async (postId: string) => {
    if (!commentText[postId]) return;
    try {
      const newComment = { userId, comment: commentText[postId] };
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId ? { ...post, comments: [...post.comments, newComment] } : post
        )
      );
      await UpdatePostApi(userId || "", postId, new FormData());
      setCommentText({ ...commentText, [postId]: "" });
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Failed to add comment.");
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
    <div className="max-w-5xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl tracking-tighter font-semibold">All Posts</h2>
        <DialogDemo userId={userId || "67ae3fb4b8b6ee7d7a50e22d"} addPost={addPost} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {posts.map((post) => (
          <Card key={post._id} className="rounded-lg shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3 mb-3">
                <Avatar>
                  <AvatarImage src={user?.userProfile} />
                  <AvatarFallback></AvatarFallback>
                </Avatar>
                <h3 className="font-semibold">{post.name}</h3>
              </div>

              <img src={post.image} alt="Post" className="w-full rounded-lg object-cover" />

              <div className="flex flex-wrap mt-3 space-x-2 text-blue-600 text-sm">
                <p>#trending</p>
              </div>

              <div className="flex justify-between items-center mt-3">
                <div className="flex items-center space-x-3 text-gray-700">
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-1"
                    onClick={() => handleLike(post._id)}
                  >
                    <Heart
                      className={`w-5 h-5 ${post.likes.includes(userId) ? "text-red-500 fill-red-500" : "text-gray-500"}`}
                    />
                    <span>{post.likes.length}</span>
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <EditPost post={post} userId={userId} updatePost={UpdatePostApi} />
                  <Button size="icon" variant="ghost" onClick={() => deletePost(post._id)}>
                    <Trash className="w-5 h-5 text-red-500" />
                  </Button>
                </div>
              </div>

              <div className="mt-4">
                <Input
                  type="text"
                  placeholder="Add a comment..."
                  value={commentText[post._id] || ""}
                  onChange={(e) => setCommentText({ ...commentText, [post._id]: e.target.value })}
                />
                <Button className="mt-2" onClick={() => addComment(post._id)}>Comment</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
