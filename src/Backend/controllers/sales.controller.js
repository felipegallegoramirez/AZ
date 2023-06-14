const Sales = require("../models/sales");
const Clients = require("../models/clients");
const User = require("../models/user");
const Shop = require("../models/shop");
const {factura}= require("../utils/pdf")
const { verifyToken } = require("../utils/token");

const SalesCtrl = {};


SalesCtrl.getSaless = async (req, res, next) => {
        try {
    
            /*
            const { shopid } = req.params;
            const save = await Inventory.find({ shopid });*/
    
    
            const { shopid } = req.params;
            const search = req.query.search || "";
            const actpage = req.query.actpage || 1;
            const size = req.query.size || 1000;
            const param= req.query.param || "createdAt";
            const order= req.query.order || 1;
            console.log(shopid)
    
            const filters = {
                $and: [
                  {
                    $or: [
                      { email: { $regex: search, $options: 'i' } },
                      { name: { $regex: search, $options: 'i' } },
                      {$expr: { $regexMatch: {
                          input: { $toString: "$client.dni" },
                          regex: search.toString(),
                          options: "i"
                        } } },
                        {$expr: { $regexMatch: {
                            input: { $toString: "$date" },
                            regex: search.toString(),
                            options: "i"
                          } } }
                        ,
                    ]
                  },
                  { "shopid": shopid },
                ]
              };
    
              let sort={}
              sort[param]=Number(order);
              const skip = (actpage - 1) * size;
              const docs = await Sales.find(filters).sort(sort).skip(skip).limit(size);

    
    
            res.status(200).send(docs)
        } catch (err) {
            console.log(err)
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

    const { time, client, date, product, service, totalprice, totalpoints, shopid } = req.body;


    var state = true

    /* 
    !Posible forma de romper esta parte
        Si durante la compra, se modifica la base de datos al tiempo
    */

    log=[]

    const token = req.headers.authorization.split(" ").pop();
    const tokenData = await verifyToken(token);
    const employeeinfo = await User.findById(tokenData._id);
    if(client.id=="0"){
        client.id=tokenData._id
        client.name="DEFAULT"
        client.dni=0
    }


    const employee={
        id:tokenData._id,
        name:employeeinfo.name,
        dni:employeeinfo.dni
    }
    const body = { time, client,employee, date, product, service, totalprice, totalpoints, shopid };

    for (var i= 0 ; i < body.product.length  ;i++){
        let data = await Inventory.findById(body.product[i].id);
        if (data.count <body.product[i].count){
            state=false
            log.push(`Error Producto ${body.product[i].name} no suficientes`)
        }else{
            data.count-= body.product[i].count
            await Inventory.findByIdAndUpdate(data._id,data);

        }
    }


    var save= await Sales.create(body);

    let clien =  await Clients.findById(client.id)
    if (clien.sells){
        clien.sells.push({
            id:save._id,
            price:totalprice,
            points:totalpoints
        })
    }else{
        clien.sells=[{
            id:save._id,
            price:totalprice,
            points:totalpoints
        }]
    }
    clien.points+=totalpoints
    await Clients.findByIdAndUpdate(clien._id,clien)
    saveshop= await Shop.findById(shopid)
    factura(save._id,clien,saveshop,save)


    res.status(200).send({ tienda:saveshop.name, total:save.totalprice, id:save._id, correo:clien.email})
}









module.exports = SalesCtrl;