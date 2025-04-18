import Category from '../models/categoryModel.js';
import asyncHandler from '../middlewares/asyncHandler.js';



const createCategory = asyncHandler(async (req,res) => {
    try{
        const {name} = req.body;
        if(!name){
            return res.json({error:"Name is required"})
        }
        const alreadyExist = await Category.findOne({name});

        if(alreadyExist){
            return res.json({error: "Already exists"});
        }
        const category = await new Category({name}).save();
        res.json(category)


    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }

})


const updateCategory = asyncHandler(async(req,res)=>{
    
    try{
        const {Id} = req.params;
        const {name} = req.body;
        
        const category = await Category.findOne({_id:Id});

        if(!category){
            return res.status(404).json({error: "Category not found"})

        }
        category.name = name;
        
        const updatedCategory = await category.save();
        res.json(updatedCategory);

    } catch (error){
        console.log(error)
        res.status(500).json({error:"Intermal Server error"})
    }
})

const deleteCategory = asyncHandler(async(req,res)=>{
    
    try{
        const {Id} = req.params;
        const deleted = await Category.findByIdAndDelete(Id)
        res.json({message: "Deleted successfully"})
        
    } catch(error){
        res.status.json({error:"Internal server error"})
    }
})

const categoryList = asyncHandler(async(req,res)=>{
    try{
        const list = await Category.find({});
        res.json(list)
    } catch (error){
        res.status.json({error: "Internal server error"})
    }
})

const getCategory = asyncHandler(async(req,res)=>{
    try{
        const {Id} = req.params;
        const category = await Category.findOne({_id:Id})
        res.json(category)

    } catch (error){
        res.status.json({error:"Internal server error"})
    }
})

export {createCategory,updateCategory,deleteCategory,categoryList,getCategory}


