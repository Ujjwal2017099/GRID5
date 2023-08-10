import React from 'react'
import './style.css'
import socialMedia from '../assets/socialMedia.svg'

const Footer = () => {
    const arr = [
        {
            heading: "Need Help",
            list: ["Contact Us", "Track Order", "Returs", "FAQ's", "Carrer"],
        },
        {
            heading: "Company",
            list: ["About Us", "Our Blog", "Colaborations", "Media"],
        },
        {
            heading: "More Info",
            list: ["Terms and Conditions", "Privacy Policy", "Shipping Policy"],
        },
        {
            heading: "Location",
            list: ["support@gmail.com", "Graphic Era Clement Town , Dehradun 248002"],
        },
    ];
    const mainStyle = {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-around",
        
        color: "#fff",
        
        fontFamily: "Noto Sans Vithkuqi",
    };
    const root = {
        padding: "20px 25px 20px 25px",
        backgroundColor: "#3C4242",
        marginTop: "50px",
        color : '#fff'
    };
  return (
      <div style={root}>
          <div style={mainStyle}>
              {arr.map((e) => {
                  return (
                      <div
                          style={{ display: "inline-block", textAlign: "left" }}
                      >
                          <h3>{e.heading}</h3>
                          <ul className="vertical-list">
                              {e.list.map((data) => {
                                  return <li>{data}</li>;
                              })}
                          </ul>
                      </div>
                  );
              })}
          </div>
          <div style={{ padding: "15px 87px" }}>
              <img src={socialMedia} alt="" />
          </div>
          <p style={{textAlign:'center',marginTop:'40px'}}>Copyright © 2023 Ecommerce  Pvt Ltd. All rights reserved.</p>
      </div>
  );
}

export default Footer