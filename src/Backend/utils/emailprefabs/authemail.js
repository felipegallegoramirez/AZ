
const  sendcorreo  = require("../emails");

const messageLogin = (correo,id,code) => {
    sendcorreo(correo,"Ingreso a la cuenta", 
    `
    <div class="sup" style="width: 80%; margin: 0px 10%;">
    <img src="cid:unique@kreata.ee" alt="">
</div>

<div class="inf" style="text-align: center;">
    <div class="divider" style="width: 40%;margin: auto;height: 8px;background-color: #16A571;border-radius:20px;"></div>
    <a href="https://fup.vercel.app/#/emailcode/${id}/${code}" style="text-decoration: none;color: black;"><h3 style="font-size: 25px;margin: 10px;" >Click <b style="color:#16A571;">aqui</b> para ingresar </h3></a>
    <p style="text-align: justify;width: 50%;margin: auto;margin-top: 90px;">Hemos detectado un intento de acceso a su cuenta recientemente. Si ha sido usted, por favor ignore este mensaje.
        <br>
        <br>
        <br>


        Sin embargo, si no ha intentado acceder a su cuenta recientemente, le recomendamos que se ponga en contacto con nuestro equipo de soporte lo antes posible para investigar y asegurarnos de que su cuenta esté protegida.
        
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
    path: __dirname + '/image.png',
    cid: 'unique@kreata.ee' 
}])
  };




  module.exports = {  messageLogin};