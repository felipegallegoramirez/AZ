const Shop = require("../models/shop");

const ShopCtrl = {};


ShopCtrl.getShops = async (req, res, next) => {
    try{
        const save = await Shop.find();
        res.status(200).send(save)
    }catch(err){
        res.status(400).send(err)

    }
};

ShopCtrl.createShop = async (req, res, next) => {
    try{
        const { email, nit, name, address, ownerid, employeeid } = req.body;

        const body = { email, nit, name, address, ownerid, employeeid };
        var save= await Shop.create(body);
        res.status(200).send(save)
    }catch(err){
        res.status(400).send(err)

    }


};

ShopCtrl.getShop = async (req, res, next) => {
    try{
        const { id } = req.params;
        const save = await Shop.findById(id);
        res.status(400).send(save)
    }catch(err){
        res.status(400).send(err)

    }
};

ShopCtrl.editShop = async (req, res, next) => {
    try{
        const { id } = req.params;
        save = await Shop.findByIdAndUpdate(id, {$set: req.body}, {new: true});
        res.status(400).send(save)
    }catch(err){
    res.status(400).send(err)
}

};

ShopCtrl.deleteShop = async (req, res, next) => {
    try{
        await Shop.findByIdAndRemove(req.params.id);
        res.json({ status: "Shop Deleted" });
    }catch(err){
        res.status(400).send(err)
    }
};



module.exports = ShopCtrl;