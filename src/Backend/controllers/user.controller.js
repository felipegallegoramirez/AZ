const User = require("../models/user");
const {encrypt} =  require("../utils/encript")

const UserCtrl = {};


UserCtrl.getUsers = async (req, res, next) => {
    try{
        const save = await User.find();
        res.status(200).send(save)
    }catch(err){
        res.status(400).send(err)

    }
};

UserCtrl.createUser = async (req, res, next) => {
    try{
        const body = {
            email:req.body.email,
            password: await encrypt(req.body.password),
            dni:req.body.dni,
            name:req.body.name,
            city:req.body.city,
            phone:req.body.phone,
        }
        var save= await User.create(body);
        res.status(200).send(save)
    }catch(err){
        res.status(400).send(err)

    }


};

UserCtrl.getUser = async (req, res, next) => {
    try{
        const { id } = req.params;
        const save = await User.findById(id);
        res.status(400).send(save)
    }catch(err){
        res.status(400).send(err)

    }
};

UserCtrl.editUser = async (req, res, next) => {
    try{
        const { id } = req.params;
        save = await User.findByIdAndUpdate(id, {$set: req.body}, {new: true});
        res.status(400).send(save)
    }catch(err){
    res.status(400).send(err)
}

};

UserCtrl.deleteUser = async (req, res, next) => {
    try{
        await User.findByIdAndRemove(req.params.id);
        res.json({ status: "User Deleted" });
    }catch(err){
        res.status(400).send(err)
    }
};




const Shop = require("../models/shop");

UserCtrl.register = async (req, res, next) => {
    try{
        var body = {
            email:req.body.email,
            password: await encrypt(req.body.password),
            dni:req.body.dni,
            name:req.body.name,
            city:req.body.city,
            phone:req.body.phone,
            shop: req.body.shop,
        }

        
        body.shop={
            id: '',
            permissions: [0,1,2,3,4,5,6,7,8,9,10,11]
        }
        var save= await User.create(body);

        var shop = {
            email: body.shop.email, 
            runt:body.shop.email, 
            name:body.shop.email, 
            address:body.shop.email, 
            ownerid:save._id, 
            employeeid:[]
        }
        var saveShop = await Shop.create(shop);

        save.shop.id=saveShop._id
        save= User.findByIdAndUpdate(save._id,save);
        res.status(200).send(save)
    }catch(err){
        res.status(400).send(err)
    }
};



UserCtrl.addEmployee = async (req, res, next) => {
    try{
        var body = {
            email:req.body.email,
            password: await encrypt(req.body.password),
            dni:req.body.dni,
            name:req.body.name,
            city:req.body.city,
            phone:req.body.phone,
            shop: req.body.shop,
        }

        
        body.shop={
            id: req.params.shopid,
            permissions: [0,1,2,3,4,5,6,7,8,9,10,11]
        }

        const saveShop = await Shop.findById(req.params.shopid);
        var save= await User.create(body);

        saveShop.employeeid.push(save._id)
        saveShop= Shop.findByIdAndUpdate(saveShop._id,saveShop);




        res.status(200).send(save)
    }catch(err){
        res.status(400).send(err)
    }

};



module.exports = UserCtrl;