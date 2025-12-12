import { createRoot } from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import AddHouse from "./pages/AddHouse"
import HouseDetails from "./pages/HouseDetails"
import "./index.css"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add" element={<AddHouse />} />
        <Route path="/houses/:id" element={<HouseDetails />} />
      </Routes>
    </BrowserRouter>
  )
}

createRoot(document.getElementById("root")).render(<App />)
