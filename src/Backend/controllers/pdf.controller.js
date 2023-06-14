

const UserCtrl = {};
const { messageSold } = require("../utils/emailprefabs/factura");


UserCtrl.getPDF = async (req, res, next) => {
    try{
        const { id } = req.params;
        res.download(`./storage/pdf/${id}.pdf`, 'factura.pdf', (err) => {
            if (err) {
              // Manejar el error, si corresponde
              console.error('Error al descargar el archivo:', err);
            }
        })
    }catch(err){
        console.log(err)
        res.status(400).send(err)

    }
};

UserCtrl.sendPDF = async (req, res, next) => {
    try{
        const { tienda, total, id, correo} = req.body;
        await messageSold(correo,id,tienda,total)
        res.status(200).send("Correo Enviado")
        //tienda total id correo

    }catch(err){
        console.log(err)
        res.status(400).send(err)

    }
};



module.exports = UserCtrl;