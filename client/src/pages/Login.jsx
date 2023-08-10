import React from "react";
import AuthNav from "../components/AuthNav";
import "./style.css";
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <>
            <AuthNav />
            <div className="auth">
                <div className="auth-left-login"></div>
                <div className="auth-right">
                    <h2>Login In</h2>
                    <form>
                        <label htmlFor="email">Email Address</label>
                        <input type="email" name="" id="" />
                        <label htmlFor="password">Password</label>
                        <input type="password" name="" id="" />
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
