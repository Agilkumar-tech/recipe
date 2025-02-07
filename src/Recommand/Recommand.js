import "./Recommand.css"
import Button from "../Component/Button"
function Recommand({handleclick}) {
  return (
     <>
     <div >
      <h2 className="recommended-title">Recommended</h2>
      <div className="recommended-flex">
        <Button
         handleclick={handleclick}
         value="All Products"
         title="All Products"
         className="btns"
        />
         <Button
         handleclick={handleclick}
         value="Rice"
         title="Rice"
         className="btns"
        />
         <Button
         handleclick={handleclick}
         value="cake"
         title="cake"
         className="btns"
        />
         <Button
         handleclick={handleclick}
         value="juice"
         title="juice"
         className="btns"
        />
         <Button
         handleclick={handleclick}
         value="Pizza"
         title="Pizza"
         className="btns"
        />
       <Button
         handleclick={handleclick}
         value="Beef"
         title="Beef"
         className="btns"
        />
         <Button
        handleclick={handleclick}
        value="salad"
        title="salad"
        className="btns"
       />
       <Button
        handleclick={handleclick}
        value="Gravy"
        title="Gravy"
        className="btns"
       />
       <Button
        handleclick={handleclick}
        value="Noodels"
        title="Noodels"
        className="btns"
       />
      </div>
     </div>
     </>
  )
}

export default Recommand
