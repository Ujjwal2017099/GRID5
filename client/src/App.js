
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { useNavigate } from 'react-router';
import Signin from './pages/Signin';
import Login from './pages/Login';
import { useEffect } from 'react';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import './pages/style.css';
import './components/style.css';
import SearchResult from './pages/SearchResult';
import Cart from './pages/Cart';
import Profile from './pages/Profile';

function Change(){
  const navigate = useNavigate();
  useEffect(()=>{
    navigate('/auth/login')
  },[]);

  return (
    <h2> Not found</h2>
  )
}

function App() {
  
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/signup" element={<Signin />} />
              <Route path="/product-details/:id" element={<ProductDetail />} />
              <Route path=":search" element={<SearchResult />} />
              <Route path="/Cart" element={<Cart/>} />
              <Route path="/Profile" element={<Profile/>} />
              <Route path='*' element={<Change/>} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
