import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'


const HomePage = (props) => {
  if (JSON.parse(localStorage.getItem('basketlist') === null)) {
    localStorage.setItem('basketlist', JSON.stringify([]))
  }
  const nonFilteredProducts = props.hmpgproducts
  const setBasketLength = props.setbasketlength
  const [catFilter, setCatFilter] = useState(nonFilteredProducts)
  

  const FiltCatHandler = (e) => {
    if (e.target.value == "all") {
      setCatFilter(nonFilteredProducts)
    }
    else {
      setCatFilter(nonFilteredProducts.filter(x => x.category === e.target.value))
    }
  }


  
  

  
 

  return (
    <div className="container">
      <select onChange={FiltCatHandler} className="mt-3 slctopt" name="" id="">
        <option value="all">All Products</option>
        <option value="men's clothing">Men's clothing</option>
        <option value="women's clothing">Women's clothing</option>
        <option value="jewelery">Jewelery</option>
        <option value="electronics">Electronics</option>

      </select>
      


      <div className="row d-flex justify-content-between mt-5">

        {catFilter && catFilter.map(product => {
          return (

            <div key={product.id} className="card my-4 mycard " >
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
                    setBasketLength(BasketItems.length)

                  }
                  else {
                    BasketItems.map(x => {
                      {
                        if (x.title === product.title) {
                          incValidate = true
                        }
                      }


                    })
                    if (incValidate === true) {

                    }
                    else {
                      BasketItems.push(product)
                      localStorage.setItem('basketlist', JSON.stringify(BasketItems))
                      setBasketLength(BasketItems.length)

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

export default HomePage