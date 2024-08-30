
import React from 'react';
import './post.css';

const MediaDisplay = ({ media }) => {
  if (!media || media.length === 0) {
    return null;
  }

  return (
    <div className="media-display">
      {media.map((item, index) => (
        <div key={index} className="media-item">
          {item.type === 'image' ? (
            <img src={item.url} alt={`media-${index}`} className="post-media" />
          ) : (
            <video controls className="post-media">
              <source src={item.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      ))}
    </div>
  );
};

export default MediaDisplay;
