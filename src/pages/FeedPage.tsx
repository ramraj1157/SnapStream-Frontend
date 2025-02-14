import { useState } from "react";
import { Heart, MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const initialPosts = [
  {
    name: "John Doe",
    imgUrl: "https://picsum.photos/id/237/500/300",
    hashTags: ["#nature", "#photography", "#sunset"],
    likes: 120,
    liked: false,
    comments: [
      { user: "JaneSmith", comment: "This is amazing! 😍" },
      { user: "TravelLover", comment: "Where was this taken?" },
    ],
  },
  {
    name: "Alice Johnson",
    imgUrl: "https://picsum.photos/id/102/500/300",
    hashTags: ["#foodie", "#instafood", "#yum"],
    likes: 85,
    liked: false,
    comments: [
      { user: "FoodieFan", comment: "That looks delicious!" },
      { user: "ChefCarlos", comment: "Great presentation!" },
    ],
  },
  {
    name: "Michael Brown",
    imgUrl: "https://picsum.photos/id/103/500/300",
    hashTags: ["#adventure", "#travel", "#explore"],
    likes: 200,
    liked: false,
    comments: [
      { user: "Explorer", comment: "Stunning view!" },
      { user: "Globetrotter", comment: "Adding this to my bucket list!" },
    ],
  },
  {
    name: "Emily Clark",
    imgUrl: "https://picsum.photos/id/104/500/300",
    hashTags: ["#fashion", "#style", "#ootd"],
    likes: 95,
    liked: false,
    comments: [
      { user: "TrendyGirl", comment: "Loving this outfit!" },
      { user: "Fashionista", comment: "Where did you get this from?" },
    ],
  },
  {
    name: "John Doe",
    imgUrl: "https://picsum.photos/id/237/500/300",
    hashTags: ["#nature", "#photography", "#sunset"],
    likes: 120,
    liked: false,
    comments: [
      { user: "JaneSmith", comment: "This is amazing! 😍" },
      { user: "TravelLover", comment: "Where was this taken?" },
    ],
  },
  {
    name: "Alice Johnson",
    imgUrl: "https://picsum.photos/id/102/500/300",
    hashTags: ["#foodie", "#instafood", "#yum"],
    likes: 85,
    liked: false,
    comments: [
      { user: "FoodieFan", comment: "That looks delicious!" },
      { user: "ChefCarlos", comment: "Great presentation!" },
    ],
  },
  {
    name: "Michael Brown",
    imgUrl: "https://picsum.photos/id/103/500/300",
    hashTags: ["#adventure", "#travel", "#explore"],
    likes: 200,
    liked: false,
    comments: [
      { user: "Explorer", comment: "Stunning view!" },
      { user: "Globetrotter", comment: "Adding this to my bucket list!" },
    ],
  },
  {
    name: "Emily Clark",
    imgUrl: "https://picsum.photos/id/104/500/300",
    hashTags: ["#fashion", "#style", "#ootd"],
    likes: 95,
    liked: false,
    comments: [
      { user: "TrendyGirl", comment: "Loving this outfit!" },
      { user: "Fashionista", comment: "Where did you get this from?" },
    ],
  },
  {
    name: "John Doe",
    imgUrl: "https://picsum.photos/id/237/500/300",
    hashTags: ["#nature", "#photography", "#sunset"],
    likes: 120,
    liked: false,
    comments: [
      { user: "JaneSmith", comment: "This is amazing! 😍" },
      { user: "TravelLover", comment: "Where was this taken?" },
    ],
  },
  {
    name: "Alice Johnson",
    imgUrl: "https://picsum.photos/id/102/500/300",
    hashTags: ["#foodie", "#instafood", "#yum"],
    likes: 85,
    liked: false,
    comments: [
      { user: "FoodieFan", comment: "That looks delicious!" },
      { user: "ChefCarlos", comment: "Great presentation!" },
    ],
  },
  {
    name: "Michael Brown",
    imgUrl: "https://picsum.photos/id/103/500/300",
    hashTags: ["#adventure", "#travel", "#explore"],
    likes: 200,
    liked: false,
    comments: [
      { user: "Explorer", comment: "Stunning view!" },
      { user: "Globetrotter", comment: "Adding this to my bucket list!" },
    ],
  },
  {
    name: "Emily Clark",
    imgUrl: "https://picsum.photos/id/104/500/300",
    hashTags: ["#fashion", "#style", "#ootd"],
    likes: 95,
    liked: false,
    comments: [
      { user: "TrendyGirl", comment: "Loving this outfit!" },
      { user: "Fashionista", comment: "Where did you get this from?" },
    ],
  },
  {
    name: "John Doe",
    imgUrl: "https://picsum.photos/id/237/500/300",
    hashTags: ["#nature", "#photography", "#sunset"],
    likes: 120,
    liked: false,
    comments: [
      { user: "JaneSmith", comment: "This is amazing! 😍" },
      { user: "TravelLover", comment: "Where was this taken?" },
    ],
  },
  {
    name: "Alice Johnson",
    imgUrl: "https://picsum.photos/id/102/500/300",
    hashTags: ["#foodie", "#instafood", "#yum"],
    likes: 85,
    liked: false,
    comments: [
      { user: "FoodieFan", comment: "That looks delicious!" },
      { user: "ChefCarlos", comment: "Great presentation!" },
    ],
  },
  {
    name: "Michael Brown",
    imgUrl: "https://picsum.photos/id/103/500/300",
    hashTags: ["#adventure", "#travel", "#explore"],
    likes: 200,
    liked: false,
    comments: [
      { user: "Explorer", comment: "Stunning view!" },
      { user: "Globetrotter", comment: "Adding this to my bucket list!" },
    ],
  },
  {
    name: "Emily Clark",
    imgUrl: "https://picsum.photos/id/104/500/300",
    hashTags: ["#fashion", "#style", "#ootd"],
    likes: 95,
    liked: false,
    comments: [
      { user: "TrendyGirl", comment: "Loving this outfit!" },
      { user: "Fashionista", comment: "Where did you get this from?" },
    ],
  },
];

export function FeedPage() {
  const [posts, setPosts] = useState(initialPosts);

  const handleLike = (index: number) => {
    setPosts((prevPosts) =>
      prevPosts.map((post, i) =>
        i === index
          ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
          : post
      )
    );
  };

  const handleAddComment = (index: number, newComment: string) => {
    if (!newComment.trim()) return;
    setPosts((prevPosts) =>
      prevPosts.map((post, i) =>
        i === index
          ? { ...post, comments: [...post.comments, { user: "You", comment: newComment }] }
          : post
      )
    );
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-3xl tracking-tight mb-6">Your Intrests</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {posts.map((post, index) => {
          const [newComment, setNewComment] = useState("");

          return (
            <Card key={index} className="rounded-lg shadow-md">
              <CardContent className="p-4">
                {/* User Info */}
                <div className="flex items-center space-x-3 mb-3">
                  <Avatar>
                    <AvatarImage src={`https://i.pravatar.cc/40?img=${index}`} />
                    <AvatarFallback>{post.name[0]}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold">{post.name}</h3>
                </div>

                {/* Post Image */}
                <img src={post.imgUrl} alt="Post" className="w-full rounded-lg object-cover" />

                {/* Hashtags */}
                <div className="flex flex-wrap mt-3 space-x-2 text-blue-600 text-sm">
                  {post.hashTags.map((tag, i) => (
                    <span key={i}>{tag}</span>
                  ))}
                </div>

                {/* Like & Comment Section */}
                <div className="flex justify-between items-center mt-3">
                  <div className="flex items-center space-x-3 text-gray-700">
                    <Button
                      variant="ghost"
                      className="flex items-center space-x-1"
                      onClick={() => handleLike(index)}
                    >
                      <Heart className={`w-5 h-5 ${post.liked ? "text-red-500 fill-red-500" : "text-gray-500"}`} />
                      <span>{post.likes}</span>
                    </Button>
                    <Button variant="ghost" className="flex items-center space-x-1">
                      <MessageCircle className="w-5 h-5 text-gray-500" />
                      <span>{post.comments.length}</span>
                    </Button>
                  </div>
                </div>

                {/* Comments */}
                <div className="mt-3 space-y-2 text-sm text-gray-600">
                  {post.comments.slice(-2).map((comment, i) => (
                    <p key={i}>
                      <span className="font-semibold">{comment.user}</span>: {comment.comment}
                    </p>
                  ))}
                </div>

                {/* Add Comment Section */}
                <div className="mt-3 flex space-x-2">
                  <Input
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    onClick={() => {
                      handleAddComment(index, newComment);
                      setNewComment("");
                    }}
                  >
                    Post
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
