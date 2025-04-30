
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Route,RouterProvider, createRoutesFromElements } from 'react-router'
import { createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store.ts'

//Private Route
import PrivateRoute from './components/PrivateRoute.tsx'
import Profile from './pages/User/Profile.tsx'

//Auth
import Login from './pages/Auth/Login.tsx'
import Register from './pages/Auth/Register.tsx'
import Home from './pages/Home.tsx'


import Cart from './pages/Cart.tsx'
import Shop from './pages/Shop.tsx'
import AdminRoute from './pages/Admin/AdminRoute.tsx'
import UserList from './pages/Admin/UserList.tsx'
import Favorites from './pages/Products/Favorites.tsx'
import CategoryList from './pages/Admin/CategoryList.tsx'
import ProductList from './pages/Admin/ProductList.tsx'
import ProductUpdate from './pages/Admin/ProductUpdate.tsx'
import AllProducts from './pages/Admin/AllProducts.tsx'
import ProductDetails from './pages/Products/ProductDetails.tsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route index={true} path='/' element={<Home/>}/>
      <Route path='/favorite' element={<Favorites/>}/>
      <Route path='/product/:id' element={<ProductDetails/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/shop' element={<Shop/>}/>
      <Route path=''element={<PrivateRoute/>}>
      <Route path='/profile' element={<Profile/>}/>
      </Route>
      <Route path='/admin' element={<AdminRoute/>}>
      <Route path='userlist' element={<UserList/>}/>
      <Route path='categorylist' element={<CategoryList/>}/>
      <Route path='productlist' element={<ProductList/>}/>
      <Route path='product/update/:_id' element={<ProductUpdate/>}/>
      <Route path='allproductslist' element={<AllProducts/>}/>
      </Route>
    </Route>
  )
);


createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
    
  
)
