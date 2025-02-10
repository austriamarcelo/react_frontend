import React from "react"
import { Route, Routes } from "react-router-dom"
import PostList from "../features/post/PostList"
import PostDetail from "../features/post/PostDetail"
function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={ <PostList /> } />
            <Route path="/posts/:id" element={ <PostDetail /> } />
            <Route path="/posts/new" element={ <h1>new post</h1> } />
        </Routes>
    )
}

export default AppRoutes