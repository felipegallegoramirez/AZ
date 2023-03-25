const Express= require("express")
const router= Express.Router();
const fs = require('fs')
const boom = require('@hapi/boom');

const pathRouter = `${__dirname}`






//Separa el string por punto y devuelve la primera parte
// hola.txt => [hola , txt] => Return [hola]
const removeExtension = (fileName) => {
    return fileName.split('.').shift()
}

// se mete dentro de la carpeta actual y lee todos los archivos
fs.readdirSync(pathRouter).filter((file) => {
    const name = removeExtension(file)
    //Verifica que el archivo a leer no sea este mismo
    if (name!=="index") {
        router.use(`/${name}`, require(`./${name}`))
        console.log('CARGAR RUTA ---->', name)

    }
})

// Si se le pasa otra url
router.get('*', (req, res) => {
    next(boom.badRequest("ROUTE_NOT_FOUD",400))
    
})



module.exports = router
