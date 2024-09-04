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
          {item.mediaUrl.endsWith('.jpg') || item.mediaUrl.endsWith('.png') || item.mediaUrl.endsWith('.jpeg') ? (
            <img
              src={`/uploads/${item.mediaUrl}`} // Add the /uploads/ prefix
              alt={`media-${index}`}
              className="post-media"
            />
          ) : item.mediaUrl.endsWith('.mp4') ? (
            <video controls className="post-media">
              <source src={`/uploads/${item.mediaUrl}`} type="video/mp4" /> {/* Add the /uploads/ prefix */}
              Your browser does not support the video tag.
            </video>
          ) : (
            <p>Unsupported media type</p> // Handle unsupported media types
          )}
        </div>
      ))}
    </div>
  );
};

export default MediaDisplay;
