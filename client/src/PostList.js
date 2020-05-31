// useEffect to make sure we only fetch posts one time
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

const PostList = () => {
  // initial object to match api
  const [posts, setPosts] = useState({});

  const fetchPost = async () => {
    const res = await axios.get('http://build4fun.club/posts');
    console.log('res', res);

    // axios will save response content in data
    setPosts(res.data);
  };

  // empty array tells it to only fetchPost when component first loaded
  useEffect(() => {
    fetchPost();
  }, []);

  const renderedPosts = Object.values(posts).map((post) => {
    return (
      <div
        className='card'
        style={{ width: '30%', marginBottom: '20px' }}
        key={post.id}
      >
        <div className='card-body'>
          <h3>{post.title}</h3>
          <CommentList comments={post.comments} />
          <CommentCreate postId={post.id} />
        </div>
      </div>
    );
  });

  return (
    <div className='d-flex flex-row flex-wrap justify-content-between'>
      {renderedPosts}
    </div>
  );
};

export default PostList;
