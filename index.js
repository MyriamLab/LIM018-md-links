#!/usr/bin/env node
module.exports = () => {
  // ...
};

// Accedo al módulo node:path para trabajar con rutas de archivos y directorios  
const { isAbsolute, resolve } = require('node:path'); 

//path es la ubicación del archivo 
//options es un objeto con las propiedades: validate y stats

function mdLinks (path, options){
let absolutePath = path;
// validaciones de opciones
// validación de path 
if (!isAbsolute(path)){
  absolutePath = resolve(path)
  console.log("es abosluto")
}
console.log(absolutePath)
//else {
// console.log("no es absoluto")}

// abrir
// ....
}

function main () {
    console.log(path)
}

mdLinks("./some/example.md")
//mdLinks('C:/foo/..')