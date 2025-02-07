import React from 'react'
import {RiDeleteBin6Line} from "react-icons/ri"
import "./Cartcard.css"
function Cartcard({ title, img, reviews, prevPrice, newPrice, toBeDeleted }) {
 
  return (
    <div className='cart-contents'>
      <div className='cart-product'>
        <div>
          <img src={img} className='cart-image'/>
        </div>
        <div className='content'>
          <h3>{title}</h3>
          <div style={{display:"flex"}}>
          <p>{reviews}</p>
          <button className='btn btn-primary' onClick={()=>toBeDeleted(title)} style={{marginLeft:"200px"}} ><RiDeleteBin6Line/></button>
          </div>
          <del>{prevPrice}</del><span> ${newPrice}</span><br></br>
                    
        </div>
      </div>
     
    </div>
  )
}

export default Cartcard
