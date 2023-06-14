
const  sendcorreo  = require("../emails");

const messageSold = (correo,id,tienda,total) => {
    sendcorreo(correo,"Aqui tienes tu factura <3", 
    `
    <div class="sup" style="width: 80%; margin: 0px 10%;">
    <img src="cid:unique@kreata.ee" alt="">
</div>

<div class="inf" style="text-align: center;">
    <div class="divider" style="width: 40%;margin: auto;height: 8px;background-color: #16A571;border-radius:20px;"></div>
    <p style="text-align: justify;width: 50%;margin: auto;margin-top: 90px;">Hiciste una compra por eso en este correo encontraras un resumen y además te adjuntamos la factura.
        <br>
        <br>
        <br>
        Hiciste una compra en: ${tienda}
        <br>
        Pagaste: ${total}
        <br>
        Codigo compra: ${id}
        
        <br>
        <br>
        <br>
        Por favor, no dude en contactarnos si necesita ayuda adicional.</p>
</div>

<footer style="text-align: center;width: 100%;margin-top: 100px;">
    <p>EzCo 2023 Copyright © Todos los derechos reservados - Política de privacidad</p>
</footer>`,
[{
    filename: 'image.png',
    path: __dirname + '/image2.png',
    cid: 'unique@kreata.ee' 
},{
    filename: 'factura.pdf',
    path: __dirname + '../../../storage/pdf/'+id+".pdf" 
}
])
  };




  module.exports = {  messageSold};