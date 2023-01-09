import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'



const Navbar = () => {

const [basketIncludes, SetBasketIncludes]=useState(0)
useEffect(()=>{
const GetBasketLength=()=>{
    
    if(JSON.parse(localStorage.getItem('basketlist'))){
        const bsktinclds=JSON.parse(localStorage.getItem('basketlist')).length
        SetBasketIncludes(bsktinclds)
    }
    
}
GetBasketLength()
},[basketIncludes])


    return (
        <div></div>
    )
}

export default Navbar