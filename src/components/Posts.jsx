import React, { useEffect, useState } from "react";
import axios from "axios";
const Posts = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function getPosts() {
      let res = await axios.get("https://jsonplaceholder.typicode.com/posts");
      let posts = res.data;
      setPosts(posts);
    }
    getPosts();
  }, []);

  return (
    <>
      <div>
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id}>
              <h3>
                {post.id} {post.title}
              </h3>
            </div>
          ))
        ) : (
          <div>No post found</div>
        )}
      </div>
    </>
  );
};

export default Posts;
