import React from 'react'

const InputField = ({lable, type}) => {
  return (
    <div >
        <label style={{display:"flex"}}>{lable}</label>
        <input type={type} style={{display:"flex",marginLeft:"100px"}}></input>
    </div>
  )
}

export default InputField
