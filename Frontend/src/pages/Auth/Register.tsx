import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router"
import { useDispatch, UseDispatch, useSelector } from "react-redux"
import Loader from "../../components/Loader"
import { setCredientials } from "../../redux/features/auth/authSlice"
import {toast} from "react-toastify"
import { useRegisterMutation } from "../../redux/api/usersApiSlice"



const Register = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");


    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [register, {isLoading}] = useRegisterMutation()
    const {userInfo} = useSelector(state => state.auth)

    const {search} = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/'

    useEffect(()=>{
        if(userInfo){
            navigate(redirect)
        }
    },[navigate, redirect, userInfo])

    const submitHandler = async (e) => {
        e.preventDefault()
        
        if(password != confirmPassword){
            toast.error('Passwords do not match')
        }else{
            try{
                const res = await register({name,email,password}).unwrap()
                dispatch(setCredientials({...res}))
                navigate(redirect)
                toast.success('User successfully registered');
            }catch(error){
                console.log(error)
                toast.error(error.data.message)
            }
        }
    }


  return (
   
    <div className=" flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                Register
            </h2>
            </div>
    
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
            <form onSubmit={submitHandler}  method="POST" className="space-y-6">
                <div>
                <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                    Name
                </label>
                <div className="mt-2">
                    <input
                    id="name"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    type="name"
                    required
                    autoComplete="name"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6"
                    />
                </div>
                </div>
                
                
                <div>
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                    Email
                </label>
                <div className="mt-2">
                    <input
                    id="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    type="email"
                    required
                    autoComplete="email"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6"
                    />
                </div>
                </div>

                

                <div>
                <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                    Password
                    </label>
                    <div className="text-sm">
                    </div>
                </div>
                <div className="mt-2">
                    <input
                    id="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    type="password"
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6"
                    />
                </div>
                </div>

                <div>
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                    Confirm Password
                </label>
                <div className="mt-2">
                    <input
                    id="password"
                    value={confirmPassword}
                    onChange={(e)=>setconfirmPassword(e.target.value)}
                    type="password"
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6"
                    />
                </div>
                </div>
    
                <div>
                <button
                    disabled={isLoading}
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-gray-900 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-black cursor-pointer"
                >
                    {isLoading ? "Registering..." : "Register"}
                </button>
                {isLoading && <Loader/>}
                </div>
            </form>
            <p className="mt-4">Already have an account ? {" "}
                <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className="text-black hover:underline">Login</Link>
            </p>
            
            </div>
        </div>
  )
}

export default Register