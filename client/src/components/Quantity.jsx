import React, { useState } from 'react'
import plus from '../assets/plus.svg'
import minus from '../assets/minus.svg'
import { URL } from '../URL';
import axios from 'axios';

const Quantity = ({quant,id }) => {
  const [quantity, setQuatity] = useState(quant);
    const main = {
        display: "flex",
        justifyContent: "center",
        gap: "20px",
        padding: "5px 0px",
        backgroundColor: "#F6F6F6",
        borderRadius : '5px'
    };
    console.log(id);
    const token = JSON.parse(localStorage.getItem('id'))
    const decrease = ()=>{
      const url = `${URL}/change_quantity?token=${token}`
      const data = JSON.stringify({
        cartId : id,
        change : -1
      })
      const options = {
        method : "POST",
        headers : {'content-type' : 'application/json'},
        url,
        data
      }

      axios(options)
      .then((res)=>{
        console.log(res.data);
        setQuatity(quant - 1);
      })
      .catch((err)=>{
        console.log(err);
      })
    }
    const increase = ()=>{
      const url = `${URL}/change_quantity?token=${token}`
      const data = JSON.stringify({
          cartId: id,
          change: 1,
      });
      const options = {
        method : "POST",
        headers : {'content-type' : 'application/json'},
        url,
        data
      }

      axios(options)
      .then((res)=>{
        console.log(res.data);
        setQuatity(quant+1)
      })
      .catch((err)=>{
        console.log(err);
      })
    }
    const style = {
      cursor : "pointer"
    }
  return (
      <div style={main}>
          <img style={style} onClick={decrease} src={minus} alt="" />
          {quantity}
          <img style={style} onClick={increase} src={plus} alt="" />
      </div>
  );
}

export default Quantity