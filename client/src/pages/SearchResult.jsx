import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Image from '../assets/Loading.gif'
import Products from '../components/Products';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { URL } from '../URL';
import axios from 'axios';

function Params (){
    return useParams();
}

const SearchResult = () => {
    const {search} = Params();
    const [result,setResult] = useState([{
        Image,
        Name : "",
        Brand : '',
        Price : ''
    }])
    useEffect(()=>{
        const url = `${URL}/search?search=${search}`
        const options = {
            method : "GET",
            headers : {'content-type' : 'application/json'},
            url
        }
        axios(options)
        .then((res)=>{
            console.log(res.data);
            setResult(res.data)
        }).catch((err)=>{

        })
    },[search])
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