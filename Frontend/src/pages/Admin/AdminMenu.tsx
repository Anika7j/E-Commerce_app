import { useState } from "react"
import { NavLink } from "react-router-dom"
import { FaTimes } from "react-icons/fa"

const AdminMenu = () => {
    const [isMenuOpen,setIsMenuOpen] = useState(false);

    const toogleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }
  return (
    <div>
        <button className={`${isMenuOpen ? "top-2 right-2": "top-5 right-7"} bg-white p-2 fixed rounded-lg` } onClick={toogleMenu}>{isMenuOpen ? (<FaTimes color="black"/>):(
            <>
            <div className="w-6 h-0.5 bg-black my-1"></div>
            <div className="w-6 h-0.5 bg-black my-1"></div>
            <div className="w-6 h-0.5 bg-black my-1"></div>
            </>
        )}</button>

        {isMenuOpen && (
            <section className="bg-black p-4 fixed right-7 top-5">
                <ul className="list-none mt-2">
                    <li>
                        <NavLink className="list-item py-2 px-3 block mb-5 hover:bg-[#2E2D2D] rounded-sm" 
                        to="/admin/dashboard"
                        style={({isActive})=>({
                            color: isActive ? "greenyellow" : "white",
                        })}
                        > Admin Dashboard</NavLink>
                    </li>
                    <li>
                        <NavLink
                        className="list-item py-2 px-3 block mb-5 hover:bg-[#2E2D2D] rounded-sm"
                        to="/admin/categorylist"
                        style={({ isActive }) => ({
                        color: isActive ? "greenyellow" : "white",
                        })}
                        >Create Category
                        </NavLink>
                    </li>
                    <li>
                    <NavLink
                        className="list-item py-2 px-3 block mb-5 hover:bg-[#2E2D2D] rounded-sm"
                        to="/admin/productlist"
                        style={({ isActive }) => ({
                        color: isActive ? "greenyellow" : "white",
                        })}
                    >
                        Create Product
                    </NavLink>
                    </li>
                    <li>
                    <NavLink
                        className="list-item py-2 px-3 block mb-5 hover:bg-[#2E2D2D] rounded-sm"
                        to="/admin/allproductslist"
                        style={({ isActive }) => ({
                        color: isActive ? "greenyellow" : "white",
                        })}
                    >
                        All Products
                    </NavLink>
                    </li>
                    <li>
                        <NavLink
                        className="list-item py-2 px-3 block mb-5 hover:bg-[#2E2D2D] rounded-sm"
                        to="/admin/userlist"
                        style={({ isActive }) => ({
                        color: isActive ? "greenyellow" : "white",
                        })}
                        >Manage Users
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="list-item py-2 px-3 block mb-5 hover:bg-[#2E2D2D] rounded-sm"
                            to="/admin/orderlist"
                            style={({ isActive }) => ({
                            color: isActive ? "greenyellow" : "white",
                            })}
                        >Manage Orders
                        </NavLink>
                    </li>
                </ul>
            </section>
        )}
    </div>
  )
}

export default AdminMenu