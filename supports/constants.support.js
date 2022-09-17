const help = `
───────────────────────────────────────────────────────────────────────────────────────────────────────
              
                (｡✿‿✿｡)  ¡Bienvenido a la librería mdLinks! 
    
     A continuación se muestras todas la opciones válidas para obtener la información deseada:  
                     
     OPCIÓN 1. Para obtener los links encontrados en el archivo markdow, ingrese una ruta absoluta o relativa.
     
     Ejemplo: mdLinks <path.md> la cual retornará:

        href: URL encontrada.
        text: Texto que aparece dentro del link (<a>).
        file: Ruta del archivo donde se encontra el link.


    OPCIÓN 2. Para conocer el status de los links si funcionn o no. Ingrese el path seguido de la opción --validate.

    Ejemplo: mdLinks <path.md> --validate

  
    OPCIÓN 3. Para conocer las estadísticas de los links, ingrese la opción --stats.

    Ejemplo: mdLinks <path.md> --validate
   
        Total: Número total de links encontrados.
        Unique: Número de links únicos.

    OPCIÓN 4. También puede combinar las opciones y retornar estadísticas que 
    necesitan de los resultados de la   validación--validate --stats: 
             
    Ejemplo: mdLinks <path.md> --validate --stats  ó  mdLinks <path.md> --stats --validate

       Total: Número total de links encontrados.
       Unique: Número de links únicos.
       Broken: Número de links rotos.
       
o____________________________________________________________________________ (｡✿‿✿｡)o
`;

const pathError = 'Ingrese una ruta válida de archivo markdown .md o escriba --help';

const resultMessage = `
─ (｡✿‿✿｡) ────────────────────────────────────────────────────────
                    LOS LINKS ENCONTRADOS SON:
o────────────────────────────────────────────────────────── (｡✿‿✿｡)o
`;

const resultValidateMessage = `
─ (｡✿‿✿｡) ────────────────────────────────────────────────────────
                    LOS LINKS VALIDADOS SON:
o────────────────────────────────────────────────────────── (｡✿‿✿｡)o
`;

module.exports = { help, pathError, resultMessage, resultValidateMessage }