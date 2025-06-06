

const CategoryForm = ({value, setValue, handleSubmit, buttonText = 'Submit', handleDelete}) => {
  return (
    <div className="p-3">
        <form  onSubmit={handleSubmit} className="space-y-3 ">
            <input type="text" className="py-3 px-4 border rounded-lg w-full"
            placeholder="Write category name" value={value} onChange={e => setValue(e.target.value) } />
            <div className="flex justify-between">
                <button className="bg-gray-800 text-white py-2 px-4 
                rounded-lg hover:bg-black focus:outline-none 
                focus:ring-2 focus:ring-gray-800 
                focus:ring-opacity-50">{buttonText}</button>
                {handleDelete && (
                    <button onClick={handleDelete} className="bg-red-700 text-white py-2 px-4 rounded-lg hover:bg-red-600
                    focus:outline-none focus:ring-2 focus: ring-red-800 focus:ring-opacity-50 ">
                        Delete  
                    </button>
                )}

            </div>
            
        </form>
    </div>
  )
}

export default CategoryForm