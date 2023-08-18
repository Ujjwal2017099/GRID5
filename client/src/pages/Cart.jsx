import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import product from '../assets/product.svg'
import del from '../assets/delete.svg'
import Quantity from '../components/Quantity'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { URL } from '../URL'


const Cart = () => {
    const token = JSON.parse(localStorage.getItem('id'));
    const [products, setProducts] = useState([]);
    
    const navigate = useNavigate();
    useEffect(()=>{
        if(token && token.length){
            const url = `${URL}/cart?token=${token}`
            const options = {
                method : "GET",
                url,
                headers : {'content-type' : 'application/json'}
            }
            axios(options)
            .then((res)=>{
                console.log(res.data);
                setProducts(res.data);
            }).catch((err)=>{
                console.log(err.message);
            })
        }else{
            alert('Login first');
            navigate('/auth/login');
        }
    },[token])

    const [total,setTotal] = useState(0);
    useEffect(()=>{
        setTotal(0);
        let t=0;
        products.forEach((e)=>{
            t += e.Price*e.Quantity;
        })
        setTotal(t);
    },[products])

    const placeOrder = ()=>{
        if(token && token.length){
            const url = `${URL}/new_order?token=${token}`;
            const data = JSON.stringify({
                products
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
            }).catch((err)=>{
                console.log(err.message);
            })
        }else{

        }
    }
  return (
      <>
          <Navbar />
          <div>
              <div>
                  <div>
                      <table>
                          <thead>
                              <tr>
                                  <th>Product Details</th>
                                  <th>Price</th>
                                  <th>Quanity</th>
                                  <th>Sub Total</th>
                                  <th>Action</th>
                              </tr>
                          </thead>
                          <tbody>
                              {products.map((e) => {
                                  return (
                                      <tr>
                                          <td>
                                              <div
                                                  style={{
                                                      display: "flex",
                                                      alignItems: "center",
                                                      gap: "25px",
                                                  }}
                                              >
                                                  <div>
                                                      <img
                                                          style={{
                                                              height: "100px",
                                                          }}
                                                          src={e.Image}
                                                          alt=""
                                                      />
                                                  </div>
                                                  <div>
                                                      <h4>{e.Name}</h4>
                                                      <p
                                                          style={{
                                                              fontSize: "12px",
                                                              color: "#807D7E",
                                                          }}
                                                      >
                                                          Brand
                                                      </p>
                                                  </div>
                                              </div>
                                          </td>
                                          <td>{e.Price}</td>
                                          <td>
                                              <Quantity
                                                  quant={e.Quantity}
                                                  id={e.CartId}
                                              />
                                          </td>
                                          <td style={{ fontWeight: "700" }}>
                                              {e.Price * e.Quantity}
                                          </td>
                                          <td>
                                              <img
                                                  style={{ cursor: "pointer" }}
                                                  src={del}
                                                  alt=""
                                              />
                                          </td>
                                      </tr>
                                  );
                              })}
                          </tbody>
                      </table>
                  </div>
              </div>
              <div >
                  <div style={{marginLeft:'80%',padding:'40px 0px'}}>
                    <div style={{display:'flex',gap:'15px'}}>
                        <p>Total Price</p>
                        <p style={{fontWeight:'700'}}>{total}</p>
                    </div>
                    <button onClick={placeOrder} className='btn'>Proceed to Checkout</button>
                  </div>
              </div>
          </div>
          <Footer/>
      </>
  );
}

export default Cart