import React from 'react';
import {Routes, Route} from "react-router-dom";
import {SingIn} from "./pages/Auth/SignIn";
import {SingUp} from "./pages/Auth/SignUp";
import {Forum} from "./pages/Forum";
import {Layout} from "./hooks/Layout";
import {FullPost} from "./components/FullPost/FullPost";
import {Error404} from "./components/Error404/Error404";
import {AddNewPost} from "./pages/AddNewPost";
import {Profile} from "./pages/Profile";
import {EditPost} from "./pages/EditPost";
import {Comments} from "./pages/Comments";


function App() {
    return (
        <Routes>
            <Route path="login" element={<SingIn/>}/>
            <Route path="registration" element={<SingUp/>}/>
            <Route path='*' element={<Error404/>}/>
            <Route path="/" element={<Layout/>}>
                <Route index element={<Forum/>}/>
                <Route path="post/:id" element={<FullPost/>}/>
                <Route path="post/:id/comments" element={<Comments/>}/>
                <Route path="post/:id/edit" element={<EditPost/>}/>
                <Route path="addPost" element={<AddNewPost/>}/>
                <Route path="profile/:user" element={<Profile/>}/>
            </Route>
        </Routes>
    );
}

export default App;
