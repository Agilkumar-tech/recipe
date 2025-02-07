import { AiFillStar } from "react-icons/ai"
import {AiOutlineShoppingCart} from "react-icons/ai";
import "./Cart.css"

import Data from '../db/data'
import { Link } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const notify = () => toast("ADDED TO CART");
var arr= [];
function push(title){
  Data.map((item)=>{
    if(item.title===title){
      arr.push(item);
    }
  })
  sessionStorage.setItem("data",JSON.stringify(arr));
  notify();
}
function corect(a){
  sessionStorage.setItem("datas",(a));
}



function Cart({ img, title, star, reviews, prevPrice, newPrice }) {

  return (
   <section className="card"  > 
      <ToastContainer style={{marginTop:"100px"}}/>
   <div > 
 
   <img src={img} alt="shoee" className="card-image" />
      <div className="card-detail">
        <h5 className="card-title " id={title} >{title}</h5>
        <section className="card-reviews">
          <AiFillStar className="rating-star" />
          <AiFillStar className="rating-star" />
          <AiFillStar className="rating-star" />
          <AiFillStar className="rating-star" />
          <spam id="total-review">{reviews}</spam>
        </section>
        <section className="card-price">
          <div className="price">
            <del>{prevPrice}</del> <span style={{color:"green"}}>${newPrice}</span>
          </div>
        </section>
      </div>
      </div>
      <div className="bag">
           < AiOutlineShoppingCart className="bag-icon" onClick={()=>push(title)} style={{marginLeft:"230px",fontSize:"22px"}} /> 
          </div>
    </section>



  )
}

export default Cart
