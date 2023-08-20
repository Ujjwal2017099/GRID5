import React, { useState } from "react";
import AuthNav from "../components/AuthNav";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import {URL} from '../URL'

const Login = () => {
    const [email,setEmail] = useState()
    const [password,setPassword] = useState()
    const navigate = useNavigate();

    const login = (event)=>{
        event.preventDefault();
        const url  = `${URL}/login?email=${email}&password=${password}`
        const options = {
            url,
            headers : {"content-type": "application/json"},
            method : "GET"
        }

        axios(options)
        .then((res)=>{
            // alert('ok');
            localStorage.setItem('id',JSON.stringify(res.data))
            // console.log(res.data);
            navigate('/');
        }).catch((err)=>{
            // alert('err');
            console.log(err.message);
        })
    }
    return (
        <>
            <AuthNav />
            <div className="auth">
                <div className="auth-left-login"></div>
                <div className="auth-right">
                    <h2>Login In</h2>
                    <form onSubmit={login}>
                        <label htmlFor="email">Email Address</label>
                        <input onChange={(e)=>{setEmail(e.target.value)}} type="email" name="" required/>
                        <label htmlFor="password">Password</label>
                        <input onChange={(e)=>{setPassword(e.target.value)}} type="password" name=""  required/>
                        <button className="btn" type="submit">
                            Submit
                        </button>
                    </form>
                    <p>
                        Don't have an account{" "}
                        <Link to="/auth/signup">click here</Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Login;