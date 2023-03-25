const WorkStation = require("../../models/modelsServices/workstation");

const WorkStationCtrl = {};


WorkStationCtrl.getWorkStations = async (req, res, next) => {
    try{
        const save = await WorkStation.find();
        res.status(200).send(save)
    }catch(err){
        res.status(400).send(err)

    }
};

WorkStationCtrl.createWorkStation = async (req, res, next) => {
    try{
        const { 
            employee,blocked,services,shopid} = req.body;
          
          const body = {
            employee,
            blocked,
            services,
            shopid
          };
        var save= await WorkStation.create(body);
        res.status(200).send(save)
    }catch(err){
        res.status(400).send(err)

    }


};

WorkStationCtrl.getWorkStation = async (req, res, next) => {
    try{
        const { id } = req.params;
        const save = await WorkStation.findById(id);
        res.status(400).send(save)
    }catch(err){
        res.status(400).send(err)

    }
};

WorkStationCtrl.editWorkStation = async (req, res, next) => {
    try{
        const { id } = req.params;
        save = await WorkStation.findByIdAndUpdate(id, {$set: req.body}, {new: true});
        res.status(400).send(save)
    }catch(err){
    res.status(400).send(err)
}

};

WorkStationCtrl.deleteWorkStation = async (req, res, next) => {
    try{
        await WorkStation.findByIdAndRemove(req.params.id);
        res.json({ status: "WorkStation Deleted" });
    }catch(err){
        res.status(400).send(err)
    }
};



module.exports = WorkStationCtrl;