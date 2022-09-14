const {mdLinks } = require("./index.js");
const  chalk  = require('chalk');

const option = process.argv;
const path = process.argv[2]
const validate = process.argv[3] === "--validate"


//console.log(options)
//console.log(chalk.blueBright(process.argv)) o 【•】_【•】-------------(◕‿◕✿)

const help = `
─ (｡✿‿✿｡) ────────────────────────────────────────────────────────────
              INGGRESE ALGUNA DE LAS SIGUIENTES OPCIONES: 
                     
    Opción 1: path: 
    ---------------
    Es la ruta absoluta o relativa al archivo que retorna los links encontrados con el siguiente detalle : 

        href: URL encontrada.
        text: Texto que aparecía dentro del link (<a>).
        file: Ruta del archivo donde se encontró el link.

    Oopción 2. --validate: 
    ----------------------
    Para veriguar si los links encontrados funcionan o no.

    Oopción 3. --stats: 
    -------------------
    Retorna estadísticas básicas sobre los links:

        Total: Número total de links encontrados.
        Unique: Número de links únicos.

    Oopción 4: --validate --stats: 
    ------------------------------
    Retorna estadísticas que necesitan de los resultados de la validación:
               
       Total: Número total de links encontrados.
       Unique: Número de links únicos.
       Broken: Número de links rotos.
o__________________________________________________________________ (｡✿‿✿｡)o

`
//console.table(help);


//CORRECTO 
// --validate 
if(path === undefined){
    console.log("Ingrese una ruta válida de archivo markdown .md o escriba --help");
}

if(option[2] === "--help"){
    console.log(chalk.cyan(help))


}else{
    const options = validate ? {validate, stats: false} : undefined;
    //console.log(options) //undefined
    console.log(chalk.magenta(`
            ─ (｡✿‿✿｡) ────────────────────────────────────────────────────────
                                LOS LINKS ENCONTRADOS SON:
            o────────────────────────────────────────────────────────── (｡✿‿✿｡)o
            `));
    mdLinks(path, options)   
}
