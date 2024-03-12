const OnlineSale = require("../models/online-sale");
const Clients = require("../models/clients");
const User = require("../models/user");
const Shop = require("../models/shop");
const {factura}= require("../utils/pdf")
const { verifyToken } = require("../utils/token");

const OnlineSaleCtrl = {};


OnlineSaleCtrl.getOnlineSales = async (req, res, next) => {
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
                          } } },
                          {$expr: { $regexMatch: {
                            input: { $toString: "$_id" },
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
              const docs = await OnlineSale.find(filters).sort(sort).skip(skip).limit(size);
              
    
    
            res.status(200).send(docs)
        } catch (err) {
            console.log(err)
            res.status(400).send(err)
    
        }
};

OnlineSaleCtrl.createOnlineSale = async (req, res, next) => {
    try{
        const { client, date, product, service, totalprice, totalpoints, shopid,state,metod } = req.body;
        const body = { client, date, product, service, totalprice, totalpoints, shopid,state,metod };
        var save= await OnlineSale.create(body);
        res.status(200).send(save)
    }catch(err){
        res.status(400).send(err)

    }
};


OnlineSaleCtrl.getOnlineSale = async (req, res, next) => {
    try{
        const { id } = req.params;
        const save = await OnlineSale.findById(id);
        res.status(200).send(save)
    }catch(err){
        res.status(400).send(err)

    }
};

OnlineSaleCtrl.editOnlineSale = async (req, res, next) => {
    try{
        const { id } = req.params;
        save = await OnlineSale.findByIdAndUpdate(id, {$set: req.body}, {new: true});
        res.status(200).send(save)
    }catch(err){
    res.status(400).send(err)
}

};

OnlineSaleCtrl.deleteOnlineSale = async (req, res, next) => {
    try{
        await OnlineSale.findByIdAndRemove(req.params.id);
        res.json({ status: "OnlineSale Deleted" });
    }catch(err){
        res.status(400).send(err)
    }
};











//  !NO Crud
const Service = require("../models/modelsServices/service");
const Sale = require("../models/sales");
const Inventory = require("../models/modelsProducts/inventory");

OnlineSaleCtrl.sold = async (req, res, next) => {

    try{
        const { client, date, product, service, totalprice, totalpoints, shopid } = req.body;


        var state = true
    
        /* 
        !Posible forma de romper esta parte
            Si durante la compra, se modifica la base de datos al tiempo
        */
    
        log=[]
    
        const token = req.headers.authorization.split(" ").pop();
        const tokenData = await verifyToken(token);
        const employeeinfo = await User.findById(tokenData._id);
    
        let clien =  await Clients.findOne({email:client.email})
        if(!clien){
            let newclient={
                dni:client.dni,
                name:client.name,
                address: client.address,
                phone:client.number,
                email:client.email,
            } 
            clien = await Clients.create(newclient)
            
        }
        client.id=clien._id
    
        const employee={
            id:tokenData._id,
            name:employeeinfo.name,
            dni:employeeinfo.dni
        }
        const body = { client,employee, date, product, service, totalprice, totalpoints, shopid };
    
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
        if(!state){
            res.status(400).send({ error:"Mamo"})
        }
    
    
        var save= await Sale.create(body);
        await OnlineSale.findByIdAndUpdate(req.body._id, {$set: {state: 'acept'}}, {new: false});
        if (clien?.sells){
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
    }catch(e){
        console.log(e)
        res.status(400).send({ error:"Mamo"})
    }

    
}









module.exports = OnlineSaleCtrl;