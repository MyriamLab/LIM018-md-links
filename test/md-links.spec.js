const { pathExits, mdExtension, getLinks } = require('../index.js');

// función pathExists
describe('pathExits', () => {    
  it("Debería ser una función", () => {
    expect(typeof pathExits).toBe("function");
  });

  it('Si la ruta existe, debe retornar true', () => {
    // DADO - todo lo que necesitamos para ejecutar las funciones de nuestras pruebas, mokcs, variable, parametros para las funciones..
    let ruta = 'C:/LABORATORIA/2. PROYECTOS/NIVEL 4/prueba.md';

    // CUANDO - ejecutar una o varias funciones segun lo que estamos probando
    const loQueRetornaPathExits = pathExits(ruta)

    // ENTONCES - evaluamos los resultados de la ejecucion del paso anterior. los expects()
    expect(loQueRetornaPathExits).toBe(true);
  });

  it('Debería retornar false si la ruta existe', () => {
    let ruta = 'C:/fo..'
    expect(pathExits(ruta)).toBe(false);
}); 
})


describe("mdExtension", () => {
  it("Debería ser una función", () => {
     // DADO - todo lo que necesitamos para ejecutar las funciones de nuestras pruebas, mokcs, variable, parametros para las funciones..
    expect(typeof mdExtension).toBe("function");
  });
  
  it('Si la extensión es .md, debe retornar true', () => {
    let extension = 'C:/LABORATORIA/2. PROYECTOS/NIVEL 4/prueba.md';
    expect(mdExtension(extension)).toBeTruthy();
  });

  it('Si la extensión no es .md, debe retornar false', () => {
    let extension = 'C:/LABORATORIA/2. PROYECTOS/NIVEL 4/prueba.txt'
    expect(mdExtension(extension)).toBeFalsy();
});
})

// función getLinks
describe('getLinks', () => {    
  it("Debería ser una función", () => {
    expect(typeof getLinks).toBe("function");
  });

  it('Al leer el archivo, debe retornar links', () => {
    // DADO - todo lo que necesitamos para ejecutar las funciones de nuestras pruebas, mokcs, variable, parametros para las funciones..
    let ruta = 'C:/LABORATORIA/2. PROYECTOS/NIVEL 4/prueba.md';
    let links = '[Node.js]https://nodejs.org/api/fs.';
   

    // CUANDO - ejecutar una o varias funciones segun lo que estamos probando
    const loQueRetornagetLinks = getLinks(ruta)
    
    // ENTONCES - evaluamos los resultados de la ejecucion del paso anterior. los expects()
    expect(loQueRetornagetLinks).toBe(links);
  });

})


/*
describe('mdLinks', () => {

  it('should...', () => {                                                                                             
    console.log('FIX ME!');
  });
});

*/