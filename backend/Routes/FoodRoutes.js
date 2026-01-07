import express from 'express';
import { addfood,listfood,deletefood } from '../Controller/foodcontroller.js';
import multer from 'multer';
const foodRouter=express.Router();
const storage=multer.diskStorage({
    destination:function(req,file,cb)
    {   
        cb(null,'uploads/');
    },
    filename:function(req,file,cb)
    {
        cb(null,Date.now()+'-'+file.originalname);
    }
}); 
const upload=multer({storage:storage});
foodRouter.post('/add',upload.single("image"),addfood);
foodRouter.get('/list',listfood);
foodRouter.post('/delete', deletefood);
export default foodRouter;