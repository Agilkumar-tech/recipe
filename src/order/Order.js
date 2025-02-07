import React from 'react'
import "../order/Order.css"
import {BsFillBagCheckFill} from "react-icons/bs"
import { input } from '../db/data'
import InputField from './InputField'
function Order() {
    return (
       <div>
        <div className='order-container'>
            
            <h1 style={{textAlign:"center",marginBottom:"40px"}}>Place the Order</h1>
            <form>
                {input.map((field) => (<InputField lable={field.lable} type={field.type}/>))}
            </form>          
        <button className='btn btn-primary' style={{width:"513px",height:"80px",fontSize:"30px"}}>Order <BsFillBagCheckFill style={{fontSize:"40px"}}/></button>
        </div>
        </div>
    )
}

export default Order
