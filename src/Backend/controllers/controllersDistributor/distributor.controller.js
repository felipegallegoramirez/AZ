const Distributor = require("../../models/modelsDistributor/distributor");

const DistributorCtrl = {};
const {delet} = require("../../utils/imgdelete")
const {resizeImage} = require("../../utils/filemodify");;


DistributorCtrl.getDistributors = async (req, res, next) => {
    try {

        /*
        const { shopid } = req.params;
        const save = await Distributor.find({ shopid });*/

        const { shopid } = req.params;
        const search = req.query.search || "";
        const actpage = req.query.actpage || 1;
        const size = req.query.size || 1000;
        const param= req.query.param || "code";
        const order= req.query.order || 1;
        const cat= req.query.category || 1;
        const filters = {
            $and: [
              {
                $or: [
                  { name: { $regex: search, $options: 'i' } },
                  { dni: { $regex: search, $options: 'i' } }
                ]
              },
              { shopid: shopid },
            ]
          };

          let sort={}
          sort[param]=Number(order);
          const skip = (actpage - 1) * size;
          //const docs = await Distributor.find(filters).sort(sort).skip(skip).limit(size).toArray();
          const docs = await Distributor.find(filters).sort(sort).skip(skip).limit(size);


        res.status(200).send(docs)
    } catch (err) {
        console.log(err)
        res.status(400).send(err)

    }
};

DistributorCtrl.createDistributor = async (req, res, next) => {
    try{
        const { product, total, name, dni, address, lastdate, nextdate } = req.body;
        const body = { product, total, name, dni, address, lastdate, nextdate };
        var save= await Distributor.create(body);
        
        res.status(200).send(save)
    }catch(err){
        res.status(400).send(err)

    }


};

DistributorCtrl.getDistributor = async (req, res, next) => {
    try{
        const { id } = req.params;
        const save = await Distributor.findById(id);
        res.status(400).send(save)
    }catch(err){
        res.status(400).send(err)

    }
};

DistributorCtrl.editDistributor = async (req, res, next) => {
    try{
        const { id } = req.params;
        save = await Distributor.findByIdAndUpdate(id,{$set: req.body}, {new: true});
        res.status(200).send(save)
    }catch(err){
    res.status(400).send(err)
}

};

DistributorCtrl.deleteDistributor = async (req, res, next) => {
    try{
        const { id } = req.params;
        await Distributor.findByIdAndRemove(id);
        res.status(200).send({message: "eliminado correctamente"})
    }catch(err){
        res.status(400).send(err)
    }
};



module.exports = DistributorCtrl;