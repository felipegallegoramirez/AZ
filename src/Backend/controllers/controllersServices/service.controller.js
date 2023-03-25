const Service = require("../../models/modelsServices/service");

const ServiceCtrl = {};


ServiceCtrl.getServices = async (req, res, next) => {
    try{
        const save = await Service.find();
        res.status(200).send(save)
    }catch(err){
        res.status(400).send(err)

    }
};

ServiceCtrl.createService = async (req, res, next) => {
    try{
        const { name, category, price, points, shopid } = req.body;

        const body = {
          name,
          category,
          price,
          points,
          shopid
        };
        var save= await Service.create(body);
        res.status(200).send(save)
    }catch(err){
        res.status(400).send(err)

    }


};

ServiceCtrl.getService = async (req, res, next) => {
    try{
        const { id } = req.params;
        const save = await Service.findById(id);
        res.status(400).send(save)
    }catch(err){
        res.status(400).send(err)

    }
};

ServiceCtrl.editService = async (req, res, next) => {
    try{
        const { id } = req.params;
        save = await Service.findByIdAndUpdate(id, {$set: req.body}, {new: true});
        res.status(400).send(save)
    }catch(err){
    res.status(400).send(err)
}

};

ServiceCtrl.deleteService = async (req, res, next) => {
    try{
        await Service.findByIdAndRemove(req.params.id);
        res.json({ status: "Service Deleted" });
    }catch(err){
        res.status(400).send(err)
    }
};



module.exports = ServiceCtrl;