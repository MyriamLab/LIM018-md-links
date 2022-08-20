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
let absolutePath = path; // guardo la propiedad path en la variable absolutePath 
if (!isAbsolute(path)){ //  si path no es absoluta, conviértela en absoluta
  absolutePath = resolve(path) // llamo a la función resolve(path) es el path que convierto de relativo a absoluto
  console.log("es abosluto")
}
console.log(absolutePath) //  me devuelve en consola la ruta absoluta desde el C

//verificar si el path absoluto existe
if (!pathExits(absolutePath)){
  throw Error("El path indicado no existe");
}

const stats = fs.statSync(absolutePath);
if (stats.isDirectory()){
  console.log("Es un directorio")
}else{
  console.log("Es un archivo")
  if(!mdExtension(absolutePath)){
    throw Error("El archivo indicado no tiene la extensión .md");
  }
}

getLinks(absolutePath);
//const fileStats = fs.statSync(absolutePath);
//console.log(fileStats);
//else {
// console.log("no es absoluto")}
}

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
  const extName = extname(path);
  console.log(extName)
  
  if( extName ==".md"){
    return true;
   
  }else {
    return false;    
  }
}

function getLinks (path){
  const content = fs.readFileSync(path, {encoding: "utf-8"});
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