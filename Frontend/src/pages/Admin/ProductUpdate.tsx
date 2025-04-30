import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router"
import {
    useUpdateProductMutation,
    useDeleteProductMutation,
    useGetProductByIdQuery,
    useUploadProductImageMutation
} from "../../redux/api/productApiSlice"
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice"
import { toast } from "react-toastify"
import AdminMenu from "./AdminMenu"



const ProductUpdate = () => {
    const params = useParams();

    const {data: productData} = useGetProductByIdQuery(params._id)
    const [image, setImage] = useState(productData?.image || "")
    const [name, setName] = useState(productData?.name || "")
    const [description, setDescription] = useState(productData?.description || "");
    const [price, setPrice] = useState(productData?.price || "");
    const [category, setCategory] = useState(productData?.category || "");
    const [quantity, setQuantity] = useState(productData?.quantity || "");
    const [brand, setBrand] = useState(productData?.brand || "");
    const [stock, setStock] = useState(productData?.countInStock);

    const navigate = useNavigate();

    const {data: categories = []} = useFetchCategoriesQuery({});

    const [uploadProductImage] = useUploadProductImageMutation();
    const [updateProduct] = useUpdateProductMutation();
    const [deleteProduct] = useDeleteProductMutation();

    useEffect(()=>{
        if(productData && productData._id){
            setName(productData.name);
            setDescription(productData.description);
            setPrice(productData.price);
            setCategory(productData.category?._id);
            setQuantity(productData.quantity);
            setBrand(productData.brand);
            setImage(productData.image);
        }
    },[productData])

    const uploadFileHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const formData = new FormData()
      if (e.target.files && e.target.files[0]) {
        formData.append('image', e.target.files[0]);
      } else {
        toast.error("No file selected", {
          position: "top-right",
          autoClose: 2000,
        });
        return;
      }
      try{
        const res = await uploadProductImage(formData).unwrap();
        toast.success("Item added successfully",{
          position: "top-right",
          autoClose: 2000
        });
        setImage(res.image);
      }catch(err){
        console.log(err)
        toast.error("Image upload failed",{
          position: "top-right",
          autoClose: 2000
        })
      }
    }
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const formData = new FormData();
        formData.append("image", image);
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("category", category);
        formData.append("quantity", quantity);
        formData.append("brand", brand);
        formData.append("countInStock", stock);
  
        // Update product using the RTK Query mutation
        const data = await updateProduct({ productId: params._id, formData });
  
        if (data?.error) {
          const errorMessage = (data.error as { data?: { message?: string }; error?: string })?.data?.message || (data.error as { error?: string })?.error || "An unexpected error occurred.";
          toast.error(errorMessage, {
            position: "top-right",
            autoClose: 2000,
          });
        } else {
          toast.success(`Product successfully updated`, {
            position: "top-right",
            autoClose: 2000,
          });
          navigate("/admin/allproductslist");
        }
      } catch (err) {
        console.log(err);
        toast.error("Product update failed. Try again.", {
          position: "top-right",
          autoClose: 2000,
        });
      }
    };
    const handleDelete = async () => {
      try {
        const answer = window.confirm(
          "Are you sure you want to delete this product?"
        );
        if (!answer) return;
  
        const { data } = await deleteProduct(params._id);
        toast.success(`"${data.name}" is deleted`, {
          position: "top-right",
          autoClose: 2000,
        });
        navigate("/admin/allproductslist");
      } catch (err) {
        console.log(err);
        toast.error("Delete failed. Try again.", {
          position: "top-right",
          autoClose: 2000,
        });
      }
    };



  return (
    <div>
      <div className="container xl:mx-[9rem] sm:mx-[0]">
        <div className="flex flex-col md:flex-row">
          <AdminMenu/>
          <div className="md:w-3/4 p-3">
          <div className="h-12">Update/Delete Product</div>
          {
            image && (
              <img
                src={image}
                alt="product"
                className="block mx-auto w-full h-[40%]"
              />
            )
          }
          <div className="mb-3">
              <label className="text-black px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
                {image ? image.name : "Upload image"}
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={uploadFileHandler}
                  className="text-black"
                />
              </label>
            </div>
            <div className="p-3">
              <div className="flex flex-wrap">
                <div className="one">
                  <label htmlFor="name">Name</label> <br/>
                  <input type="text"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-white text-black mr-[5rem]"
                  value={name}
                  onChange={(e) => setName(e.target.value)} 
                  />
                </div>
                <div className="two">
                  <label htmlFor="name block">Price</label> <br/>
                  <input type="number"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-white text-black " 
                  value={price}
                  onChange={(e)=>setPrice(e.target.value)}
                  />
                </div>

              </div>
              <div className="flex flex-wrap">
                <div>
                  <label htmlFor="name block">Quantity</label> <br/>
                  <input type="number"
                  min="1"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-white text-black mr-[5rem]"
                  value={quantity}
                  onChange={(e)=>setQuantity(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="name block">Brand</label> <br />
                  <input
                    type="text"
                    className="p-4 mb-3 w-[30rem] border rounded-lg bg-white text-black "
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </div>

              </div>
              <label htmlFor="" className="my-5">
                Description
              </label>
              <textarea
                className="p-2 mb-3 bg-white  border rounded-lg w-[95%] text-black"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
               <div className="flex justify-between">
                <div>
                  <label htmlFor="name block">Count In Stock</label> <br />
                  <input
                    type="text"
                    className="p-4 mb-3 w-[30rem] border rounded-lg bg-white text-black "
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="">Category</label> <br />
                  <select
                    className="p-4 mb-3 w-[30rem] border rounded-lg bg-white text-black mr-[5rem]"
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                  >
                    <option value="" disabled>
                      Choose Category
                    </option>
                    {categories?.map((c: { _id: string; name: string }) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="">
                <button
                onClick={handleSubmit}
                className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-green-600 mr-6"
                >
                  Update
                </button>
                <button
                onClick={handleDelete}
                className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-red-600"
                >
                  Delete
                </button>
              </div>


            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default ProductUpdate