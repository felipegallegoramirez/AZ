const Inventory = require("../../models/modelsProducts/inventory");

const InventoryCtrl = {};


InventoryCtrl.getInventorys = async (req, res, next) => {
    try{
        const save = await Inventory.find();
        res.status(200).send(save)
    }catch(err){
        res.status(400).send(err)

    }
};

InventoryCtrl.createInventory = async (req, res, next) => {
    try{
        const { code, productname, count, category, price, points, shopid } = req.body;
        const body = { code, productname, count, category, price, points, shopid };
        var save= await Inventory.create(body);
        res.status(200).send(save)
    }catch(err){
        res.status(400).send(err)

    }


};

InventoryCtrl.getInventory = async (req, res, next) => {
    try{
        const { id } = req.params;
        const save = await Inventory.findById(id);
        res.status(400).send(save)
    }catch(err){
        res.status(400).send(err)

    }
};

InventoryCtrl.editInventory = async (req, res, next) => {
    try{
        const { id } = req.params;
        save = await Inventory.findByIdAndUpdate(id, {$set: req.body}, {new: true});
        res.status(400).send(save)
    }catch(err){
    res.status(400).send(err)
}

};

InventoryCtrl.deleteInventory = async (req, res, next) => {
    try{
        await Inventory.findByIdAndRemove(req.params.id);
        res.json({ status: "Inventory Deleted" });
    }catch(err){
        res.status(400).send(err)
    }
};



module.exports = InventoryCtrl;