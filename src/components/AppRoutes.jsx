import React from "react"
import { Route, Routes } from "react-router-dom"
import PostList from "../features/post/PostList"
import PostDetail from "../features/post/PostDetail"
import NewPost from "../features/post/NewPost"
import EditPost from "../features/post/EditPost"
function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={ <PostList /> } />
            <Route path="/posts/:id" element={ <PostDetail /> } />
            <Route path="/posts/:id/edit" element={ <EditPost /> } />
            <Route path="/posts/new" element={ <NewPost /> } />
        </Routes>
    )
}

export default AppRoutes