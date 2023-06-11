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











//  !NO Crud
const Service = require("../models/modelsServices/service");
const Inventory = require("../models/modelsProducts/inventory");

SalesCtrl.soldPreview = async (req, res, next) => {

    const { time, client, employee, date, product, service, totalprice, totalpoints, shopid } = req.body;
    const body = { time, client, employee, date, product, service, totalprice, totalpoints, shopid };

    var state = true

    /* 
    !Posible forma de romper esta parte
        Si durante la compra, se modifica la base de datos al tiempo
    */

    log=[]
    
    for (var i= 0 ; i <= body.product.length  ;i++){
        let data = await Inventory.findById(body.product[i].id);
        if (data.count <body.product[i].count){
            state=false
            log.push(`Error Producto ${body.product[i].name} no suficientes`)
        }else{
            data.count-= body.product[i].count
            Inventory.findByIdAndUpdate(data._id,data)
        }
    }

    var save= await Sales.create(body);
    res.status(200).send(save)
}

SalesCtrl.soldCancel= async (req, res, next) => {

    
}






module.exports = SalesCtrl;