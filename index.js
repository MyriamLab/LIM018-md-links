#!/usr/bin/env node
module.exports = () => {
  // ...
};
// Accedo al módulo node:path para trabajar con rutas de archivos y directorios  
const fs = require("node:fs");
const { isAbsolute, resolve, extname } = require('node:path');
//path es la ubicación del archivo 
//options es un objeto con las propiedades: validate y stats
function mdLinks (path, options){
let absolutePath = path; // 1.guardo la propiedad path en la variable absolutePath 
if (!isAbsolute(path)){ //  2.si path no es absoluta, lo convierto en absoluta
  absolutePath = resolve(path) // llamo a la función resolve(path) es el path que convierto de relativo a absoluto
  console.log("es abosluto")
}
console.log(absolutePath) //  me devuelve en consola la ruta absoluta desde el C


if (!pathExits(absolutePath)){  //  3.verificar si el path absoluto existe
  throw Error("El path indicado no existe");
}

//fs.statSync retorna inf. sincrónica de la ruta del archivo dado.
const stats = fs.statSync(absolutePath); 
//console.log(stats); // me devuelve un objeto con detalles de la ruta.
if (stats.isDirectory()){  //  4.verifico si path es archivo o directorio.
  console.log("Es un directorio") 
}else{  
  console.log("Es un archivo")
  if(!mdExtension(absolutePath)){ // 5. si es archivo verifico si no es extensión .md
    throw Error("El archivo indicado no tiene la extensión .md");
  }
}
getLinks(absolutePath); //  6. leo el archivo

//const fileStats = fs.statSync(absolutePath);
//console.log(fileStats);
//else {
// console.log("no es absoluto")}
} //fin mdLinks


function pathExits (path) {
  try{
    fs.statSync(path);
    return true;
  }catch(error){
    return false;
  }
}
//const extName = path.extname('index.html');
//console.log(extName)
function mdExtension (path){
  const extName = extname(path); // path.extname() obtengo la extensión de la ruta del archivo
  console.log(extName)
  
  if(extName == ".md"){
    return true;
  }else {
    return false;    
  }
}

function getLinks (path){
  const content = fs.readFileSync(path, {encoding: "utf-8"}); // sin utf-8 me devuelve el buffer
  //console.log(content) // me devuelve todo el contenido de prueba.md
  const expression = /((https?)(:\/\/)(www\.)?)?([aA-zZ,\., 0-9]+)(\.)([aA-zZ]{2,3})(((\/)([aA-zZ,0-9]+))+(.)([aZ-zZ,0-9]+))?/g; 
  const links = content.match(expression)
  console.log(links)
}

function main () {
    console.log(path)
}


mdLinks("C:/LABORATORIA/2. PROYECTOS/NIVEL 4/prueba.md");
//mdLinks("C:/LABORATORIA/2. PROYECTOS/NIVEL 4/MD-LIKN-FLUJO.mdj");
//mdLinks("./some/example.md") // ruta relativa 
//mdLinks('C:/foo/..') 