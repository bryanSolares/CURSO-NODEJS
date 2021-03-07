const { v4: uuidv4 } = require("uuid");
const path = require("path");

const subirArchivo = (files, extencionesValidas = ["png", "jpg", "jpeg", "gif"], carpeta = "default") => {
  return new Promise((resolve, reject) => {
    let file, uploadPath;
    file = files.file;
    const nameFile = file.name.split(".");
    const extention = nameFile[nameFile.length - 1];
    if (!extencionesValidas.includes(extention)) {
      reject(`La extencion del archivo no es valida: ${extention}`);
    }

    const nameTempFile = uuidv4().concat(".").concat(extention);
    uploadPath = path.join(__dirname, "../uploads/", carpeta, nameTempFile);
    file.mv(uploadPath, (error) => {
      if (error) {
        console.log(error);
        return reject(`Error en servidor al cargar archivo. Error: ${error}`);
      }
    });
    resolve(nameTempFile);
  });
};

module.exports = { subirArchivo };
