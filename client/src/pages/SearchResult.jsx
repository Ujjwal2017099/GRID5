import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Image from '../assets/product.svg'
import Products from '../components/Products';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Params (){
    return useParams();
}

const SearchResult = () => {
    const {search} = Params();
    const [result,setResult] = useState([{
        Image,
        Name : "Name",
        Brand : 'Brand',
        Price : 'Price'
    }])
    useEffect(()=>{
        console.log(search);
    })
    const main = {
        padding : '25px 55px'
    }
  return (
      <>
        <Navbar/>
          <div style={main}>
              <div>
                    <div style={{display : 'flex',alignItems:'center',gap : '5px'}}>
                      <div style={{height : '25px' , width : '5px' , backgroundColor : '#8A33FD' , borderRadius : '2px'}}></div>
                      <h3 style={{color : '#3C4242',fontFamily:'Noto Sans Vithkuqi'}} >Search Result : {search}</h3>
                    </div>
                  <Products list={result} />
              </div>
          </div>
          <Footer/>
      </>
  );
}

export default SearchResult