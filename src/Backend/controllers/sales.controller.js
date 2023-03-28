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

    /*
    serviceid = body.service.map((x)=>{return x.id})
    productid = body.product.map((x)=>{return x.id})

    const productData = Inventory.find({ _id: { $in: productid } })
    const serviceData = Service.find({ _id: { $in: serviceid } })
    */
    var state = true

    /* 
    !Posible forma de romper esta parte
        Si durante la compra, se modifica la base de datos al tiempo


    */

    newdataproduct= []
    log=[]
    for (var i= 0 ; i <= body.product.length  ;i++){
        let data = await Inventory.findById(body.product[i].id);
        if (data.count <body.product[i].count){
            state=false
            log.push(`Error Producto ${body.product[i].name} no suficientes`)
        }else{
            data.count-= body.product[i].count
            newdataproduct.push(data)
        }
    }

    newdataservice= []
    /*
    for (var i= 0 ; i <= body.service.length  ;i++){
        let data = await Service.findById(body.service[i].id);
        if (data.count <body.service[i].count){
            state=false
            log.push(`Error Producto ${body.service[i].name} no suficientes`)
        }else{
            data.count-= body.service[i].count
            newdataservice.push(data)
        }
    }
    */



}







module.exports = SalesCtrl;