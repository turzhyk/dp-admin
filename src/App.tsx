import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Admin from "./admin/Admin";
import Login from "./admin/login/page";

function App() {
  return (
       <div className="min-h-screen flex justify-center">
      <Login />
    </div>
  );
}

export default App;
