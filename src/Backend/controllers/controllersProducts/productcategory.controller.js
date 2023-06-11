const ProductCategory = require("../../models/modelsProducts/productcategory");
const Inventory = require("../../models/modelsProducts/inventory");


const ProductCategoryCtrl = {};
const {delet} = require("../../utils/imgdelete")
const {resizeImage} = require("../../utils/filemodify")


ProductCategoryCtrl.getProductCategorys = async (req, res, next) => {
    try {

        const { shopid } = req.params;

        const save = await ProductCategory.find({ shopid });
        res.status(200).send(save)
    } catch (err) {
        res.status(400).send(err)

    }
};

ProductCategoryCtrl.createProductCategory = async (req, res, next) => {
    try {

        const { name, shopid } = req.body;

        let image = "basic.png"


        if (req.file) {
            image = req.file.filename
            resizeImage(image)
            }
        const body = {name,shopid,image};



        var save = await ProductCategory.create(body);
        res.status(200).send(save)
    } catch (err) {
        res.status(400).send(err)

    }


};

ProductCategoryCtrl.getProductCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const save = await ProductCategory.findById(id);
        res.status(400).send(save)
    } catch (err) {
        res.status(400).send(err)

    }
};

ProductCategoryCtrl.editProductCategory = async (req, res, next) => {
    try {
        console.log(req.body)
        const { id } = req.params;
        if (req.file) {
            image = req.file.filename
            resizeImage(image)
            req.body.image = image
            delet(`r/${image}`)
        }
        save = await ProductCategory.findByIdAndUpdate(id, { $set: req.body }, { new: true });
        res.status(200).send(save)
    } catch (err) {
        res.status(400).send(err)
    }

};

ProductCategoryCtrl.deleteProductCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const save = await ProductCategory.findById(id);
        if (save.image!="basic.png"){
            delet(`r/${save.image}`)
        }

        for(let x of save.listproductid){
            await Inventory.findByIdAndRemove(x);
        }
        await ProductCategory.findByIdAndRemove(id);
        res.json({ status: "ProductCategory Deleted" });
    } catch (err) {
        res.status(400).send(err)
    }
};




module.exports = ProductCategoryCtrl;