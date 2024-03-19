const User = require("../models/user");
const Shop = require("../models/shop");
const Clients = require("../models/clients");
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
            address:req.body.address,
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
        res.status(200).send(save)
    }catch(err){
        res.status(400).send(err)

    }
};

UserCtrl.editUser = async (req, res, next) => {
    try{
        const { id } = req.params;
        save = await User.findByIdAndUpdate(id, {$set: req.body}, {new: true});
        res.status(200).send(save)
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





UserCtrl.register = async (req, res, next) => {
    try{
        
        var body = {
            email:req.body.email,
            password: await encrypt(req.body.password),
            name:req.body.name,
            phone:req.body.phone,
            shop: req.body.shop,
        }
        var temp=req.body.shop; 
         body.shop={
            id: '',
            permissions: [0,1,2,3,4,5,6,7,8,9,10,11]
        }

        var save= await User.create(body);
        var shop = {
            email: temp.email, 
            nit:temp.nit, 
            name:temp.name, 
            ownerid:save._id, 
            employeeid:[]
        }
        try{
            var saveShop = await Shop.create(shop);
        }catch(e){
            console.log(e)
        }


        const RG = {
            _id:save._id,
            email:"DEFAULT",
            dni:0,
            name:"DEFAULT",
            address:"DEFAULT",
            phone:0,
            points:0,
            sells:[],
            shopid:saveShop._id
          };
        var rg= await Clients.create(RG);

        save.shop.id=saveShop._id
        save= await User.findByIdAndUpdate(save._id,save);
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
            //address:req.body.address,
            phone:req.body.phone,
            shop: req.body.shop,
        }

        
        var saveShop = await Shop.findById(req.params.shopid);
        var save= await User.create(body);


        saveShop.employeeid.push(save._id)
        saveShop= await Shop.findByIdAndUpdate(saveShop._id,saveShop);

        res.status(200).send(save)
    }catch(err){
        res.status(400).send(err)
    }
};
UserCtrl.getEmployee = async (req, res, next) => {
    try {

        /*
        const { shopid } = req.params;
        const save = await Inventory.find({ shopid });*/


        const { shopid } = req.params;
        const search = req.query.search || "";
        const actpage = req.query.actpage || 1;
        const size = req.query.size || 1000;
        const param= req.query.param || "dni";
        const order= req.query.order || 1;

        const filters = {
            $and: [
              {
                $or: [
                  { email: { $regex: search, $options: 'i' } },
                  { name: { $regex: search, $options: 'i' } },
                  {$expr: { $regexMatch: {
                      input: { $toString: "$name" },
                      regex: search.toString(),
                      options: "i"
                    } } },
                    {$expr: { $regexMatch: {
                        input: { $toString: "$dni" },
                        regex: search.toString(),
                        options: "i"
                      } } }
                    ,
                ]
              },
              { "shop.id": shopid },
            ]
          };

          let sort={}
          sort[param]=Number(order);
          const skip = (actpage - 1) * size;
          const docs = await User.find(filters).sort(sort).skip(skip).limit(size);
          delete docs.password


        res.status(200).send(docs)
    } catch (err) {
        console.log(err)
        res.status(400).send(err)

    }
};

UserCtrl.editEmployee = async (req, res, next) => {
    try{
        const { id } = req.params;
        var al = await User.findById(id)
        var password;
        if(req.body.password==""){
            password=al.password
        }else{
            password= await encrypt(req.body.password)
        }
        var body = {
            email:req.body.email,
            password:password,
            dni:req.body.dni,
            name:req.body.name,
            //address:req.body.address,
            phone:req.body.phone,
            shop: req.body.shop,
        }

        var save= await User.findByIdAndUpdate(id,body);

        res.status(200).send(save)
    }catch(err){
        res.status(400).send(err)
    }
};


module.exports = UserCtrl;