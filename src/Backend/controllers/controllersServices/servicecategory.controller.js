const ServiceCategory = require("../../models/modelsServices/servicecategory");

const ServiceCategoryCtrl = {};


ServiceCategoryCtrl.getServiceCategorys = async (req, res, next) => {
    try{
        const save = await ServiceCategory.find();
        res.status(200).send(save)
    }catch(err){
        res.status(400).send(err)

    }
};

ServiceCategoryCtrl.createServiceCategory = async (req, res, next) => {
    try{
        const { name, listserviceid, shopid } = req.body;
        const body = { name, listserviceid, shopid };
        var save= await ServiceCategory.create(body);
        res.status(200).send(save)
    }catch(err){
        res.status(400).send(err)

    }


};

ServiceCategoryCtrl.getServiceCategory = async (req, res, next) => {
    try{
        const { id } = req.params;
        const save = await ServiceCategory.findById(id);
        res.status(400).send(save)
    }catch(err){
        res.status(400).send(err)

    }
};

ServiceCategoryCtrl.editServiceCategory = async (req, res, next) => {
    try{
        const { id } = req.params;
        save = await ServiceCategory.findByIdAndUpdate(id, {$set: req.body}, {new: true});
        res.status(400).send(save)
    }catch(err){
    res.status(400).send(err)
}

};

ServiceCategoryCtrl.deleteServiceCategory = async (req, res, next) => {
    try{
        await ServiceCategory.findByIdAndRemove(req.params.id);
        res.json({ status: "ServiceCategory Deleted" });
    }catch(err){
        res.status(400).send(err)
    }
};



module.exports = ServiceCategoryCtrl;