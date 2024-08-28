import React, { useState } from 'react';
import axios from 'axios';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Videocam from '@mui/icons-material/Videocam';
import CloseIcon from '@mui/icons-material/Close';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import CommentIcon from '@mui/icons-material/Comment';
import DeleteIcon from '@mui/icons-material/Delete'; // Import trash can icon
import EditIcon from '@mui/icons-material/Edit'; // Import pen icon
import '../Styles/AddPost.css';

const PostForm = () => {
    const [content, setContent] = useState('');
    const [media, setMedia] = useState([]);
    const [mediaPreview, setMediaPreview] = useState([]);
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const [commentContent, setCommentContent] = useState('');
    const [visibleComments, setVisibleComments] = useState(null); // State to track visible comments
    const [editingPostId, setEditingPostId] = useState(null);
    const [editContent, setEditContent] = useState('');
    const [editMedia, setEditMedia] = useState([]);
    const [editMediaPreview, setEditMediaPreview] = useState([]);

    const startEditingPost = (postId, index) => {
        setEditingPostId(postId);
        setEditContent(posts[index].text);
        setEditMedia(posts[index].media || []);
        setEditMediaPreview(posts[index].media || []);
    };



    const handleMediaChange = (e) => {
        const files = Array.from(e.target.files);
        setMedia((prevMedia) => [...prevMedia, ...files]);

        const previews = files.map(file => URL.createObjectURL(file));
        setMediaPreview((prevPreviews) => [...prevPreviews, ...previews]);
    };

    const handleRemoveMedia = (index) => {
        setEditMedia((prevMedia) => prevMedia.filter((_, i) => i !== index));
        setEditMediaPreview((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!content.trim() && media.length === 0) {
            setError("Post content or media is required");
            return;
        }

        const formData = new FormData();
        formData.append('content', content);
        media.forEach((file) => {
            formData.append('files', file);
        });

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:8080/v0/post/AddPost', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response);
            const newPost = {
                ...response.data,
                user: response.data.userEntity,
                media: mediaPreview,
                timestamp: new Date().toLocaleTimeString(),
                likes: 0,
                isLiked: false, // Initial like status
                comments: [],
            };
            setPosts([newPost, ...posts]);

            setContent('');
            setMedia([]);
            setMediaPreview([]);
            setError(null);
        } catch (error) {
            console.error('Error posting:', error);
            setError('Failed to create post. Please try again.');
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();

        if (!editContent.trim() && editMedia.length === 0) {
            setError("Post content or media is required");
            return;
        }

        const formData = new FormData();
        formData.append('content', editContent);
        editMedia.forEach((file) => {
            formData.append('files', file);
        });

        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:8080/v0/post/update/${editingPostId}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            setPosts(prevPosts => prevPosts.map(post =>
                post.postId === editingPostId
                    ? { ...post, text: editContent, media: editMediaPreview }
                    : post
            ));

            setEditingPostId(null);
            setEditContent('');
            setEditMedia([]);
            setEditMediaPreview([]);
            setError(null);
        } catch (error) {
            console.error('Error updating post:', error);
            setError('Failed to update post. Please try again.');
        }
    };



    const handleDeletePost = async (postId, index) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:8080/v0/post/delete/${postId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            setPosts(prevPosts => prevPosts.filter((_, i) => i !== index));
        } catch (error) {
            console.error('Error deleting post:', error);
            setError('Failed to delete post. Please try again.');
        }
    };


    const toggleLikePost = async (postId, index, isLiked) => {
        try {
            const token = localStorage.getItem('token');

            if (isLiked) {
                await axios.delete(`http://localhost:8080/api/unlikePosts/${postId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                setPosts(prevPosts => {
                    const updatedPosts = prevPosts.map((post, i) => {
                        if (i === index) {
                            return {
                                ...post,
                                likes: post.likes - 1, // Decrement the like count
                                isLiked: false, // Update the like status
                            };
                        }
                        return post;
                    });
                    return updatedPosts;
                });
            } else {
                await axios.post(`http://localhost:8080/api/likePosts/${postId}`, null, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                setPosts(prevPosts => {
                    const updatedPosts = prevPosts.map((post, i) => {
                        if (i === index) {
                            return {
                                ...post,
                                likes: post.likes + 1, // Increment the like count
                                isLiked: true, // Update the like status
                            };
                        }
                        return post;
                    });
                    return updatedPosts;
                });
            }
        } catch (error) {
            console.error('Error toggling like:', error);
            setError('Failed to toggle the like. Please try again.');
        }
    };

    const handleCommentChange = (e) => {
        setCommentContent(e.target.value);
    };

    const handleCommentSubmit = async (e, postId, index) => {
        e.preventDefault();

        if (!commentContent.trim()) {
            setError("Comment content is required");
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`http://localhost:8080/v0/comments/add`, {
                text: commentContent,  // Use 'text' to match the backend field
                post: postId,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });




            const newComment = response.data;
            setPosts(prevPosts => {
                return prevPosts.map((post, i) => {
                    if (i === index) {
                        return {
                            ...post,
                            comments: [...post.comments, newComment],
                        };
                    }
                    return post;
                });
            });

            setCommentContent('');
            setError(null);
        } catch (error) {
            console.error('Error adding comment:', error.response ? error.response.data : error.message);
            setError('Failed to add comment. Please try again.');
        }
    };

    const toggleCommentsVisibility = (postId) => {
        setVisibleComments((prevId) => (prevId === postId ? null : postId));
    };

    const toggleLikeComment = async (commentId, postIndex, commentIndex, isLiked) => {
        console.log('commentId:', commentId);  // Log commentId to ensure it's not undefined
        console.log('postIndex:', postIndex, 'commentIndex:', commentIndex);

        try {
            const token = localStorage.getItem('token');

            if (isLiked) {
                await axios.delete(`http://localhost:8080/api/unlikeComment/${commentId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                setPosts(prevPosts => {
                    const updatedPosts = prevPosts.map((post, i) => {
                        if (i === postIndex) {
                            const updatedComments = post.comments.map((comment, j) => {
                                if (j === commentIndex) {
                                    return {
                                        ...comment,
                                        likes: comment.likes - 1,
                                        isLiked: false,
                                    };
                                }
                                return comment;
                            });
                            return {
                                ...post,
                                comments: updatedComments,
                            };
                        }
                        return post;
                    });
                    return updatedPosts;
                });
            } else {
                await axios.post(`http://localhost:8080/api/LikeComment/${commentId}`, null, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                setPosts(prevPosts => {
                    const updatedPosts = prevPosts.map((post, i) => {
                        if (i === postIndex) {
                            const updatedComments = post.comments.map((comment, j) => {
                                if (j === commentIndex) {
                                    return {
                                        ...comment,
                                        likes: comment.likes + 1,
                                        isLiked: true,
                                    };
                                }
                                return comment;
                            });
                            return {
                                ...post,
                                comments: updatedComments,
                            };
                        }
                        return post;
                    });
                    return updatedPosts;
                });
            }
        } catch (error) {
            console.error('Error toggling like on comment:', error);
            setError('Failed to toggle the like. Please try again.');
        }
    };




    return (
        <div>
            <form className="Form" onSubmit={handleSubmit}>
                <div className="input-container">
                    <div className="user-image-container">
                        <img src="userPhoto.jpg" alt="User" className="user-image" />
                    </div>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="What’s on your mind?"
                        className="post-input"
                    />
                    <button type="submit" className="post-button">Post</button>
                </div>
                <div className="icons-container">
                    <label htmlFor="image-upload" className="icon-button">
                        <PhotoCamera fontSize="large" />
                        <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            className="hidden-input"
                            onChange={handleMediaChange}
                            multiple
                        />
                    </label>
                    <label htmlFor="video-upload" className="icon-button">
                        <Videocam fontSize="large" />
                        <input
                            id="video-upload"
                            type="file"
                            accept="video/*"
                            className="hidden-input"
                            onChange={handleMediaChange}
                            multiple
                        />
                    </label>
                </div>
                <div className="media-preview-container">
                    {mediaPreview.map((preview, index) => (
                        <div key={index} className="media-preview-item">
                            <img src={preview} alt={`preview-${index}`} className="media-preview" />
                            <button type="button" className="remove-button" onClick={() => handleRemoveMedia(index)}>
                                <CloseIcon />
                            </button>
                        </div>
                    ))}
                </div>
                {error && <div className="error-message">{error}</div>}
            </form>

            <div className="post-list">
                {posts.map((post, index) => (
                    <div key={index} className="post">
                        <div className="post-header">
                            <img src="userPhoto.jpg" alt="User" className="post-user-image" />
                            <div className="post-header-info">
                                <span className="post-user-name">{post.user}</span>
                                <span className="post-timestamp">{post.timestamp}</span>
                            </div>
                        </div>
                        {editingPostId === post.postId ? (
                            <form onSubmit={handleEditSubmit}>
                                <textarea
                                    value={editContent}
                                    onChange={(e) => setEditContent(e.target.value)}
                                    placeholder="Edit your post"
                                    className="post-input"
                                />
                                <div className="icons-container">
                                    <label htmlFor="image-upload-edit" className="icon-button">
                                        <PhotoCamera fontSize="large" />
                                        <input
                                            id="image-upload-edit"
                                            type="file"
                                            accept="image/*"
                                            className="hidden-input"
                                            onChange={(e) => handleMediaChange(e)}
                                            multiple
                                        />
                                    </label>
                                    <label htmlFor="video-upload-edit" className="icon-button">
                                        <Videocam fontSize="large" />
                                        <input
                                            id="video-upload-edit"
                                            type="file"
                                            accept="video/*"
                                            className="hidden-input"
                                            onChange={(e) => handleMediaChange(e)}
                                            multiple
                                        />
                                    </label>
                                </div>
                                <div className="media-preview-container">
                                    {editMediaPreview.map((preview, index) => (
                                        <div key={index} className="media-preview-item">
                                            <img src={preview} alt={`edit-preview-${index}`} className="media-preview" />
                                            <button type="button" className="remove-button" onClick={() => handleRemoveMedia(index)}>
                                                <CloseIcon />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <button type="submit" className="post-button">Save Changes</button>
                                <button
                                    type="button"
                                    className="post-button"
                                    onClick={() => {
                                        setEditingPostId(null);
                                        setEditContent('');
                                        setEditMedia([]);
                                        setEditMediaPreview([]);
                                    }}
                                >
                                    Cancel
                                </button>
                            </form>
                        ) : (
                            <>
                                <div className="post-content">{post.text}</div>
                                {post.media && (
                                    <img src={post.media} alt="Post Media" className="post-media" />
                                )}
                                <div className="post-actions">
                                    <button
                                        className="post-action-button"
                                        onClick={() => toggleLikePost(post.postId, index, post.isLiked)}
                                    >
                                        <ThumbUpAltIcon /> {post.likes} Likes
                                    </button>
                                    <button
                                        className="post-action-button"
                                        onClick={() => toggleCommentsVisibility(post.postId)}
                                    >
                                        <CommentIcon /> {post.comments.length} Comments
                                    </button>
                                    <button
                                        className="post-action-button"
                                        onClick={() => startEditingPost(post.postId, index)}
                                    >
                                        <EditIcon /> Edit
                                    </button>
                                    <button
                                        className="post-action-button"
                                        onClick={() => handleDeletePost(post.postId, index)}
                                    >
                                        <DeleteIcon /> Delete
                                    </button>
                                </div>
                            </>
                        )}

                        {visibleComments === post.postId && (
                            <>
                                <form onSubmit={(e) => handleCommentSubmit(e, post.postId, index)}>
                                    <textarea
                                        value={commentContent}
                                        onChange={handleCommentChange}
                                        placeholder="Write a comment..."
                                        className="comment-input"
                                    />
                                    <button type="submit" className="comment-button">Comment</button>
                                </form>
                                {posts.map((post, postIndex) => (
                                    <div key={postIndex} className="post">
                                        {/* Post content here */}

                                        <div className="comment-list">
                                            {post.comments.map((comment, commentIndex) => (
                                                <div key={commentIndex} className="comment">
                                                    <img src="userPhoto.jpg" alt="User" className="comment-user-image" />
                                                    <span className="comment-user">{comment.user}</span>: {comment.text}
                                                    <div className="comment-date">{new Date(comment.date).toLocaleString()}</div>
                                                    <button
                                                        className={`like-button ${comment.isLiked ? 'liked' : ''}`}
                                                        onClick={() => toggleLikeComment(comment.commentId, postIndex, commentIndex, comment.isLiked)}
                                                    >
                                                        <ThumbUpAltIcon /> {comment.likes}
                                                    </button>
                                                </div>
                                            ))}

                                        </div>
                                    </div>
                                ))}


                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
export default PostForm