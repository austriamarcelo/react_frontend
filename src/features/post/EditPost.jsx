import React, {useEffect, useState} from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../contants";

function EditPost() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();

    
    useEffect(() => {
        const fetchCurrentPost = async () => {
            try {
                const response = await axios.get(`${ API_URL }/${id}`);
                setPost(response.data);
                setLoading(false);

            } catch (error) {
                console.error("Error fetching post:", error);
            }
        }
        fetchCurrentPost();

    }, [id]);



    // create handleSubmit
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`${API_URL}/${id}`, post)
            .then(response => navigate(`/posts/${response.data.id}`))
            .catch(error => console.error("Error updating post:", error));
    }   

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h1>Edit Post</h1>
            <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        value={post.title}
                        onChange={(e) => setPost({ ...post, title: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="body" className="form-label">Body</label>
                    <textarea   
                        className="form-control"
                        id="body"
                        value={post.body}
                        onChange={(e) => setPost({ ...post, body: e.target.value })}
                        required
                    /> 
                </div>
                <div>
                    <button type="submit" className="btn btn-primary">Save</button>
                </div>
            </form>
        </div>
    )
}   

export default EditPost