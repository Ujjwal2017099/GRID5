import React from 'react'
import ProductCard from './ProductCard'

const Products = ({ list }) => {
    const main = {
        padding: "0px 20px",
    };
    console.log(list);
    return (
        <div style={main}>
          {
            list.map((e)=>{
              return <ProductCard id={e._id} search={e.search} image={e.Image} name={e.Name} brand={e.Brand} price={e.Price}/>
            })
          }
          
        </div>
    );
};

export default Products