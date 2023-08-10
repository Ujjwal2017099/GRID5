import React from 'react'
import ProductCard from './ProductCard'

const Products = ({ list }) => {
    const main = {
        padding: "0px 20px",
    };
    return (
        <div style={main}>
          {
            list.map((e)=>{
              return <ProductCard image={e.Image} name={e.Name} brand={e.Brand} price={e.Price}/>
            })
          }
          {
            list.map((e)=>{
              return <ProductCard image={e.Image} name={e.Name} brand={e.Brand} price={e.Price}/>
            })
          }
          {
            list.map((e)=>{
              return <ProductCard image={e.Image} name={e.Name} brand={e.Brand} price={e.Price}/>
            })
          }
          {
            list.map((e)=>{
              return <ProductCard image={e.Image} name={e.Name} brand={e.Brand} price={e.Price}/>
            })
          }
        </div>
    );
};

export default Products