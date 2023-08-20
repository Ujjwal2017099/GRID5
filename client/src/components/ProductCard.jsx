import React from 'react'
import { useNavigate } from 'react-router-dom';


const ProductCard = ({id,image,price,name,brand,search}) => {
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
        cursor : 'pointer',
        margin : '45px 0px'
    };
  return (
    <div style={main}>
        <div>
            <img onClick={()=>{id ? navigate(`/product-details/${id}`) : navigate(`/${search}`)}} style={imageStyle} src={image} alt="" />
        </div>
        <div style={{display:'flex',justifyContent:'space-between',marginTop : '-44px'}}>
            <div>
                <div>{name.slice(0,15)}{ name.length > 15 ? "..." : ""}</div>
                <div>{brand && brand.slice(0,10)}{ brand&& brand.length > 10 ? "..." : ""}</div>
            </div>
            <div>
                {
                    id ? <>
                    <i class="inr"></i>{price}
                    </> :
                    <></>
                }
            
            </div>
        </div>
    </div>
  )
}

export default ProductCard