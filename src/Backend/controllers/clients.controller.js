const Clients = require("../models/user");

const ClientsCtrl = {};


ClientsCtrl.getClientss = async (req, res, next) => {
    try{
        const save = await Clients.find();
        res.status(200).send(save)
    }catch(err){
        res.status(400).send(err)

    }
};

ClientsCtrl.createClients = async (req, res, next) => {
    try{
        const { email, dni, name, address, phone, points, sells, shopid } = req.body;

        const body = {
          email,
          dni,
          name,
          address,
          phone,
          points,
          sells,
          shopid
        };
        var save= await Clients.create(body);
        res.status(200).send(save)
    }catch(err){
        res.status(400).send(err)

    }


};

ClientsCtrl.getClients = async (req, res, next) => {
    try{
        const { id } = req.params;
        const save = await Clients.findById(id);
        res.status(400).send(save)
    }catch(err){
        res.status(400).send(err)

    }
};

ClientsCtrl.editClients = async (req, res, next) => {
    try{
        const { id } = req.params;
        save = await Clients.findByIdAndUpdate(id, {$set: req.body}, {new: true});
        res.status(400).send(save)
    }catch(err){
    res.status(400).send(err)
}

};

ClientsCtrl.deleteClients = async (req, res, next) => {
    try{
        await Clients.findByIdAndRemove(req.params.id);
        res.json({ status: "Clients Deleted" });
    }catch(err){
        res.status(400).send(err)
    }
};



module.exports = ClientsCtrl;