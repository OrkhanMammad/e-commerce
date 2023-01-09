import './App.css';
import axios from 'axios'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Navbar from './pages/components/Navbar';
import ExpProd from './pages/ExpProd';
import HomePage from './pages/HomePage'
import About from './pages/About'
import { useState } from 'react';
import { useEffect } from 'react';
import { CSSProperties } from "react";
import CircleLoader from "react-spinners/CircleLoader";
import BasketPage from './pages/components/BasketPage';
import ProductDetail from './pages/components/ProductDetail';
import Footer from './pages/components/Footer';
import Admin from './pages/Admin';


const override = {
  display: "block",
  margin: "0 auto",
  
  borderColor: "red",
};

function App() {
  if (JSON.parse(localStorage.getItem('basketlist') === null)) {
    localStorage.setItem('basketlist', JSON.stringify([]))
  }
  const [allproducts, setAllproducts] = useState('')
  const [loading, setLoading] = useState(true);
  const [basketLength, setBasketLength]=useState(0)
  const [basketIncludes, SetBasketIncludes]=useState(JSON.parse(localStorage.getItem('basketlist')).length)


  useEffect(() => {
    const GetProducts = async () => {
      const allproductsarr = await axios.get('https://63b4129c9f50390584a5def3.mockapi.io/user/products')
      
      setAllproducts(allproductsarr.data)
      console.log(allproductsarr.data);

    }
    GetProducts()
    if (JSON.parse(localStorage.getItem('basketlist') === null)) {
      localStorage.setItem('basketlist', JSON.stringify([]))
    }

    const getBaksetLength=()=>{
      setBasketLength(JSON.parse(localStorage.getItem('basketlist')).length)
    }
    getBaksetLength()

  },[])


  return (
    <div className="App">
      

        {allproducts ?
        <BrowserRouter>
      
        <header className="d-flex justify-content-between">
          
              <div className="headerleft"><Link className='navbarComponents' to='/'>NCSL</Link> </div>
              <div className="headerright">
                  <Link className='navbarComponents' to='/'>Home</Link>
                  <Link className='navbarComponents' to='/expprod'>Expensive Products</Link>
                  <Link className='navbarComponents' to='/about'>About Us</Link>
                  <Link className='navbarComponents' to='/basket'><i className="fa-solid fa-basket-shopping shoppingIcon" ><sup>{basketIncludes}</sup></i></Link>
              </div>
  
  
  
          </header>
          <Routes>
            <Route path='/' element={<HomePage hmpgproducts={allproducts} setbasketlength={SetBasketIncludes} />} />
            <Route path='/expprod' element={<ExpProd expgproducts={allproducts} setbasketlength={SetBasketIncludes} />} />
            <Route path='/about' element={<About />} />
            <Route path='/basket' element={<BasketPage setbasketlength={SetBasketIncludes}/>} />
            <Route path='/details/:id' element={<ProductDetail setbasketlength={SetBasketIncludes} allproducts={allproducts} />} />
            <Route path='/admin' element={<Admin setAllProds={setAllproducts} allproducts={allproducts} />} />

          </Routes><Footer /></BrowserRouter> : <div className="loadingItem"><CircleLoader


            color="yellow"
            loading={loading}
            cssOverride={override}
            size="100%"
            aria-label="Loading Spinner"
            data-testid="loader"
          /></div>}

      
      
    </div>
  );
}

export default App;
