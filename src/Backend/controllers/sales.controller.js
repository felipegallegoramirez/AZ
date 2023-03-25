const Sales = require("../models/sales");

const SalesCtrl = {};


SalesCtrl.getSaless = async (req, res, next) => {
    try{
        const save = await Sales.find();
        res.status(200).send(save)
    }catch(err){
        res.status(400).send(err)

    }
};

SalesCtrl.createSales = async (req, res, next) => {
    try{
        const { time, client, employee, date, product, service, totalprice, totalpoints, shopid } = req.body;
        const body = { time, client, employee, date, product, service, totalprice, totalpoints, shopid };
        var save= await Sales.create(body);

        res.status(200).send(save)
    }catch(err){
        res.status(400).send(err)

    }


};

SalesCtrl.getSales = async (req, res, next) => {
    try{
        const { id } = req.params;
        const save = await Sales.findById(id);
        res.status(400).send(save)
    }catch(err){
        res.status(400).send(err)

    }
};

SalesCtrl.editSales = async (req, res, next) => {
    try{
        const { id } = req.params;
        save = await Sales.findByIdAndUpdate(id, {$set: req.body}, {new: true});
        res.status(400).send(save)
    }catch(err){
    res.status(400).send(err)
}

};

SalesCtrl.deleteSales = async (req, res, next) => {
    try{
        await Sales.findByIdAndRemove(req.params.id);
        res.json({ status: "Sales Deleted" });
    }catch(err){
        res.status(400).send(err)
    }
};



module.exports = SalesCtrl;