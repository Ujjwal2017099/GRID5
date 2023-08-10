import React, { useEffect, useState } from 'react'
import logo from '../assets/logo.svg'
import './style.css'
import SearchBar from './SearchBar'
import profile from '../assets/profile.png'
import cart from '../assets/cart.png'
import wishlist from '../assets/wishlist.png'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate();
    const categories = [
        'Women',
        'Men',
        'Electronics',
        'Books'
    ]
    const [search , setSearch] = useState('');
    const [active,setActive] = useState(false);

    useEffect(()=>{
        if(active){
            navigate(`/${search}`);
        }
    },[active])
  return (
      <div className="nav-root">
          <ul className="nav-list">
              <li>
                  <Link to='/'>
                      <img src={logo} alt="" />
                  </Link>
              </li>
              <li>
                  <ul className="nav-list">
                      {categories.map((e) => {
                          return <li onClick={()=>{setSearch(e);setActive(true);}} style={{cursor : 'pointer'}} >{e}</li>;
                      })}
                  </ul>
              </li>
              <li>
                  <SearchBar search={search} setSearch={setSearch} setActive={setActive} />
              </li>
              <li>
                  <ul className="nav-list">
                      <li>
                          <img
                              style={{ borderRadius: "10px",cursor:'pointer' }}
                              src={profile}
                              alt=""
                              onClick={()=>{navigate('/Profile')}}
                          />
                      </li>
                      <li>
                          <img
                              style={{ borderRadius: "10px",cursor:'pointer' }}
                              src={cart}
                              alt=""
                              onClick={()=>{navigate('/cart');}}
                          />
                      </li>
                  </ul>
              </li>
          </ul>
      </div>
  );
}

export default Navbar