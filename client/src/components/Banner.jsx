import React from 'react'
import './style.css'

const Banner = () => {
    const textStyle = {
        color: "#fff",
        fontFamily: "Noto Sans Vithkuqi",
        width : '70%',
        margin : 'auto',
        position : 'absolute',
        top : '17%',
        left : '20%',
        fontSize : '30px'
    };
    const button = {
        width : 'max-content',
        color : '#000',
        fontSize : '18px',
        backgroundColor : '#fff',
        padding : '7px 25px',
        borderRadius : '5px '
    }
    const sm = {
        fontSize : '18px'
    }
  return (
      <div className="main-banner">
          <div style={textStyle}>
              <p style={sm}>T-shirt / Tops </p>
              <h1>Summer</h1>
              <h1>Value Pack</h1>
              <p style={sm}>cool / colourful / comfy</p>
              <div style={button}>Shop Now</div>
          </div>
      </div>
  );
}

export default Banner