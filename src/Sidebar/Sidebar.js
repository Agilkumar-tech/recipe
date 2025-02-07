import "./Sidebar.css"
import Category from "./Category/Category"



function Sidebar({handlechange}) {

  return (
    <>
    <section className="sidebar">
        <div className="logo-container">
        </div>
        <Category handlechange={handlechange}/>
    </section>
    </>
  )
}

export default Sidebar
