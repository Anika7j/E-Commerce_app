import { useState } from "react";
import {AiOutlineHome, AiOutlineShopping, AiOutlineLogin, AiOutlineUserAdd, AiOutlineShoppingCart} from "react-icons/ai";
import {FaChevronDown, FaHeart} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./Navigation.css"
import { useSelector,useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";

export default function Navigation() {
    const {userInfo} = useSelector(state => state.auth)
    const [showSidebar, setShowSidebar] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    }
    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    }
    const closeSidebar = () => {
        setShowSidebar(false);
    }
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    
    const [loginApiCall] = useLogoutMutation()

    const logoutHandler = async () => {
        try{
            await loginApiCall({}).unwrap()
            dispatch(logout())
            navigate('/login')
        }catch(error){
            console.log(error)
        }
    }
  
  
 return (
    <div style={{zIndex: 999}} className={`${showSidebar ? "hidden":"flex"} xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-black w-[4%] hover:w-[15%] h-[100vh] fixed `} id="navigation-container">
        <div className="flex flex-col justify-center space-y-4">
        <Link to="/" className="flex items-center transition-transform transform hover:translate-x-2">
        <AiOutlineHome className="mr-2 mt-[3rem]" size={26} onClick={closeSidebar}/>
        <span className="hidden nav-item-name mt-[3rem]">HOME</span>
        </Link>
        <Link to="/shop" className="flex items-center transition-transform transform hover:translate-x-2">
        <AiOutlineShopping className="mr-2 mt-[3rem]" size={26} onClick={closeSidebar}/>
        <span className="hidden nav-item-name mt-[3rem]">SHOP</span>
        </Link>
        <Link to="/cart" className="flex items-center transition-transform transform hover:translate-x-2">
        <AiOutlineShoppingCart className="mr-2 mt-[3rem]" size={26} onClick={closeSidebar}/>
        <span className="hidden nav-item-name mt-[3rem]">CART</span>
        </Link>
        <Link to="/favourite" className="flex items-center transition-transform transform hover:translate-x-2">
        <FaHeart className="mr-2 mt-[3rem]" size={26} onClick={closeSidebar}/>
        <span className="hidden nav-item-name mt-[3rem]">Favourite</span>
        </Link>
        </div>
        <div className="realtive">
        <button
            onClick={toggleDropdown}
            className="flex items-center text-gray-700 focus:outline-none w-full"
          >
            {userInfo ? (
              <span className="text-white">{userInfo.name}</span>
            ) : (
              <></>
            )}
            {userInfo ? (
              <FaChevronDown
                className={`text-white ml-1 duration-500 ${
                  dropdownOpen ? "transform -rotate-180" : ""
                }`}
              />
            ) : (
              <></>
            )}
          </button>
            {dropdownOpen && userInfo && (
                <ul className={`absoulte right-0 mt-2 mr-14 space-y-2 bg-white text-gray-600 ${!userInfo.isAdmin ? '-top-20' : '-top-80'}`}>
                   {userInfo.isAdmin && (
                    <>
                    <li>
                        <Link 
                        to='/admin/dashboard' 
                        className="block px-4 py-2 hover:bg-gray-100">
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link 
                        to='/admin/productlist' 
                        className="block px-4 py-2 hover:bg-gray-100">
                            Products
                        </Link>
                    </li>
                    <li>
                        <Link 
                        to='/admin/categorylist' 
                        className="block px-4 py-2 hover:bg-gray-100">
                            Category
                        </Link>
                    </li>
                    <li>
                        <Link 
                        to='/admin/orderlist' 
                        className="block px-4 py-2 hover:bg-gray-100">
                            Orders
                        </Link>
                    </li>
                    <li>
                        <Link 
                        to='/admin/userlist' 
                        className="block px-4 py-2 hover:bg-gray-100">
                            Users
                        </Link>
                    </li>
                    <li>
                        <Link 
                        to='/admin/profile' 
                        className="block px-4 py-2 hover:bg-gray-100">
                            Profile
                        </Link>
                    </li>
                    <li>
                        <Link 
                        to='/admin/logout'
                        onClick={logoutHandler} 
                        className="block px-4 py-2 hover:bg-gray-100">
                            Logout
                        </Link>
                    </li>
                    </>
                   )}
                   <li>
                        <Link 
                        to='/profile' 
                        className="block px-4 py-2 hover:bg-gray-100">
                            Profile
                        </Link>
                    </li>
                    <li>
                        <Link 
                        to='/logout'
                        onClick={logoutHandler} 
                        className="block px-4 py-2 text-left hover:bg-gray-100">
                            Logout
                        </Link>
                    </li>
                </ul>
            )
                    }        
            </div>
            {!userInfo && (
                <ul>
            <li>
                <Link to="/login" className="flex items-center transition-transform transform hover:translate-x-2">
                <AiOutlineLogin className="mr-2 mt-[3rem]" size={26} onClick={closeSidebar}/>
                <span className="hidden nav-item-name mt-[3rem]">Login</span>
                </Link>
            </li>
            <li>
                <Link to="/register" className="flex items-center transition-transform transform hover:translate-x-2">
                <AiOutlineUserAdd className="mr-2 mt-[3rem]" size={26} onClick={closeSidebar}/>
                <span className="hidden nav-item-name mt-[3rem]">Register</span>
                </Link>
            </li>

        </ul>
        )}

        
        
        
    </div>
  )
} 
