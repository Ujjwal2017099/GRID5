import React, { useEffect, useState } from 'react'
import product from '../assets/product.svg'
import { URL } from '../URL';
import axios from 'axios';

const MyOrders = ({list}) => {
    const [orders, setOrders] = useState([]);
    // console.log(list);
    const token = JSON.parse(localStorage.getItem('id'))
    useEffect(()=>{
        const url = `${URL}/orders?token=${token}`
        const data = JSON.stringify({
            Orders : list
        })
        const options = {
            method : 'POST',
            url,
            headers : {'content-type' : 'application/json'},
            data
        }

        axios(options)
        .then((res)=>{
            console.log(res.data);
            setOrders(res.data)
        }).catch((err)=>{
            console.log(err.message);
        })
    },[list])
  return (
    <div>
        <h2>My Orders</h2>
        {
            orders.map((e)=>{
                return (
                    <div style={{width : '800px'}}>
                        <div style={{backgroundColor:'rgb(245 245 245)',padding:'20px 30px',borderRadius:'5px'}}>
                            <h4>Order No : {e.OrderId}</h4>
                            <p style={{color:'#807D7E', fontSize:'13px'}}>Orders Date : {e.Date}</p>
                        </div>
                        <div style={{ display: "flex" ,alignItems:'center',justifyContent : 'space-between'}}>
                            <div style={{ display: "flex",alignItems:'center',gap:'50px' }}>
                                <img style={{height : '100px'}} src={e.Image} alt="" />
                                <div>
                                    <h5>{e.Name}</h5>
                                    <p style={{color:'#807D7E', fontSize:'13px'}}>Quantity : {e.Quantity}</p>
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