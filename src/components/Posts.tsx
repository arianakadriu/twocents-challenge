'use client';
import React, { useEffect, useRef, useState } from "react";
import Post from "./Post";
import { fetchTopPosts } from "@/services/posts";
import { IPost } from "@/interfaces/post";
import { EPostFilter } from "@/enums/EPostFilter";

interface PostsProps {
  filter: EPostFilter;
}

const Posts = ({ filter }: PostsProps) => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
  async function loadPosts() {
    setLoading(true);
    setError(null);
    try {
      const posts = await fetchTopPosts(filter);
      setPosts(posts);

      setTimeout(() => {
        if (containerRef.current) {
          const isMobile = window.innerWidth < 768;
          const yOffset = isMobile ? -200 : -150;
          const y =
            containerRef.current.getBoundingClientRect().top +
            window.pageYOffset +
            yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 100);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }

  loadPosts();
}, [filter]);


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <p className="text-amber-500/80 text-xl">Loading posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <p className="text-amber-500/80 text-xl">Error: {error}</p>
      </div>
    );
  }

  if (!posts.length) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <p className="text-amber-500/80 text-xl">No posts found.</p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="text-amber-500/80 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <Post key={post.uuid} data={post} />
      ))}
    </div>
  );
};

export default Posts;
