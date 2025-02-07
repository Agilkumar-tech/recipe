import React, { useState } from 'react'
import Cartcard from './Cartcard';
import {AiFillCaretLeft} from "react-icons/ai"
import "./Storage.css"
import { Link } from 'react-router-dom';
function Storage({ title }) {
    const [array2, setArray2] = useState(JSON.parse(sessionStorage.getItem("data")));
    // const [deletes, setDeletes] = useState(JSON.parse(sessionStorage.getItem("value")))
    var count = 0;
    function toDelete(title) {
        setArray2(array2.filter((item) =>
            item.title != title
        ))
    }

    function callCard(f) {
        return (
            <Cartcard
                key={++count}
                title={f.title}
                img={f.img}
                reviews={f.reviews}
                prevPrice={f.prevPrice}
                newPrice={f.newPrice}
                toBeDeleted={toDelete}
            />
        );
    }

    return (
        <div>
            <div className='cart-head'>
            <Link to="/"><button  className='btn btn-success button-back'><AiFillCaretLeft/>Back</button></Link>
            <h1 className='title'>Cart</h1>
            </div>
            <div  className='box-content'>
                {array2.map((f) => callCard(f))}
            </div>
        </div>
    )
}

export default Storage
