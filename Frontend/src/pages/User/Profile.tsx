import { useEffect, useState } from "react"
import { useDispatch, UseDispatch,useSelector } from "react-redux"
import {toast} from 'react-toastify'
import Loader from "../../components/Loader"
import { setCredientials } from "../../redux/features/auth/authSlice"
import { Link } from "react-router"
import { useProfileMutation } from "../../redux/api/usersApiSlice"


const Profile = () => {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setconfirmPassword] = useState("");

    const {userInfo} = useSelector(state => state.auth)

    const [updateProfile, {isLoading: loadingUpdateProfile}] = useProfileMutation()

    useEffect(()=>{
        setName(userInfo.name);
        setEmail(userInfo.email);
    },[userInfo.email, userInfo.name])

    const dispatch = useDispatch();

    const submitHandler = async (e) => {
        e.preventDefault()

        if(password != confirmPassword){
            toast.error("Passwords do not match")
        }else{
            try{
                const res = await updateProfile({_id:userInfo._id, name, email, password}).unwrap();
                dispatch(setCredientials({...res}))
                toast.success("Profile Updated successfully!")
            }catch (error){
                toast.error(error?.data?.message || error.message)
            }
        }
    }




  return (
    <div className=" flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
        Update Profile
    </h2>
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
    <form onSubmit={submitHandler} className="space-y-6">
        <div>
        <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
            Name
        </label>
        <div className="mt-2">
            <input
            id="name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            type="text"
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
            autoComplete="current-password"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6"
            />
        </div>
        </div>

        <div className="flex justify-between">
        <button
            
            type="submit"
            className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-black"
        >Update
            
        </button> 
        <Link to='/user-orders' className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-black"> My Orders</Link>
        </div>
    </form>
     {loadingUpdateProfile && <Loader/>}
    
    </div>
</div>
  )
}

export default Profile