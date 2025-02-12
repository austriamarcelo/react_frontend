import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../contants";
import axios from "axios";

function PostList() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(API_URL);
                setPosts(response.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            setPosts(posts.filter(post => post.id !== id));
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };
    return (
        <div className="container mt-4">
        <h1 className="mb-4">Posts</h1>
        <ul className="list-unstyled">
            {posts.map((post) => (
            <li key={post.id} className="mb-3">
                <div className="card shadow-sm">
                <div className="card-body">
                    <h2 className="card-title fs-5">
                    <Link to={`/posts/${post.id}`} className="text-decoration-none text-primary">
                        {post.title}
                    </Link>
                    </h2>
                    <p className="card-text">{post.body}</p>
                    <div className="d-flex gap-2">
                    <Link to={`/posts/${post.id}/edit`} className="btn btn-primary">Edit</Link>
                    <button className="btn btn-danger" onClick={() => handleDelete(post.id)}>Delete</button>
                    </div>
                </div>
                </div>
            </li>
            ))}
        </ul>
        </div>
    );
}

export default PostList;    