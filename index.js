#!/usr/bin/env node
const fs = require("node:fs");
const { isAbsolute, resolve, extname } = require('node:path');
const axios = require("axios");
const { request } = require("node:https");

//options es un objeto con las propiedades: validate y stats
function mdLinks (path, options = {validate: false, stats: false}){
  return new Promise((resolve, reject)=>{
    const {validate, stats} = options;
    let absolutePath = path; // 1.guardo la propiedad path en la variable absolutePath 
    if (!isAbsolute(path)){ //  2.si path no es absoluta, lo convierto en absoluta
      absolutePath = resolve(path) // llamo a la función resolve(path) es el path que convierto de relativo a absoluto
      //console.log("es abosluto")
    }
    //console.log(absolutePath) //  me devuelve en consola la ruta absoluta desde el C
  
  
    if (!pathExits(absolutePath)){  //  3.verificar si el path absoluto existe
      reject(Error("El path indicado no existe"));
    }
  
    //fs.statSync retorna inf. sincrónica de la ruta del archivo dado.
    const stat = fs.statSync(absolutePath); 
    //console.log(stats); // me devuelve un objeto con detalles de la ruta.
    if (stat.isDirectory()){  //  4.verifico si path es archivo o directorio.
      console.log("Es un directorio") 
    }else{  
      //console.log("Es un archivo")
      if(!mdExtension(absolutePath)){ // 5. si es archivo verifico si no es extensión .md
        reject(Error("El archivo indicado no tiene la extensión .md"));
      }
    }
    const links = getLinks(absolutePath); //  6. me devuelve un array con todos los links  encontrados 
    if (validate){ //si recibimos la propiedad validate como true dentro de options, tengo que validar la promesa, osea los href de los links
    const linksPromise = validateLinks(links) // para validar los links en caso sea true, llamo a la función validateLinks y le paso los links sin validar 
    //console.log("devuelve", linksPromise) // me devuelve una promesa pendiente
      linksPromise
        .then((result)=>{resolve(result)}) //resuelve un arreglo
        .catch(error => {reject(error)});
    }else{ // si no envío los links
      resolve(links);
    }
  })
  //const fileStats = fs.statSync(absolutePath);
  //console.log(fileStats);
  //else {
  // console.log("no es absoluto")}
} //fin mdLinks


//FUNCIONES

function pathExits (path) {
  try{
    fs.statSync(path); // path is file: true // path is directory: false
    return true;
  }catch(error){
    return false;
  }
}
  //const extName = path.extname('index.html');
  //console.log(extName)
function mdExtension (path){
  const extName = extname(path); // path.extname() obtengo la extensión de la ruta del archivo
  //console.log(extName)
  
  if(extName == ".md"){
    return true;
  }else {
    return false;    
  }
}

function getLinks (path){
  const content = fs.readFileSync(path, {encoding: "utf-8"}); // sin utf-8 me devuelve el buffer
  //console.log(content) // me devuelve todo el contenido de prueba.md
  const expLinks = /\[(.+)\](\(.+\))/g;
  const expText = /\[.+\]/;
  const expHref = /\(.+\)/;

  const links = content.match(expLinks)
 // console.log("soy links",links)

  const formatLinks = links.map((link)=>({
    href: link.match(expHref)[0].slice(1, -1),
    text: link.match(expText)[0].slice(1, -1),
    file: path,
  }))
 //console.log(formatLinks); //"soy formatLinks", 
 return formatLinks;
}

function validateLinks(links){  // recibimos los links que tienen las url sin validar
  // console.log("dentro de validateLins", links)
   const formatResult = []; // agrego los links de la respuesta a la consulta: status si existe y ok:ok / ok:fail
   const requests = Promise.all(links.map((link)=> { // promesa de promesa que espera se resuelva varias promesas.Las se van a generar al llamar a .map cuando recorro c/link y creo una promesa por c/u
      return  axios.get(link.href)
      .then(result =>{ // le agrego el sgte. objeto
       formatResult.push({...link, status:result.status, ok:"ok"})
     }).catch((error)=> {
       formatResult.push({...link, status:error.response?.status, ok:"fail"})
     })
   })); 
     return new Promise((resolve, reject)=> {
       requests.then(()=>{
       // console.log("Soy formatResult",formatResult)
         resolve(formatResult)
       }).catch((error)=> {
         reject(error)
     })
     })
 }
function main () {
    console.log(path)
}

module.exports = {
  pathExits,
  mdExtension,
  getLinks,
  validateLinks,
  mdLinks,
  
};

/*
mdLinks("C:/LABORATORIA/2. PROYECTOS/NIVEL 4/prueba.md", {validate:true}).then(result =>{
  console.log(result)
});
*/


//mdLinks("C:/LABORATORIA/2. PROYECTOS/NIVEL 4/MD-LIKN-FLUJO.mdj");
//mdLinks("./some/example.md") // ruta relativa 
//mdLinks('C:/foo/..') 