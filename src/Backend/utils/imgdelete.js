const fs = require('fs');

 function delet (name) {
//    console.log(`${__dirname}/../storage/${name}`)
//    fs.removeSync(`${__dirname}/../storage/${name}`);
fs.unlink(`${__dirname}/../storage/${name}`, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Archivo eliminado');
    }
  });
}


module.exports = {delet}