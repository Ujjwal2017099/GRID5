import React from 'react'
import AuthNav from '../components/AuthNav'
import './style.css'
import { Link } from 'react-router-dom'

const Signin = () => {
  return (
      <>
          <AuthNav />
          <div className="auth">
              <div className="auth-left-sign"></div>
              <div className="auth-right">
                  <h2>Sign Up</h2>
                  <form>
                      <label htmlFor="name">Name</label>
                      <input type="text" name="" id="" required/>
                      <label htmlFor="email">Email Address</label>
                      <input type="email" name="" id="" required/>
                      <label htmlFor="email">Phone Number</label>
                      <input type="tel" name="" id="" pattern="^(?:(?:\+|0{0,2})91(\s*[-]\s*)?|[0]?)?[789]\d{9}$" required/>
                      <label htmlFor="password">Password</label>
                      <input type="password" name="" id="" required/>
                      <div style={{display:'flex',justifyContent:'flex-start',alignItems:'center',fontSize:'12px'}} >
                            <input style={{width:'12px'}} type="checkbox" name="" id="" required/> 
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