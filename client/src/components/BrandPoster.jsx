import React from 'react'
import brands from '../assets/brandImg.svg'

const BrandPoster = () => {
    const main = {
        width : '75%',
        backgroundColor: "#3C4242",
        color : '#fff',
        textAlign : 'center',
        padding : '0px 30px'
    };
  return (
    <div style={{display : 'flex' , justifyContent:'center'}}>
      <div style={main}>
          <h2>Top Brand Deals</h2>
          <span>Up To</span> <span style={{ color: "#FBD103" }}>60%</span>{" "}
          <span> off on brands</span>
          <div style={{margin : '50px 0px'}}>
            <img src={brands} alt="" />
          </div>
      </div>
    </div>
  );
}

export default BrandPoster