const Clients = require("../models/clients");

const ClientsCtrl = {};


ClientsCtrl.getClientss = async (req, res, next) => {
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
                      input: { $toString: "$phone" },
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
              { shopid: shopid },
            ]
          };

          let sort={}
          sort[param]=Number(order);
          const skip = (actpage - 1) * size;
          const docs = await Clients.find(filters).sort(sort).skip(skip).limit(size);


        res.status(200).send(docs)
    } catch (err) {
        console.log(err)
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