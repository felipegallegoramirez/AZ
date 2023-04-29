const sharp = require('sharp')
const {delet} = require("./imgdelete")

function resizeImage (name)  {
  sharp(`${__dirname}/../storage/${name}`)
  .resize(300, 300)
  .toFile(`${__dirname}/../storage/r/${name}`,(err,inf)=>{
    if(err){}
    else{
      delet(name)
    }
  })

}

module.exports ={resizeImage}