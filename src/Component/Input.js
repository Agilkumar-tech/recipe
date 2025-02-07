
function Input({handlechange,value,title,name,color}) {
  return (
    <label className='sidebar-lable-container'>
   {title}
    <input onChange={handlechange} value={value} type='radio' name={name}/>
    <span className='=checkmark' style={{backgroundColor:color}}></span>
    </label>
  )
}

export default Input
