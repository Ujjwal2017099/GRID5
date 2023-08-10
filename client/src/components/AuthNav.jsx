import React from 'react'
import logo from '../assets/logo.svg'
import './style.css'
import { useNavigate } from 'react-router-dom'

const AuthNav = () => {
    const style = {
        display : 'flex' ,
        justifyContent:'space-between',
        padding:'7px',
        boxSizing:'border-box'
    }
    const navigate = useNavigate();
  return (
    <div style={style}>
        <div style={{width:"50%"}}>
            <img style={{height:'35px'}} src={logo} alt="" srcset="" />
        </div>
        <div style={{width:"20%",display:'flex',justifyContent:'space-evenly'}}>
            <button onClick={()=>{navigate('/auth/login');}} className='btn'>Login</button>
            <button onClick={()=>{navigate('/auth/signup');}} className='btn2'>SignUp</button>
        </div>
    </div>
  )
}

export default AuthNav