#!/usr/bin/env node

// Accedo al módulo node:path para trabajar con rutas de archivos y directorios  
const fs = require("node:fs");
const { isAbsolute, resolve, extname } = require('node:path');
const axios = require("axios");
const { request } = require("node:https");
//path es la ubicación del archivo 

//options es un objeto con las propiedades: validate y stats
function mdLinks (path, options = {validate: false, stats: false}){
  return new Promise((resolve, reject)=>{
    const {validate, stats} = options;
    let absolutePath = path; // 1.guardo la propiedad path en la variable absolutePath 
    if (!isAbsolute(path)){ //  2.si path no es absoluta, lo convierto en absoluta
      absolutePath = resolve(path) // llamo a la función resolve(path) es el path que convierto de relativo a absoluto
      console.log("es abosluto")
    }
    console.log(absolutePath) //  me devuelve en consola la ruta absoluta desde el C
  
  
    if (!pathExits(absolutePath)){  //  3.verificar si el path absoluto existe
      reject(Error("El path indicado no existe"));
    }
  
    //fs.statSync retorna inf. sincrónica de la ruta del archivo dado.
    const stat = fs.statSync(absolutePath); 
    //console.log(stats); // me devuelve un objeto con detalles de la ruta.
    if (stat.isDirectory()){  //  4.verifico si path es archivo o directorio.
      console.log("Es un directorio") 
    }else{  
      console.log("Es un archivo")
      if(!mdExtension(absolutePath)){ // 5. si es archivo verifico si no es extensión .md
        reject(Error("El archivo indicado no tiene la extensión .md"));
      }
    }
    const links = getLinks(absolutePath); //  6. leo el archivo
    if (validate){
    const linksPromise = validateLinks(links)
      linksPromise
        .then((result)=>{resolve(result)})
        .catch(error => {reject(error)});
    }else{
      resolve(links);
    }
  
  })
 

  //const fileStats = fs.statSync(absolutePath);
  //console.log(fileStats);
  //else {
  // console.log("no es absoluto")}
} //fin mdLinks

function validateLinks(links){
  const formatResult = [];
  const requests = Promise.all(links.map((link)=> {
     return  axios.get(link.href).then(result =>{
      formatResult.push({...link, status:result.status, ok:"ok"})
    }).catch((error)=> {
      formatResult.push({...link, status:error.response?.status, ok:"fail"})
    })
  })); 
    return new Promise((resolve, reject)=> {
      requests.then(()=>{
        //console.log(formatResult)
        resolve(formatResult)
      }).catch((error)=> {
        reject(error)
    })
    })
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
  const expLinks = /\[(.+)\](\(.+\))/g;
  const expText = /\[.+\]/;
  const expHref = /\(.+\)/;

  const links = content.match(expLinks)
  //console.log(links)

  const formatLinks = links.map((link)=>({
    href: link.match(expHref)[0].slice(1, -1),
    text: link.match(expText)[0].slice(1, -1),
    file: path,
  }))
 //console.log(formatLinks);
 return formatLinks;
}

function main () {
    console.log(path)
}

module.exports = {
  pathExits,
  mdExtension,
  getLinks
};


mdLinks("C:/LABORATORIA/2. PROYECTOS/NIVEL 4/prueba.md", {validate:true}).then(result =>{
  console.log(result)
});
//mdLinks("C:/LABORATORIA/2. PROYECTOS/NIVEL 4/MD-LIKN-FLUJO.mdj");
//mdLinks("./some/example.md") // ruta relativa 
//mdLinks('C:/foo/..') 