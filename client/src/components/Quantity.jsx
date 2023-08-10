import React from 'react'
import plus from '../assets/plus.svg'
import minus from '../assets/minus.svg'

const Quantity = ({quant,setQuantity,id}) => {
    const main = {
        display: "flex",
        justifyContent: "center",
        gap: "20px",
        padding: "5px 0px",
        backgroundColor: "#F6F6F6",
        borderRadius : '5px'
    };
  return (
    <div style={main}>
        <img onClick={()=>{setQuantity.current = (parseInt(quant)-1);console.log(quant);}} src={minus} alt="" />
        {quant}
        <img onClick={()=>{setQuantity.current = (parseInt(quant)+1);}} src={plus} alt="" />
    </div>
  )
}

export default Quantity