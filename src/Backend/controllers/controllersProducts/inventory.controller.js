const Inventory = require("../../models/modelsProducts/inventory");
const ProductCategory = require("../../models/modelsProducts/productcategory");

const InventoryCtrl = {};
const {delet} = require("../../utils/imgdelete")
const {resizeImage} = require("../../utils/filemodify");;


InventoryCtrl.getInventorys = async (req, res, next) => {
    try {

        /*
        const { shopid } = req.params;
        const save = await Inventory.find({ shopid });*/

        const { shopid } = req.params;
        const search = req.query.search || "";
        const actpage = req.query.actpage || 1;
        const size = req.query.size || 1000;
        const param= req.query.param || "code";
        const order= req.query.order || 1;
        const cat= req.query.category || "";

        console.log(cat)
        const filters = {
            $and: [
              {
                $or: [
                  { productname: { $regex: search, $options: 'i' } },
                  { code: { $regex: search, $options: 'i' } }
                ]
              },
              { shopid: shopid },
              { category: { $regex: cat, $options: 'i' } }
            ]
          };

          let sort={}
          sort[param]=Number(order);
          const skip = (actpage - 1) * size;
          //const docs = await Inventory.find(filters).sort(sort).skip(skip).limit(size).toArray();
          const docs = await Inventory.find(filters).sort(sort).skip(skip).limit(size);


        res.status(200).send(docs)
    } catch (err) {
        console.log(err)
        res.status(400).send(err)

    }
};

InventoryCtrl.createInventory = async (req, res, next) => {
    try{
        const { code, productname, count, category, price, points, shopid } = req.body;

        let image = "basic.png"
        if (req.file) {
        image = req.file.filename
        resizeImage(image)
        }
        var lea = await ProductCategory.findById(category)


        const body = { code, productname, count, category, price, points,image, shopid };
        var save= await Inventory.create(body);
        lea.listproductid.push(save._id)

        var as  = await ProductCategory.findByIdAndUpdate(lea._id,lea)
        
        res.status(200).send(save)
    }catch(err){
        res.status(400).send(err)

    }


};

InventoryCtrl.getInventory = async (req, res, next) => {
    try{
        const { id } = req.params;
        const save = await Inventory.findById(id);
        res.status(200).send(save)
    }catch(err){
        res.status(400).send(err)

    }
};

InventoryCtrl.editInventory = async (req, res, next) => {
    try{
        const { id } = req.params;


        if (req.file) {
            image = req.file.filename
            resizeImage(image)
            delet(`r/${req.body.image}`)
            req.body.image = image
        }
        
        const x = await ProductCategory.findById(req.body.category);
        if (x.listproductid.includes(id) == -1){
            const presave = await Inventory.findById(id)
            const y = await ProductCategory.findById(presave.category);
            
            let va = y.listproductid.includes(id)
            
            y.listproductid.splice(va,va+1)
            x.listproductid.push(id)

            await Productcategory.findByIdAndUpdate(presave.category,y)
            await Productcategory.findByIdAndUpdate(req.body.category,x)
        }


        save = await Inventory.findByIdAndUpdate(id, {$set: req.body}, {new: true});
        res.status(200).send(save)
    }catch(err){
    res.status(400).send(err)
}

};

InventoryCtrl.deleteInventory = async (req, res, next) => {
    try{
        const { id } = req.params;
        const save = await Inventory.findById(id);
        if (save.image!="basic.png"){
            delet(`r/${save.image}`)
        }
        const x = await ProductCategory.findById(save.category);
        let va = x.listproductid.includes(id)   
        x.listproductid.splice(va,va+1)
        await ProductCategory.findByIdAndUpdate(save.category,x)


        await Inventory.findByIdAndRemove(id);
        res.status(200).send({message: "eliminado correctamente"})
    }catch(err){
        res.status(400).send(err)
    }
};



module.exports = InventoryCtrl;