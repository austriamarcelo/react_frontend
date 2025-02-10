import React, {useState} from "react"
import {useNavigate } from "react-router-dom"
import { API_URL } from "../../contants"
import axios from "axios"
function NewPost() {
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const navigate = useNavigate();

    // handleSubmit = () => {
    //     axios.post(API_URL, { title, body })
    //         .then(response => navigate(`/posts/${response.data.id}`))
    //         .catch(error => console.error("Error creating post:", error));
    // }
    const handleSubmit = (e) => {
        e.preventDefault();
            axios.post(API_URL, { title, body })
                .then(response => navigate(`/posts/${response.data.id}`))
                .catch(error => console.error("Error creating post:", error));  
    }
    return (
        <div className="container mt-4">
          <h1 className="mb-4">New Post</h1>
          <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="body" className="form-label">Body</label>
              <textarea
                className="form-control"
                id="body"
                rows="4"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Create Post</button>
          </form>
        </div>
      );
}
export default NewPost