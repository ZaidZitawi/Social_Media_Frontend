import React, { useState } from 'react';
import { FaImage, FaVideo } from 'react-icons/fa';
import './PostCreator.css'; // Ensure this CSS file exists
import user from '../../images/image.png'; 

const PostCreator = () => {
  const [postContent, setPostContent] = useState('');
  const [media, setMedia] = useState(null);
  const [mediaPreview, setMediaPreview] = useState('');

  const handlePostSubmit = (e) => {
    e.preventDefault();
    // Logic to handle post creation
    console.log("Post submitted:", postContent, media);
    setPostContent('');
    setMedia(null);
    setMediaPreview('');
  };

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setMedia(file);
      setMediaPreview(fileUrl);
    }
  };

  return (
    <div className="post-creator">
      <div className="post-creator-header">
        <img
          src={user}
          alt="User profile"
          className="post-creator-profile-image"
        />
      </div>
      <form onSubmit={handlePostSubmit} className="post-creator-form">
        <textarea
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          placeholder="What's on your mind?"
          rows="4"
          className="post-creator-textarea"
        />
        {mediaPreview && (
          <div className="post-creator-media-preview">
            {media.type.startsWith('image/') ? (
              <img src={mediaPreview} alt="Media preview" className="post-creator-media-image" />
            ) : (
              <video src={mediaPreview} controls className="post-creator-media-video" />
            )}
          </div>
        )}
        <div className="post-creator-buttons">
          <label htmlFor="media-upload" className="post-creator-upload-button">
            <FaImage /> Photo/Video
            <input
              type="file"
              id="media-upload"
              accept="image/*,video/*"
              onChange={handleMediaChange}
              style={{ display: 'none' }}
            />
          </label>
          <button type="submit" className="post-creator-submit-button">Post</button>
        </div>
      </form>
    </div>
  );
};

export default PostCreator;
