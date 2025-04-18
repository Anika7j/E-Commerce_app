import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";


const addProduct = asyncHandler(async(req,res)=>{
    try{
        const {name, description, price, category, quantity, brand,image} = req.fields
       

        switch (true){
            case !name :
                return res.json({error: "Name is required"})
            case !description :
                return res.json({error: "description is required"})
            case !price :
                return res.json({error: "price is required"})
            case !category :
                return res.json({error: "category is required"})
            case !quantity :
                return res.json({error: "quantity is required"})
            case !brand :
                return res.json({error: "brand is required"})

        }

        const product = new Product({name:name,
            description:description,
            price:price,
            category:category,
            quantity:quantity,
            brand:brand,
            image:image
        })
        await product.save();
        res.json(product);




    }catch(error){
        console.error(error)
        res.status(400).json(error.message)
    }

})


const updateProduct = asyncHandler(async(req,res)=>{
    try{
        const {name, description, price, category, quantity, brand,image} = req.fields
       

        switch (true){
            case !name :
                return res.json({error: "Name is required"})
            case !description :
                return res.json({error: "description is required"})
            case !price :
                return res.json({error: "price is required"})
            case !category :
                return res.json({error: "category is required"})
            case !quantity :
                return res.json({error: "quantity is required"})
            case !brand :
                return res.json({error: "brand is required"})

        }
        const product = await Product.findByIdAndUpdate(req.params.id,{...req.fields},{new:true})
        await product.save();
        res.json(product)

    }catch(error){
        console.error(error)
        res.status(400).json(error.message)

    }
})
const deleteproduct = asyncHandler(async(req,res)=>{
    try {
        const remove = await Product.findByIdAndDelete(req.params.id)
        res.json(remove);

    } catch (error) {
        console.log(error)
        res.status(500).json({error: "server error"})
        
    }

})

const allProducts = asyncHandler(async(req,res)=>{
    try{
        const pageSize = 6;
        const keyword = req.query.keyword ? {name:{$regex: req.query.keyword, $options: "i"}}:{}
        const count = await Product.countDocuments({...keyword})
        const products = await Product.find({...keyword}).limit(pageSize);
        res.json({
            products,
            page:1,
            pages: Math.ceil(count/pageSize),
            hasMore: false,
        });

    } catch (error){
        console.log(error)
        res.status(500).json({error: "Server error"})
    }

})
const getProductById = asyncHandler(async(req,res)=>{
    try{
        const product = await Product.findById(req.params.id)
        if(!product){
            res.status(404);
            throw new Error("Product not found")
        }
        res.json(product)

    } catch (error) {
        console.log(error)
        res.status(500).json({error:"Internal server error"})
    }
})
const fetchAllProducts = asyncHandler(async(req,res)=>{
    try{
        const products = await Product.find({}).populate('category').limit(12).sort({createAt: -1})
        res.json(products)

    } catch(error){
        console.error(error)
        res.status(500).json({error:"Server error"})
    }

})
const addProductReview =  asyncHandler(async(req,res)=>{
    try {
        const {rating, comment} = req.body;
        const product = await Product.findById(req.params.id)
        if(product){
            const alreadyReviewed = product.reviews.find((r)=>r.user.toString()=== r.user._id.toString())
            if(alreadyReviewed){
                res.status(400)
                throw new Error("Product already reviewed")
            }
            const review = {
                name: req.user.name,
                rating: Number(rating),
                comment,
                user: req.user._id
            };
            product.reviews.push(review);
            product.numReviews = product.reviews.length;

            product.rating =
            product.reviews.reduce((acc, item) => item.rating + acc, 0) /
            product.reviews.length;
    
          await product.save();
          res.status(201).json({ message: "Review added" });

        }else{
            res.status(404);
            throw new Error("Product not found");
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({error:"Server error"})   
    }

})
const fetchTopProducts = asyncHandler(async(req,res)=>{
    try {
        const products = await Product.find({}).sort({rating: -1}).limit(4)
        res.json(products)
    } catch (error) {
        console.error(error)
        res.status(500).json({error:"Server error"})
    }
})

const newProducts = asyncHandler(async(req,res)=>{
    try {
        const products = await Product.find().sort({_id:-1}).limit(5)
        res.json(products)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: "Server error"})
    }
})

export {addProduct,updateProduct,deleteproduct,allProducts,getProductById,fetchAllProducts,addProductReview,fetchTopProducts,newProducts}