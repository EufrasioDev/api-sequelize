const multer = require("multer");
const util = require("util");
const maxSizeFile = 2 * 1024 * 1024;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/static/uploads/assets/images/")
  },
  filename: (req, file, cb) => {
    cb(null, Date.now().toString()+"_"+file.originalname)
  }
});

const fileFilter = (req, file, cb) => {
  //Var array contendo as extensoes permitidas no sistema.
  //Se a funcao find retorna true, a imagem e enviada. senão... no.!
  const extImg = ["image/png", "image/jpg", "image/jpeg"].find(extAceito => {
      return extAceito == file.mimetype
  });
  if(extImg){
    return cb(null, true);
  } 
  return cb(null, false)
}

const uploadFile = multer({
  storage,
  limits: {fileSize: maxSizeFile},
  fileFilter  
}).none("uploaded_image");
const uploadFileVar = util.promisify(uploadFile)
module.exports = {uploadFileVar}

