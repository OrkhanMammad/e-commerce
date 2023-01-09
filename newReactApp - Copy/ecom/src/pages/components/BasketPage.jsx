import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { json, Link, useRouteLoaderData } from 'react-router-dom'
import Footer from './Footer'


const BasketPage = (props) => {

    const [basketItems, setBasketItems] = useState([])
    const [totalAmount, setTotalAmount]=useState(0)
    const setBasketLength=props.setbasketlength
    useEffect(() => {
        const GetBasketProducts = async () => {
            const response = await JSON.parse(localStorage.getItem('basketlist'))
            setBasketItems(response)


        }
        GetBasketProducts()
        let totalPrice = 0
        JSON.parse(localStorage.getItem('basketlist')).map(x => {
            totalPrice += x.price * x.count
    
        })
        setTotalAmount(totalPrice)



    }, [])
    

    




    const removeHandler = (id) => {

        setBasketItems(basketItems.filter(x => x.id !== id))
        localStorage.setItem('basketlist', JSON.stringify(basketItems.filter(x => x.id !== id)))
        let totalPrice = 0
        JSON.parse(localStorage.getItem('basketlist')).map(x => {
            totalPrice += x.price * x.count
    
        })
        setTotalAmount(totalPrice)
        setBasketLength(basketItems.filter(x => x.id !== id).length)

    }


    const countHandler = (e) => {
        
        basketItems.map(x => {
            if (x.id == e.target.id) {
                x.count = e.target.value
            }
          
        }
        )
        
        localStorage.setItem('basketlist', JSON.stringify(basketItems))
        let totalPrice = 0
        basketItems.map(x=>{
            totalPrice+=x.price*x.count
        })
        setTotalAmount(totalPrice)
        
        
    }
    











    return (
        
        <div className="container">
            
        <div className='row bskrow'>
            {basketItems.length > 0 ? <div><table className="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Image</th>
                        <th scope="col">Title</th>
                        <th scope="col">Price</th>
                        <th scope="col">Count</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {basketItems && basketItems.map(item => {

                        return (<tr className="trforcards" key={item.id}>
                            <th scope="row">{item.id}</th>
                            <td className="basketimgtd " scope="row"><img src={item.image} alt="" /></td>
                            <td className="col-lg-8">{item.title}</td>

                            <td className="col-lg-2">{item.price} AZN</td>
                            <td className="col-lg-1"><input id={item.id} onChange={countHandler} className='countInput' type="number" defaultValue={item.count} min={1} /></td>
                            <td><button onClick={() => removeHandler(item.id)} className="btn btn-danger">Remove</button></td>

                        </tr>)

                    })}

                </tbody>

            </table><p className="bsktttl">Total Amount : {totalAmount.toFixed()} AZN</p></div> : <h1 className='emptyBasket'>Your Basket Is Empty!</h1>}
            






        </div>
        
        </div>
    )
}

export default BasketPage