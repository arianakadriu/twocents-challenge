'use client'
import React, { useEffect, useState } from "react";
import Post from "./Post";
import { fetchTopPosts } from "@/services/posts";
import { IPost } from "@/interfaces/post";

const Posts = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPosts() {
      setLoading(true);
      setError(null);
      try {
        const posts = await fetchTopPosts();
        setPosts(posts);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <p className="text-amber-500/80 text-xl">Loading posts...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <p className="text-amber-500/80 text-xl">Error: {error}</p>
      </div>
    );

    if (!posts.length)
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <p className="text-amber-500/80 text-xl">No posts found.</p>
      </div>
    );

  return (
    <div className="text-amber-500/80 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <Post key={post.uuid} data={post} />
      ))}
    </div>
  );
};

export default Posts;
