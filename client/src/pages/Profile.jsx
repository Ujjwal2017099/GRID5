import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import greater from '../assets/greater-than.svg'
import ProfiLeft from '../components/ProfileLeft'
import MyOrders from '../components/MyOrders'
import Footer from '../components/Footer'

const Profile = () => {
    const [toogle,setToogle] = useState(0);
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
                                    <p style={{fontWeight : '600',fontSize:'15px'}}>Your Name</p>
                                </li>
                                <li style={itemStyle}>
                                    <p style={{fontWeight : '600',color : '#807D7E'}}>Email Address</p>
                                    <p style={{fontWeight : '600',fontSize:'15px'}}>YourName@gmail.com</p>
                                </li>
                                <li style={itemStyle}>
                                    <p style={{fontWeight : '600',color : '#807D7E'}}>Phone Number</p>
                                    <p style={{fontWeight : '600',fontSize:'15px'}}>7895890978</p>
                                </li>
                                <li style={itemStyle}>
                                    <p style={{fontWeight : '600',color : '#807D7E'}}>Delivery Address</p>
                                    <p style={{fontWeight : '600',fontSize:'15px'}}>1/4 Pragatinagar Flats, opp. jain derasar , near Jain derasar, Vijaynagar road</p>
                                </li>
                            </ul>
                        </div>
                    </div> : 
                    <MyOrders/>
                }
            </div>
          </div>
          <Footer/>
      </>
  );
}

export default Profile