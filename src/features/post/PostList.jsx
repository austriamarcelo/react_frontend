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

    return (
        <ul>
            {posts.map(post => (
                <div key={post.id} className="post-containers border m-2 rounded p-2 text-start">
                    <h2 className="post-title font-bold fs-5">
                        <Link to={`/posts/${post.id}`} className="text-decoration-none">{post.title}</Link>
                    </h2>
                    <div>{post.body}</div>
                </div>
            ))}
        </ul>
    );
}

export default PostList;    