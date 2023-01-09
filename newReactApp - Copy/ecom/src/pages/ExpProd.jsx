import React from 'react'
import axios from 'axios'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Navbar from './components/Navbar'
import { useState } from 'react'
import { useEffect } from 'react'




const ExpProd = (props) => {
  const allprodforexpg = props.expgproducts
  const [filteredByPrice, setFilteredByPrice] = useState('')
  const SetBasketLength=props.setbasketlength


  useEffect(() => {
    const GetProducts = () => {
      setFilteredByPrice(allprodforexpg.filter(x => x.price > 100))

    }
    GetProducts()
    console.log(filteredByPrice);


  }, [])






  return (
    <div className="container">
      <div className="row d-flex justify-content-between mt-5">

        {filteredByPrice && filteredByPrice.map(product => {
          return (<div key={product.id} className="card  my-4 mycard " >
            <div className="imgdiv">
            <Link to={`/details/${product.id}`}>
              <img className="card-img-top" src={product.image} alt="Card image cap" />
              </Link>
            </div>
            <div className="card-body">
              <h5 className="card-title mycardtitle">{product.title}</h5>
              
              <span className="pricespan">{product.price} AZN</span>
              <button onClick={() => {
                  const BasketItems = JSON.parse(localStorage.getItem('basketlist'))
                  let incValidate = false
                  if (BasketItems.length == 0) {
                    BasketItems.push(product)
                    localStorage.setItem('basketlist', JSON.stringify(BasketItems))
                    SetBasketLength(BasketItems.length)
                  }
                  else {
                    BasketItems.map(x=>{
                      {
                        if (x.title === product.title) {
                          incValidate = true
                        }
                      }


                    }) 
                    if(incValidate===true){
                      
                    }
                    else{
                      BasketItems.push(product)
                      localStorage.setItem('basketlist', JSON.stringify(BasketItems))
                      SetBasketLength(BasketItems.length)
                    }

                  }














                }} className="addtocard fw-bold">Add To Card</button>
            </div>
          </div>)
        })}

      </div>



    </div>
  )
}

export default ExpProd