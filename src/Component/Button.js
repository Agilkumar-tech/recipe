import "../Component/Button.css"
function Button({handleclick,title,value}) {
  return (
    <div>
      <button onClick={handleclick} value={value} className="btns">{title}</button>
    </div>
  )
}

export default Button
