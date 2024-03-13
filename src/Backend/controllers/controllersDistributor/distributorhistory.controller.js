const DistributorHistory = require("../../models/modelsDistributor/distributorhistory");

const DistributorHistoryCtrl = {};
const {delet} = require("../../utils/imgdelete")
const {resizeImage} = require("../../utils/filemodify");;


DistributorHistoryCtrl.getDistributorHistorys = async (req, res, next) => {
    try {

        /*
        const { shopid } = req.params;
        const save = await DistributorHistory.find({ shopid });*/

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
          //const docs = await DistributorHistory.find(filters).sort(sort).skip(skip).limit(size).toArray();
          const docs = await DistributorHistory.find(filters).sort(sort).skip(skip).limit(size);


        res.status(200).send(docs)
    } catch (err) {
        console.log(err)
        res.status(400).send(err)

    }
};

DistributorHistoryCtrl.createDistributorHistory = async (req, res, next) => {
    try{
        const { product, total, name, dni, address, date,shopid,phone } = req.body;
        const body = { product, total, name, dni, address, date,shopid,phone };
        var save= await DistributorHistory.create(body);
        
        res.status(200).send(save)
    }catch(err){
        res.status(400).send(err)

    }


};

DistributorHistoryCtrl.getDistributorHistory = async (req, res, next) => {
    try{
        const { id } = req.params;
        const save = await DistributorHistory.findById(id);
        res.status(400).send(save)
    }catch(err){
        res.status(400).send(err)

    }
};

DistributorHistoryCtrl.editDistributorHistory = async (req, res, next) => {
    try{
        const { id } = req.params;
        save = await DistributorHistory.findByIdAndUpdate(id,{$set: req.body}, {new: true});
        res.status(200).send(save)
    }catch(err){
    res.status(400).send(err)
}

};

DistributorHistoryCtrl.deleteDistributorHistory = async (req, res, next) => {
    try{
        const { id } = req.params;
        await DistributorHistory.findByIdAndRemove(id);
        res.status(200).send({message: "eliminado correctamente"})
    }catch(err){
        res.status(400).send(err)
    }
};



module.exports = DistributorHistoryCtrl;