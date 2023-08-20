import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Products from '../components/Products'
import Footer from '../components/Footer'
import Banner from '../components/Banner'
import './style.css'
import product from '../assets/Loading.gif'
import BrandPoster from '../components/BrandPoster'
import { ModelURL } from '../ModelURL'
import { URL } from '../URL'
import axios from 'axios'
import skirt from '../assets/skirt.png'
import jeans from '../assets/jeans.png'
import shirt from '../assets/shit.png'
import top from '../assets/top.png'
import book from '../assets/books.png'
const Home = () => {
  const [suggested,setSuggested] = useState([{
    Image : skirt,
    Name : "Skirts",
    Brand : "",
    Price : "",
    search : "Skirts"
  },
  {
    Image : jeans,
    Name : "Jeans",
    Brand : "",
    Pice : "",
    search : "Jeans"
  },
  {
    Image : shirt,
    Name : "Shirts",
    Brand : "",
    Price : "",
    search : "Shirts"
  },
  {
    Image : top,
    Name : "Tops",
    Brand : "",
    Price : "",
    search : "Tops"
  },
  {
    Image : book,
    Name : "Books",
    Brand : "",
    Price : "",
    search : "Books"
  }
])
  
  const [heading,setHeading] = useState("Shop by Category")
  const [trending,setTrending] = useState([]);
  const token = JSON.parse(localStorage.getItem('id'));
  useEffect(()=>{
    if(token && token.length){
      let search = [];
      try {
        axios({
            url: `${URL}/search_history?token=${token}`,
            method : 'GET',
            headers : {'content-type' : 'application/json'}
        }).then((res)=>{
          search = Array.from(new Set(res.data))
          if(search.length) setHeading("Suggested for you")
          
          console.log(search);
          const url = `${ModelURL}/searchHistory`
        const data = JSON.stringify({
          search  
        })
        const options = {
          method : "POST",
          url,
          headers : {'content-type' : 'application/json'},
          data
        }
        axios(options)
        .then((res)=>{
          console.log(res.data);
          if(res.data.length)setSuggested(res.data);
        }).catch((err)=>{
          console.log(err);
        })
        })
      } catch (error) {
        
      }
      
    }else{

    }

  },[token])

  useEffect(()=>{
    const url = `${ModelURL}/trendingProducts`
    const options = {
      method : "GET",
      url,
      headers : {'content-type' : 'application/json'}
    }
    axios(options)
    .then((res)=>{
      setTrending(res.data);
    }).catch((err)=>{
      console.log(err);
    })
  },[])
  return (
    <div>
        <Navbar/>
        <Banner/>
        <div className='home-container'>
          <div style={{display : 'flex',alignItems:'center',gap : '5px'}}>
            <div style={{height : '25px' , width : '5px' , backgroundColor : '#8A33FD' , borderRadius : '2px'}}></div>
            <h3 style={{color : '#3C4242',fontFamily:'Noto Sans Vithkuqi'}} >Trending Products</h3>
          </div>
          <Products list={trending} />
        </div>
        <BrandPoster/>
        <div className='home-container'>
          <div style={{display : 'flex',alignItems:'center',gap : '5px'}}>
            <div style={{height : '25px' , width : '5px' , backgroundColor : '#8A33FD' , borderRadius : '2px'}}></div>
            <h3 style={{color : '#3C4242',fontFamily:'Noto Sans Vithkuqi'}} >{heading}</h3>
          </div>
          <Products list={suggested} />
        </div>
        
        <Footer/>
    </div>
  )
}

export default Home