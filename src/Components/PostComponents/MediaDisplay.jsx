import React from 'react';
import './post.css';

const MediaDisplay = ({ media }) => {
  if (!media || media.length === 0) {
    return null;
  }

  return (
    <div className="media-display">
      {media.map((item, index) => {
        const lowerCaseUrl = item.mediaUrl.toLowerCase(); // Convert to lowercase

        return (
          <div key={index} className="media-item">
            {lowerCaseUrl.endsWith('.jpg') || lowerCaseUrl.endsWith('.png') || lowerCaseUrl.endsWith('.jpeg') ? (
              <img
                src={`/uploads/${item.mediaUrl}`}
                alt={`media-${index}`}
                className="post-media"
              />
            ) : lowerCaseUrl.endsWith('.mp4') ? (
              <video controls className="post-media">
                <source src={`/uploads/${item.mediaUrl}`} type="video/mp4" /> 
                Your browser does not support the video tag.
              </video>
            ) : (
              <p>Unsupported media type</p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MediaDisplay;
