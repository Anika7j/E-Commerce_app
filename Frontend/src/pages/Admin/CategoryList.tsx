import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesQuery,
  useUpdateCategoryMutation,
} from "../../redux/api/categoryApiSlice";
import CategoryForm from "../../components/CategoryForm";
import Modal from "../../components/Modal";

// Define a type for the category object
interface Category {
  _id: string;
  name: string;
}

const CategoryList = () => {
  const { data: categories,refetch, isLoading, error } = useFetchCategoriesQuery({});
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [updateName, setUpdateName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  useEffect(()=>{
    refetch();
  },[refetch])

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name) {
      toast.error("Category name is required");
      return;
    }

    try {
      const result = await createCategory({ name }).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        setName("");
        toast.success(`${result.name} is created.`);
        refetch();
      }
    } catch (error) {
      console.log(error);
      toast.error("Creating category failed, try again.");
    }
  };

  const handleUpdateCategory = async (e: React.FormEvent)=>{
    e.preventDefault()
    if(!updateName){
        toast.error('Category name is required')
        return;
    }
    try {
        const result = await updateCategory({Id: selectedCategory?._id, updatedCategory:{
            name: updateName
        }}).unwrap()
        if(result.error){
            toast.error(result.error)
        }else{
            toast.success(`${result.name} is updated`)
            refetch();
            setSelectedCategory(null)
            setUpdateName('')
            setModalVisible(false);
        }
    } catch (error) {
        console.log(error)
    }

  }

  const handleDeleteCategory = async () => {
    try{
        const result = await deleteCategory({Id:selectedCategory?._id}).unwrap()
        if(result.error){
            toast.error(result.error)
        }else{
            toast.success(`${selectedCategory?.name || "Category"} is deleted.`)
            refetch();
            setSelectedCategory(null)
            setModalVisible(false)

        }
    }catch (error) {
        console.log(error)
        toast.error('category deletion falied. try again')
    }
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching categories.</div>;

  return (
    <div className="ml-[10rem] flex flex-col md:flex-row">
      <div className="md:w-3/4 p-3">
        <div className="h-12">Manage Categories</div>
        <CategoryForm value={name} setValue={setName} handleSubmit={handleCreateCategory} />
        <br />
        <hr />
        <div className="flex flex-wrap">
          {categories?.map((category: Category) => (
            <div key={category._id}>
              <button
                className="bg-white border border-gray-800 text-gray-600 py-2 px-4 rounded-lg m-3 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                onClick={() => {
                  setModalVisible(true);
                  setSelectedCategory(category);
                  setUpdateName(category.name);
                }}
              >
                {category.name}
              </button>
            </div>
          ))}
        </div>
        <Modal isOpen={modalVisible} onClose={()=> setModalVisible(false)}>
            <CategoryForm value={updateName} setValue={(value:string) => setUpdateName(value)} handleSubmit={handleUpdateCategory}
                buttonText="Update" handleDelete={handleDeleteCategory}/>
        </Modal>
      </div>
    </div>
  );
};

export default CategoryList;