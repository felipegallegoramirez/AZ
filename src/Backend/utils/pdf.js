const fs = require("fs");
const PDF = require('pdfkit-table')

const factura = async(id,cliente,tienda,venta)=>{
    const doc = new PDF ( {bufferPage:true})
    doc.pipe(fs.createWriteStream("./storage/pdf/"+id+".pdf"));
    doc.text(`Gracias por su compra - ${id}`,30, 30) ;
    doc.text(`Cliente:${cliente.name}`,30, 45);
    doc.text(`Tienda:${tienda.name}`,30, 60);
    doc.text(`Total:${venta.totalprice}`,30, 75);
    doc.text(`Puntos totales:${venta.totalpoints}`,30, 90);
    var data=[]
    for(var i =0;i<venta.product.length;i++){
        data.push([
            venta.product[i].name,
            venta.product[i].count,
            venta.product[i].unitaryprice,
            venta.product[i].totalprice,
        ])
    }

    const table = {
    headers: [ "Producto", "Cantidad", "Precio Unitario","PrecioTotal" ],
    rows: data,
    };
    await doc.table(table, { 
    width: 300,
    });
    doc.end() ;
}

module.exports = {factura}
