const sharp = require('sharp')

const resizeImage = (name) => {
  const resize = sharp(`${__dirname}/../storage/${name}`)
  .resize(300, 3000)
  .toFile(`${__dirname}/../storage/${name}`)

  console.log(resize)
}

resizeImage()