import foodmodel from "../config/food.js";
import fs from 'fs';
const addfood=async (req,res)=>
{
let image_pathname=`${req.file.filename}`;
const food=new foodmodel(
    {
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        image:image_pathname,
        category:req.body.category
    }
);
try{
    await food.save();
    res.status(201).json({message:"food added successfully",food:food});
}
catch(err)
{
    console.log(err);
    res.json({message:"error in adding food"});
}
}
const listfood=async(req,res)=>
{
    try{
        const foods=await foodmodel.find({});
        res.status(200).json(foods);
    }
    catch(err)
    {
        console.log(err);
        res.json({message:"error in fetching food list"});
    }
}
const deletefood = async (req, res) => {
    try {
        const food = await foodmodel.findById(req.body.id);

        if (!food) {
            return res.status(404).json({ message: "food not found" });
        }

     
        const imagePath = `./uploads/${food.image}`;
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }

      
        await foodmodel.findByIdAndDelete(req.body.id);

        res.status(200).json({ message: "food deleted successfully" });
    } catch (err) {
        console.log(err);
        res.json({ message: "error in deleting food" });
    }
};
export {addfood,listfood,deletefood};