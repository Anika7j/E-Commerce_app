import { FaHeart, FaRegHeart } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { addToFavorites, removeFromFavorites,setFavorites } from "../../redux/features/favorites/favoriteSlice"
import { addFavoriteToLocalStorage, getFavoritesFromLocalStorage, removeFavoriteFromLocalStorage } from "../../Utils/localStorage"
import { useEffect } from "react"


interface Product {
    _id: string;
    [key: string]: unknown; 
}

const HeartIcon = ({ product }: { product: Product }) => {
    const dispatch = useDispatch()
    const favorites = useSelector((state: { favorites: Product[] }) => state.favorites) || [];
    const isFavorite = favorites.some((p)=> p._id === product._id);

    useEffect(() => {
        const favoritesFromLocalStorage = getFavoritesFromLocalStorage();
        dispatch(setFavorites(favoritesFromLocalStorage));
      }, []);
    const toogleFavorites = () => {
        if(isFavorite){
            dispatch(removeFromFavorites(product));
            removeFavoriteFromLocalStorage(product._id);

        }else{
            dispatch(addToFavorites(product));
            addFavoriteToLocalStorage(product);
        }
    }



  return (
    <div className="absolute top-2 right-5 cursor-pointer"
    onClick={toogleFavorites}
    >
        {isFavorite ? (
            <FaHeart className="text-red-600"/>
        ):(
            <FaRegHeart className="text-black"/>
        )}

    </div>
  )
}

export default HeartIcon