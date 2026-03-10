import { BrowserRouter, Route, Routes } from "react-router";
import Admin from "./admin/Admin";

import Signup from "./admin/signup/page";
import Login from "./admin/Login/Login";
import Home from "./Home";


function App() {
  return (
      <div className="mFin-h-screen flex justify-center">
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
     
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      {/* <Route path="regadress" element={<AdressForm/>}/> */}
    </Routes>
    </BrowserRouter></div>
  );
}

export default App;
