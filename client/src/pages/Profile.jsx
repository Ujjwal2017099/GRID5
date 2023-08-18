import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import greater from '../assets/greater-than.svg'
import ProfiLeft from '../components/ProfileLeft'
import MyOrders from '../components/MyOrders'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'
import {URL} from '../URL'
import axios from 'axios'

const Profile = () => {
    const token = JSON.parse(localStorage.getItem('id'));
    const [toogle,setToogle] = useState(0);
    const navigate = useNavigate();
    const main = {
        padding : '10px 50px 0px 50px'
    }
    const root = {
        display : 'flex'
    }
    const itemStyle = {
        display :'flex',
        justifyContent : 'space-between',
        width : '900px'
    }
    const [name,setName] = useState();
    const [email,setEmail] = useState();
    const [phone,setPhone] = useState();
    const [orders,setOrders] = useState();

    useEffect(()=>{
        if (token && token.length) {
            const url = `${URL}/profile?token=${token}`
            const options = {
                method : "GET",
                url,
                headers : {'content-type' : "application/json"}
            }
            axios(options)
            .then((res)=>{
                console.log(res.data);
                setName(res.data.Name)
                setEmail(res.data.Email);
                setPhone(res.data.Mobile);
                setOrders(res.data.Orders);
            }).catch((err)=>{
                console.log(err.message);
            })
        }else{
            navigate('/auth/login')
        }
    },[token])
  return (
      <>
          <Navbar />
          <div style={main}>
            <div style={{ color: "#807D7E" ,fontSize:'13px',display:'flex',alignItems:'center',gap:'15px'}}>
                Home <img src={greater} alt="" /> My Account {
                    toogle === 0 ? <><img src={greater} alt="" /> Personal Info </> : <><img src={greater} alt="" /> Orders Details</> 
                }
            </div>
            <div style={root}>
                <ProfiLeft  setToogle={setToogle}/>
                {
                    toogle===0 ? 
                    <div className="profile-right">
                        <h2>My Info</h2>
                        <div>
                            <ul className='vertical-list'>
                                <li style={itemStyle}>
                                    <p style={{fontWeight : '600',color : '#807D7E'}}>Your Name</p>
                                    <p style={{fontWeight : '600',fontSize:'15px'}}>{name}</p>
                                </li>
                                <li style={itemStyle}>
                                    <p style={{fontWeight : '600',color : '#807D7E'}}>Email Address</p>
                                    <p style={{fontWeight : '600',fontSize:'15px'}}>{email}</p>
                                </li>
                                <li style={itemStyle}>
                                    <p style={{fontWeight : '600',color : '#807D7E'}}>Phone Number</p>
                                    <p style={{fontWeight : '600',fontSize:'15px'}}>{phone}</p>
                                </li>
                            </ul>
                        </div>
                    </div> : 
                    <MyOrders list={orders}/>
                }
            </div>
          </div>
          <Footer/>
      </>
  );
}

export default Profile