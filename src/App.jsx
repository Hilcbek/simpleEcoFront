import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./Pages/Home";
import Nav from "../components/Nav";
import { Register } from "../components/Register";
import { Login } from "../components/Login";
import { Toaster } from "react-hot-toast";
import { CartModal } from "./Modal/CartModal";
import useCartModalHook from "../Hooks/useCartModalHook";
import { Success } from "./Pages/Success";
import { useSelector } from "react-redux";
// import { Cancel } from "./Pages/Cancel";
function App() {
    let cartModal = useCartModalHook();
    let { username} = useSelector((state) => state.user)
  return (
    <div className="font-Nunito font-semibold w-11/12 mx-auto">
      <BrowserRouter>
        <Toaster
          position="top-center"
          containerStyle={{ marginTop: "100px" }}
        />
        <CartModal open={cartModal.open} />
        <Register />
        <Login />
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/success" element={username && <Success />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
