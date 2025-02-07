import "./Nav.css"
import {FiHeart} from "react-icons/fi"
import {AiOutlineShoppingCart} from "react-icons/ai";
import { Link } from "react-router-dom"
function Nav({handleinputchange,query}) {
  const heart=document.querySelector("#heart");
  return (
    <nav>
      <h3></h3>
    <div className="nav-container">
      <input 
      type="text"
      className="search-input"
      placeholder="search recipe" 
      onChange={handleinputchange}
      value={query}
      />

     <Link to="/src/Component/Storage"><AiOutlineShoppingCart className="nav-icons"/></Link>
    </div>

     
    </nav>
  )
}

export default Nav
