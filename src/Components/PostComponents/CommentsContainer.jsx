import React from 'react';
import './post.css';
import Comment from './Comment';

const CommentsContainer = () => {
  const comments = [
    { id: 1, userImage: '/path/to/user1.jpg', userName: 'John Doe', commentTime: '2h ago', text: 'Great post!' },
    { id: 2, userImage: '/path/to/user2.jpg', userName: 'Jane Smith', commentTime: '3h ago', text: 'Nice picture!' }
  ];

  return (
    <div className="comments-container">
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          userImage={comment.userImage}
          userName={comment.userName}
          commentTime={comment.commentTime}
          text={comment.text}
        />
      ))}
    </div>
  );
};

export default CommentsContainer;
