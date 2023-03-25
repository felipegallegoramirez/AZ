const Reserve = require("../../models/modelsServices/reserve");

const ReserveCtrl = {};


ReserveCtrl.getReserves = async (req, res, next) => {
    try{
        const save = await Reserve.find();
        res.status(200).send(save)
    }catch(err){
        res.status(400).send(err)

    }
};

ReserveCtrl.createReserve = async (req, res, next) => {
    try{
        const { time, date, workstationid, service, client, shopid } = req.body;

        const body = {
          time,
          date,
          workstationid,
          service,
          client,
          shopid
        };
        var save= await Reserve.create(body);
        res.status(200).send(save)
    }catch(err){
        res.status(400).send(err)

    }


};

ReserveCtrl.getReserve = async (req, res, next) => {
    try{
        const { id } = req.params;
        const save = await Reserve.findById(id);
        res.status(400).send(save)
    }catch(err){
        res.status(400).send(err)

    }
};

ReserveCtrl.editReserve = async (req, res, next) => {
    try{
        const { id } = req.params;
        save = await Reserve.findByIdAndUpdate(id, {$set: req.body}, {new: true});
        res.status(400).send(save)
    }catch(err){
    res.status(400).send(err)
}

};

ReserveCtrl.deleteReserve = async (req, res, next) => {
    try{
        await Reserve.findByIdAndRemove(req.params.id);
        res.json({ status: "Reserve Deleted" });
    }catch(err){
        res.status(400).send(err)
    }
};



module.exports = ReserveCtrl;