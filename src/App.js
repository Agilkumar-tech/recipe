import Applite from './Applite';
import { Route,Routes } from 'react-router-dom';
import Storage from './Component/Storage';
// import Productdetails from './Component/Productdetails';
// import Popupbox from './Component/Popupbox';
import Order from './order/Order';
function App() {
  return (
    <div className="App">
     <Routes>
     <Route path="/" element={<Applite/>}/> 
      <Route path='/src/Component/Storage' element={<Storage/>}/>
      <Route path='/Order' element={<Order/>}/>
     </Routes>
     
    </div>
  );
}

export default App;
