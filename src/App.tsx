import { BrowserRouter, Route, Routes } from "react-router";
import Admin from "./admin/Admin";
import Login from "./admin/login/page";
import Signup from "./admin/signup/page";
import AdressForm from "./admin/UserRegister/AdressForm";

function App() {
  return (
      <div className="mFin-h-screen flex justify-center">
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Admin/>}/>
     
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="regadress" element={<AdressForm/>}/>
    </Routes>
    </BrowserRouter></div>
  );
}

export default App;
