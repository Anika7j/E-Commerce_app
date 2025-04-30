// Add a product to a localStorage
export const addFavoriteToLocalStorage = (product: { _id: string }) => {
    const favorites: { _id: string }[] = getFavoritesFromLocalStorage();
    if (!favorites.some((p: { _id: string }) => p._id === product._id)) {
      favorites.push(product);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  };
  
  // Remove  product from a localStorage
  export const removeFavoriteFromLocalStorage = (productId: string) => {
    const favorites = getFavoritesFromLocalStorage();
    const updateFavorites = favorites.filter(
      (product: { _id: string }) => product._id !== productId
    );
  
    localStorage.setItem("favorites", JSON.stringify(updateFavorites));
  };
  
  // Retrive favorites from a localStorage
  export const getFavoritesFromLocalStorage = () => {
    const favoritesJSON = localStorage.getItem("favorites");
    return favoritesJSON ? JSON.parse(favoritesJSON) : [];
  };