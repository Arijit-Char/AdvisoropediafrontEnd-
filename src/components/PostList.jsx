import React from "react";
import "./Postlist.scss"
const PostList = ({ posts }) => {
  return (
  
    <div className="parentpost">
      {posts.map((post) => (
        <div key={post._id} className="post">
          <h2>{post.title}</h2>
          
          <p>{new Date(post.createdAt).toLocaleString()}</p>
          <p className="content">{post.content}</p>
        </div>
      ))}
  
    </div>
  );
};

export default PostList;
