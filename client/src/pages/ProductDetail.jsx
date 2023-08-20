import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Image from '../assets/Loading.gif'
import Stars from '../assets/stars.svg'
import './style.css'
import cart from '../assets/prd-cart.svg'
import pay from '../assets/secure-pay.svg'
import ship from '../assets/free-ship.svg'
import greaterThan from '../assets/greater-than.svg'
import tick from '../assets/tick.svg'
import Products from '../components/Products'
import Footer from '../components/Footer'
import { useNavigate, useParams } from "react-router-dom";
import { URL } from '../URL'
import axios from 'axios'
import {ModelURL} from '../ModelURL'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Params() {
    return useParams();
}
const ProductDetail = () => {
  const token = JSON.parse(localStorage.getItem('id'))
  const prd = Params();
  const navigate = useNavigate();
    const [product, setProduct] = useState({
        Name: "",
        Description:
            "",
        Price: "",
        Rating:"",
        Category: "",
        Attributes: [,
        ],
        Image,
    });
    const [suggested , setSuggested] = useState([{
        Image ,
        Name : '',
        Brand : '',
        Price : ''
    }])

    useEffect(()=>{
      if (token && token.length) {
          const url = `${URL}/search_history?token=${token}&search=${prd.id}`;
          const options = {
              url,
              method: "POST",
              headers: { "content-type": "application/json" },
          };

          axios(options)
              .then((res) => {
                  console.log(res.data);
              })
              .catch((err) => {
                  console.log(err);
              });
      }
    },[])

    useEffect(()=>{
      const url = `${ModelURL}/productPage?id=${prd.id}`
      
      const options = {
        method : "GET",
        headers : {'content-type' : 'application/json'},
        url,
      }
      axios(options)
      .then((res)=>{
        const main = res.data[0];
        setProduct(main);
        setSuggested(res.data[1]);
      }).catch((err)=>{
        console.log(err);
      })
    },[prd])
    const prdHeadStyle = {
        padding : '30px 0px',
        display : 'flex',
        gap : '105px'
    }
    const main = {
        padding : '0px 75px'
    }
    const addToCart = ()=>{
      if(token && token.length){
        const url = `${URL}/add_to_cart?token=${token}`;
        const data = JSON.stringify({
          product : prd.id
        })
        const options = {
          method : "POST",
          url,
          headers : {'content-type':'application/json'},
          data
        }
        axios(options)
        .then((res)=>{
          toast('Added to cart')
        }).catch((err)=>{
          console.log(err);
        })
      }else{
        alert('Login First');
        navigate('/auth/login');
      }
    }
  return (
    <>
    <ToastContainer />
      <div style={main}>
          <Navbar />
          <div style={prdHeadStyle}>
              <div className="product-left-img">
                  <img src={product.Image} alt="" />
              </div>
              <div className="product-right">
                <p style={{color:'#807D7E'}}>Shop <img style={{margin:'0px 10px'}} src={greaterThan} alt="" />  {product.Category}</p>
                  <h1>{product.Name}</h1>
                  <div className='product-rating'>
                      <img src={Stars} alt="" />
                      <p>{product.Rating}</p>
                  </div>
                  <div style={{display:'flex',alignItems:'center',gap:'20px'}}>
                    <button onClick={addToCart} className='btn' style={{display:'flex',alignItems:'center',gap:'8px'}}> <img src={cart} alt="" /> Add to Cart</button>
                    <button className='btn2' style={{display:'flex',alignItems:'center',gap:'8px'}}> Price</button>
                  </div>
                  <hr style={{margin : '25px 0px'}} />
                  <div>
                    <img src={pay} alt="" />
                    <img src={ship} alt="" />
                  </div>
                  <div>
                    <div style={{display : 'flex',alignItems:'center',gap : '5px'}}>
                      <div style={{height : '25px' , width : '5px' , backgroundColor : '#8A33FD' , borderRadius : '2px'}}></div>
                      <h3 style={{color : '#3C4242',fontFamily:'Noto Sans Vithkuqi'}} >Product Description</h3>
                    </div>
                    <p style={{color : '#807D7E',fontSize:'14px'}}>
                        {product.Description}
                    </p>
                    <div>
                        {
                            product.Attributes.map((e)=>{
                                return (
                                    <>
                                        <p style={{display:'flex' , alignItems : 'center' , gap : '10px',color : '#807D7E'}}>
                                            <img src={tick} alt="" /> {e[1]}
                                        </p>
                                    </>
                                );
                            })
                        }
                    </div>
                  </div>
              </div>
          </div>
          <hr />
          <div>
            <div style={{display : 'flex',alignItems:'center',gap : '5px'}}>
              <div style={{height : '25px' , width : '5px' , backgroundColor : '#8A33FD' , borderRadius : '2px'}}></div>
              <h3 style={{color : '#3C4242',fontFamily:'Noto Sans Vithkuqi'}} >Similar Products</h3>
            </div>
            <Products list={suggested} />
          </div>
      </div>
          <Footer/>
    </>
  );
}

export default ProductDetail