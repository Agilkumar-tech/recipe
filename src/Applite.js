import React from 'react'
import Sidebar from './Sidebar/Sidebar';
import Nav from './Navigation/Nav';
import Product from './Products/Product';
import Recommand from './Recommand/Recommand';
import { useState } from 'react';
import Data from './db/data';
import Cart from './Component/Cart';

function Applite() {
    const [selectedCategory,setSelectedCategory]=useState(null)
    const [query,setQuery]=useState("")
   
  
  
    const handleinputchange=event=>{
      setQuery(event.target.value);
    }
    const filtereditems=Data.filter(datas=>datas.title.toLocaleLowerCase().indexOf(query.toLocaleLowerCase())!==-1)
    
    const handlechange=event=>{
      setSelectedCategory(event.target.value)
    }
  
    const handleclick=event=>{
      setSelectedCategory(event.target.value)
    }
    function filteredData(Data, selected, query) {
      let filteredProduct = Data;
      if (query) {
        filteredProduct = Data.filter(({ title, category, company, type }) =>
          title.toLowerCase().includes(query.toLowerCase()) ||
          category.toLowerCase().includes(query.toLowerCase()) ||
          company.toLowerCase().includes(query.toLowerCase()) ||
          type.toLowerCase().includes(query.toLowerCase())
        );
      }
    
   
      if (selected && selected !== "All Products") {
        filteredProduct = filteredProduct.filter(
          ({ category, color, company, newprice, title, type }) =>
            category === selected ||
            color === selected ||
            company === selected ||
            newprice === selected ||
            title === selected ||
            type === selected
        );
      }
    
     
      return filteredProduct.map(({ img, title, star, reviews, prevPrice, newPrice }, index) => (
        <Cart
          key={index}  
          img={img}
          title={title}
          star={star}
          reviews={reviews}
          newPrice={newPrice}
          prevPrice={prevPrice}
        />
      ));
    }
    

    const result = filteredData(Data, selectedCategory, query);
    
  return (
    <div style={{backgroundColor:""}}>
        <Sidebar handlechange={handlechange}/>  
        <Nav query={query} handleinputchange={handleinputchange}/>
        <Recommand handleclick={handleclick}/>
        <Product  result={result}/>
      
    </div>
  )
}

export default Applite
