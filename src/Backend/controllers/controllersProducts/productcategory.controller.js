const ProductCategory = require("../../models/modelsProducts/productcategory");

const ProductCategoryCtrl = {};


ProductCategoryCtrl.getProductCategorys = async (req, res, next) => {
    try{
        const save = await ProductCategory.find();
        res.status(200).send(save)
    }catch(err){
        res.status(400).send(err)

    }
};

ProductCategoryCtrl.createProductCategory = async (req, res, next) => {
    try{
        const { name, listproductid, shopid } = req.body;

        const body = {
          name,
          listproductid,
          shopid
        };
        var save= await ProductCategory.create(body);
        res.status(200).send(save)
    }catch(err){
        res.status(400).send(err)

    }


};

ProductCategoryCtrl.getProductCategory = async (req, res, next) => {
    try{
        const { id } = req.params;
        const save = await ProductCategory.findById(id);
        res.status(400).send(save)
    }catch(err){
        res.status(400).send(err)

    }
};

ProductCategoryCtrl.editProductCategory = async (req, res, next) => {
    try{
        const { id } = req.params;
        save = await ProductCategory.findByIdAndUpdate(id, {$set: req.body}, {new: true});
        res.status(400).send(save)
    }catch(err){
    res.status(400).send(err)
}

};

ProductCategoryCtrl.deleteProductCategory = async (req, res, next) => {
    try{
        await ProductCategory.findByIdAndRemove(req.params.id);
        res.json({ status: "ProductCategory Deleted" });
    }catch(err){
        res.status(400).send(err)
    }
};



module.exports = ProductCategoryCtrl;