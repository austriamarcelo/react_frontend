import React, {useEffect, useState} from "react";     
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../contants";
function PostDetail() {
    const [post, setpost] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        const fetchCurrentPost = async () => {
            try {
                const response = await axios.get(`${ API_URL }/${id}`);
                setpost(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching post:", error);
            }
        }
        fetchCurrentPost();
    }, [id]);

    // if (!post) {
    //     return <div>Loading...</div>
    // }
    

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h1>{post.title}</h1>
            <div>{post.body}</div>
            <Link to="/">Back to Home</Link>
        </div>
    )
}

export default PostDetail