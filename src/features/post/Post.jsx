import { useState, useEffect } from "react";
import { API_URL } from "../../contants";
import axios from "axios";

export default function Post() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [editPost, setEditPost] = useState(null);

  // Fetch posts from Rails API
  useEffect(() => {
    axios.get(API_URL)
      .then(response => setPosts(response.data))
      .catch(error => console.error("Error fetching posts:", error));
  }, []);

  // Handle Create & Update Post
  const handleSave = () => {
    if (editPost) {
      axios.put(`${API_URL}/${editPost.id}`, { title, body })
        .then(response => {
          setPosts(posts.map(p => (p.id === editPost.id ? response.data : p)));
          setEditPost(null);
        })
        .catch(error => console.error("Error updating post:", error));
    } else {
      axios.post(API_URL, { title, body })
        .then(response => setPosts([...posts, response.data]))
        .catch(error => console.error("Error creating post:", error));
    }
    setTitle("");
    setBody("");
  };

  // Handle Edit Post
  const handleEdit = (post) => {
    setEditPost(post);
    setTitle(post.title);
    setBody(post.body);
  };

  // Handle Delete Post
  const handleDelete = (id) => {
    axios.delete(`${API_URL}/${id}`)
      .then(() => setPosts(posts.filter(post => post.id !== id)))
      .catch(error => console.error("Error deleting post:", error));
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-primary">Post Manager</h2>

      {/* Post Form */}
      <div className="card p-4 mb-4">
        <h4>{editPost ? "Edit Post" : "Create Post"}</h4>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="form-control mb-2"
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <button className="btn btn-success me-2" onClick={handleSave}>
          {editPost ? "Update" : "Create"}
        </button>
        {editPost && (
          <button className="btn btn-secondary" onClick={() => setEditPost(null)}>Cancel</button>
        )}
      </div>

      {/* Post Listing */}
      {posts.length === 0 ? (
        <p className="text-muted">No posts available.</p>
      ) : (
        <ul className="list-group">
          {posts.map(post => (
            <li key={post.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <h5 className="mb-1">{post.title}</h5>
                <p className="mb-0">{post.body}</p>
              </div>
              <div>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(post)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(post.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
