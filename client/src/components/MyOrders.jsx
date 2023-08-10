import React, { useState } from 'react'
import product from '../assets/product.svg'

const MyOrders = () => {
    const [orders, setOrders] = useState([
        {
            OrderId: "123546",
            OrderDate: "12-2-2022",
            Name: "Black Printed T-shirt",
            Qty : 1,
            Total : 45,
            Image : product
        },
        {
            OrderId: "123546",
            OrderDate: "12-2-2022",
            Name: "Black Printed T-shirt",
            Qty : 1,
            Total : 45,
            Image : product
        },
        {
            OrderId: "123546",
            OrderDate: "12-2-2022",
            Name: "Black Printed T-shirt",
            Qty : 1,
            Total : 45,
            Image : product
        },
    ]);
  return (
    <div>
        <h2>My Orders</h2>
        {
            orders.map((e)=>{
                return (
                    <div style={{width : '800px'}}>
                        <div style={{backgroundColor:'rgb(245 245 245)',padding:'20px 30px',borderRadius:'5px'}}>
                            <h4>Order No : {e.OrderId}</h4>
                            <p style={{color:'#807D7E', fontSize:'13px'}}>Orders Date : {e.OrderDate}</p>
                        </div>
                        <div style={{ display: "flex" ,alignItems:'center',justifyContent : 'space-between'}}>
                            <div style={{ display: "flex",alignItems:'center',gap:'50px' }}>
                                <img style={{height : '100px'}} src={e.Image} alt="" />
                                <div>
                                    <h5>{e.Name}</h5>
                                    <p style={{color:'#807D7E', fontSize:'13px'}}>Quantity : {e.Qty}</p>
                                    <p style={{color:'#807D7E', fontSize:'13px'}}>Total : {e.Total}</p>
                                </div>
                            </div>
                            <div>
                                <button className="btn">View Details</button>
                            </div>
                        </div>
                        <hr />
                    </div>
                );
            })
        }
    </div>
  )
}

export default MyOrders