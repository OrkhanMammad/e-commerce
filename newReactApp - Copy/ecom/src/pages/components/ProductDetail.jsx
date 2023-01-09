import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import CircleLoader from "react-spinners/CircleLoader";
const override = {
    display: "block",
    margin: "0 auto",
    
    borderColor: "red",
  };
  
const ProductDetail = (props) => {
    const [loading, setLoading] = useState(true);
    const allProducts=props.allproducts
    const setBasketLength=props.setbasketlength
    const {id}=useParams()
const [product, setProduct]=useState()
useEffect(()=>{


  allProducts.map(x=>{
    if(x.id==id){
      setProduct(x)
      
    }})
    
  



},[])


  return (
    <div className="container">
        {product ? <div key={product.id} className='row my-5 detrow'>
<div className="col-lg-3">
    <div className="detImg"><img src={product.image} alt="" /></div>
</div>
<div className="col-lg-3">

</div>
<div className="col-lg-6">
<h3>{product.title}</h3>
<p>{product.description}</p>
<span className='pricespan'>{product.price+" "+ "AZN"}</span>
<button onClick={() => {
  document.getElementById('IncrementSpan').classList.remove('spandnone')
  setTimeout(() => {
    document.getElementById('IncrementSpan').classList.add('spandnone')
  }, 300);
  
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
              <h4 id='IncrementSpan' className='spandnone'>Product has been added!</h4>


</div>



    </div>:<div className="loadingItem"><CircleLoader


color="yellow"
loading={loading}
cssOverride={override}
size="100%"
aria-label="Loading Spinner"
data-testid="loader"
/></div>}
    
    </div>
  )
}

export default ProductDetail