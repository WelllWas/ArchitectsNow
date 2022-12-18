import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login  from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import Requests from "../pages/Requests/Requests";
import useAuth from "../Authorization/UseAuth";
import React from 'react';

const Private = ({ Item }) =>{
    const {signed} = useAuth();
    return signed > 0 ? <Item /> : <Login />
}

const Router = () => {
    return(
        <BrowserRouter>
            <Fragment>
                <Routes>
                    <Route exact path="/" element={<Private Item={Home}/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/requests" element={<Private Item={Requests}/>}/>
                    <Route path="*" element={<Private Item={Home}/>} />
                </Routes>
            </Fragment>
        </BrowserRouter>
    )
}

export default Router;