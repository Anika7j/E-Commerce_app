import { useSelector, UseSelector } from "react-redux"



const FavoritesCount = () => {
    const favorites = useSelector((state)=>state.favorites);
    const favoriteCount = favorites.length

  return (
    <div className="absolute left-2 top-8">
        {favoriteCount > 0 && (
            <span className="px-1 py-0 text-white bg-red-700 rounded-full">
                {favoriteCount}
            </span>
        )}

    </div>
  )
}

export default FavoritesCount;