import axios from "axios";
import { useEffect } from "react";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:7000/api";


// ➤ Add Post
export const AddPostApi = async (userId: string, formData: any) => {
  try {
    console.log(formData)
    const response = await axios.post(`${API_BASE_URL}/api/posts/${userId}/add-post`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    toast.success("Post added successfully!");
    return response.data;
  } catch (error: any) {
    console.error("Error adding post:", error);
    toast.error(error.response?.data?.message || "Failed to add post.");
  }
};

// ➤ Get Single Post
export const GetPostApi = async (userId: string, postId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/posts/${userId}/${postId}`);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching post:", error);
    toast.error(error.response?.data?.message || "Failed to fetch post.");
  }
};



// ➤ Get All Posts
export const SetAllPostApi = async (userId: string) => {
  try {
    console.log("user id at api", userId)
    const response = await axios.get(`${API_BASE_URL}/api/posts/${userId}/all-posts`);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching posts:", error);
    toast.error(error.response?.data?.message || "Failed to fetch posts.");
  }
};

// ➤ Update Post
export const UpdatePostApi = async (userId: string, postId: string, formData: any) => {
  try {
    console.log(postId)
    const response = await axios.put(`${API_BASE_URL}/api/posts/${userId}/${postId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    toast.success("Post updated successfully!");
    return response.data;
  } catch (error: any) {
    console.error("Error updating post:", error);
    
  }
};

// ➤ Delete Post
export const DeletePostApi = async (userId: string, postId: string) => {
  try {
    await axios.delete(`${API_BASE_URL}/api/posts/${userId}/${postId}`);
    toast.success("Post deleted successfully!");
  } catch (error: any) {
    console.error("Error deleting post:", error);
    toast.error(error.response?.data?.message || "Failed to delete post.");
  }
};
