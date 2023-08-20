import React, { useState } from 'react'
import AuthNav from '../components/AuthNav'
import './style.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { URL } from '../URL'

const Signin = () => {
    const [name,setName] = useState();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [phone,setPhone] = useState();
    const navigate = useNavigate();
    const signup = (event)=>{
        event.preventDefault();
        const url = `${URL}/signup`
        const data = JSON.stringify({
            name,email,password,mobile:phone
        })
        const options = {
            method : "POST",
            url,
            headers : {"content-type" : "application/json"},
            data
        }
        axios(options)
        .then((res)=>{
            // console.log(res.data);
            navigate('/auth/login');
        }).catch((err)=>{
            console.log(err.message);
        })
    }
  return (
      <>
          <AuthNav />
          <div className="auth">
              <div className="auth-left-sign"></div>
              <div className="auth-right">
                  <h2>Sign Up</h2>
                  <form onSubmit={signup}>
                      <label htmlFor="name">Name</label>
                      <input onChange={(e)=>{setName(e.target.value)}} type="text" name=""  required/>
                      <label htmlFor="email">Email Address</label>
                      <input onChange={(e)=>{setEmail(e.target.value)}} type="email" name=""  required/>
                      <label htmlFor="phone">Phone Number</label>
                      <input onChange={(e)=>{setPhone(e.target.value)}} type="tel" name=""  pattern="^(?:(?:\+|0{0,2})91(\s*[-]\s*)?|[0]?)?[789]\d{9}$" required/>
                      <label htmlFor="password">Password</label>
                      <input onChange={(e)=>{setPassword(e.target.value)}} type="password" name=""  required/>
                      <div style={{display:'flex',justifyContent:'flex-start',alignItems:'center',fontSize:'12px'}} >
                            <input style={{width:'12px'}} type="checkbox" name=""  required/> 
                            Agree to our terms and conditions 
                      </div>
                      <button className='btn' type="submit">Submit</button>

                  </form>
                  <p>
                    Already have an account <Link to='/auth/login'>click here</Link>
                  </p>
              </div>
          </div>
      </>
  );
}

export default Signin