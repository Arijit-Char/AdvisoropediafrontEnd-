import React, { useState, useEffect } from "react";
import axios from "axios";
import PostList from "../components/PostList";
import { useNavigate } from "react-router-dom";
const Body = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/posts?page=${page}&limit=1`
      );
      await new Promise((resolve) => setTimeout(resolve, 100));
      if (response.data.posts.length === 0) {
        setPage(1);
      }
      setPosts((prevPosts) => [...prevPosts, ...response.data.posts]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      setError("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight * 0.9 &&
      !loading &&
      hasMore
    ) {
      fetchPosts();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading, hasMore]);

  return (
    <>
      {localStorage.getItem("token") ? (
        <div className="container mx-auto mt-8">
          <h1 className="text-4xl font-bold mb-4">Posts</h1>
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          <PostList posts={posts} />
          {hasMore && <p>Loading more...</p>}
        </div>
      ) : (
        (() => navigate("/"), (<div>Login First</div>))
      )}
    </>
  );
};

export default Body;
