import { useState, useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { Link, useLocation, useNavigate} from "react-router-dom";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setCredientials } from "../../redux/features/auth/authSlice";
import {toast} from 'react-toastify'
import Loader from "../../components/Loader";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [login,{isLoading}] = useLoginMutation()

    interface AuthState {
        userInfo: {
            id: string;
            name: string;
            email: string;
            password:string;
            token: string;
        } | null;
    }

    const {userInfo} = useSelector((state: { auth: AuthState }) => state.auth)

    const {search} = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/'

    useEffect(()=>{
        if(userInfo){
            navigate(redirect)
        }
    },[navigate,redirect,userInfo])

    

    interface LoginError {
        data?: {
            message?: string;
        };
        message?: string;
    }

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const res = await login({ email, password }).unwrap();
            console.log(res);
            dispatch(setCredientials({...res}));
            navigate(redirect);
        } catch (error) {
            toast.error((error as LoginError)?.data?.message || (error as LoginError)?.message);
        }
    };

  return (
   
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                Sign In
            </h2>
            </div>
    
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={submitHandler} method="POST" className="space-y-6">
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
                <button
                    disabled={isLoading}
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-gray-900 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-black cursor-pointer"
                >
                    {isLoading ? "Signing In..." : "Sign In"}
                </button>
                {isLoading && <Loader/>}
                </div>
            </form>
            <p className="mt-4">New Customer ? {" "}
                <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} className="text-black hover:underline">Register</Link>
            </p>
            
            </div>
        </div>
        
       
      
  )
}

export default Login;