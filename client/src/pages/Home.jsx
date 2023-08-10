import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Products from '../components/Products'
import Footer from '../components/Footer'
import Banner from '../components/Banner'
import './style.css'
import product from '../assets/product.svg'
import BrandPoster from '../components/BrandPoster'

const Home = () => {
  const [suggested,setSuggested] = useState([{
    Image : product,
    Name : 'Name',
    Brand : 'Brand',
    Price : 'Price'
  }])
  return (
    <div>
        <Navbar/>
        <Banner/>
        <div className='home-container'>
          <div style={{display : 'flex',alignItems:'center',gap : '5px'}}>
            <div style={{height : '25px' , width : '5px' , backgroundColor : '#8A33FD' , borderRadius : '2px'}}></div>
            <h3 style={{color : '#3C4242',fontFamily:'Noto Sans Vithkuqi'}} >Suggested for You</h3>
          </div>
          <Products list={suggested} />
        </div>
        <div className='home-container'>
          <div style={{display : 'flex',alignItems:'center',gap : '5px'}}>
            <div style={{height : '25px' , width : '5px' , backgroundColor : '#8A33FD' , borderRadius : '2px'}}></div>
            <h3 style={{color : '#3C4242',fontFamily:'Noto Sans Vithkuqi'}} >Based on Your Searches</h3>
          </div>
          <Products list={suggested} />
        </div>
        <BrandPoster/>
        <div className='home-container'>
          <div style={{display : 'flex',alignItems:'center',gap : '5px'}}>
            <div style={{height : '25px' , width : '5px' , backgroundColor : '#8A33FD' , borderRadius : '2px'}}></div>
            <h3 style={{color : '#3C4242',fontFamily:'Noto Sans Vithkuqi'}} >Trending Products</h3>
          </div>
          <Products list={suggested} />
        </div>
        <Footer/>
    </div>
  )
}

export default Home