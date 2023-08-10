import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import product from '../assets/product.svg'
import del from '../assets/delete.svg'
import Quantity from '../components/Quantity'
import Footer from '../components/Footer'


const Cart = () => {
    const [products, setProducts] = useState([
        {
            Image: product,
            Name: "Blue Flower Print Crop Top",
            Brand: "Brand",
            Price: 40,
            Quant: 1,
            Id : '1'
        },
    ]);

    const [total,setTotal] = useState(0);
    useEffect(()=>{
        products.forEach((e)=>{
            setTotal(total + e.Price*e.Quant);
        })
    },[products])
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
                                                          {e.Brand}
                                                      </p>
                                                  </div>
                                              </div>
                                          </td>
                                          <td>{e.Price}</td>
                                          <td>
                                              <Quantity
                                                  quant={e.Quant}
                                                  id={e.Id}
                                              />
                                          </td>
                                          <td style={{ fontWeight: "700" }}>
                                              {e.Price * e.Quant}
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
                                                          {e.Brand}
                                                      </p>
                                                  </div>
                                              </div>
                                          </td>
                                          <td>{e.Price}</td>
                                          <td>
                                              <Quantity
                                                  quant={e.Quant}
                                                  id={e.Id}
                                              />
                                          </td>
                                          <td style={{ fontWeight: "700" }}>
                                              {e.Price * e.Quant}
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
                    <button className='btn'>Proceed to Checkout</button>
                  </div>
              </div>
          </div>
          <Footer/>
      </>
  );
}

export default Cart