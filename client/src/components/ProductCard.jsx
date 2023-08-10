import React from 'react'
import { useNavigate } from 'react-router-dom';


const ProductCard = ({image,price,name,brand}) => {
    const navigate = useNavigate();
    const main = {
        width : '200px',
        height : '410px',
        display : 'inline-block',
        margin : '0px 25px 5px 5px'
    }
    const imageStyle = {
        width: "200px",
        height: "400px",
        cursor : 'pointer'
    };
  return (
    <div style={main}>
        <div>
            <img onClick={()=>{navigate('/product-details/id')}} style={imageStyle} src={image} alt="" />
        </div>
        <div style={{display:'flex',justifyContent:'space-between',marginTop : '-44px'}}>
            <div>
                <div>{name}</div>
                <div>{brand}</div>
            </div>
            <div>
                {price}
            </div>
        </div>
    </div>
  )
}

export default ProductCard