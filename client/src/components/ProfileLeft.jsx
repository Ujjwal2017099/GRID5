import React from 'react'
import orders from "../assets/my-orders.svg";
import info from "../assets/my-info.svg";
import out from "../assets/sign-out.svg";
import { useNavigate } from 'react-router-dom';

const ProfileLeft = ({setToogle}) => {
  const change = (n)=>{
    setToogle(n);
  }

  const navigate = useNavigate()
  const signout = ()=>{
    localStorage.setItem('id',JSON.stringify([]));
    navigate('/auth/login')

  }
  return (
    <div className='profile-left'>
        <div style={{display : 'flex',alignItems:'center',gap : '5px'}}>
          <div style={{height : '25px' , width : '5px' , backgroundColor : '#8A33FD' , borderRadius : '2px'}}></div>
          <h3 style={{color : '#3C4242',fontFamily:'Noto Sans Vithkuqi'}} >Hello Name</h3>
        </div>
        <ul className='vertical-list'>
            <li onClick={()=>{change(1)}} style={{display:'flex',alignItems:'center',gap:'8px',color:'#807D7E',fontWeight:'700'}}> <img src={orders} alt="" /> <p style={{cursor:'pointer'}}>My orders</p> </li>
            <li onClick={()=>{change(0)}}  style={{display:'flex',alignItems:'center',gap:'8px',color:'#807D7E',fontWeight:'700'}}> <img src={info} alt="" /> <p style={{cursor:'pointer'}}>My info</p></li>
            <li onClick={signout} style={{display:'flex',alignItems:'center',gap:'8px',color:'#807D7E',fontWeight:'700'}}><img src={out} alt="" /> <p style={{cursor:'pointer'}}>Sign out</p></li>
        </ul>
    </div>
  )
}

export default ProfileLeft