const { pathExits, mdExtension, getLinks, validateLinks } = require('../index.js');
const axios = require("axios");

//jest.mock("axios")
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

// función mextension
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

  it('Retorna un array con un objeto con las propiedades href, text y file', () => {
    // DADO - todo lo que necesitamos para ejecutar las funciones de nuestras pruebas, mokcs, variable, parametros para las funciones..
    let ruta = 'C:/LABORATORIA/2. PROYECTOS/NIVEL 4/prueba.md';
    const arrayOfLinks = [{
      href: "https://nodejs.org/",
      text: "Node.js",
      file: ruta
    },
    {
      href: "https://breakdance.github.io/breakdance/",
      text: "Breakdance",
      file: ruta
    },
    {
      href: "https://pburguer123.com",
      text: "Axios",
      file: ruta
    }
  ];
    expect(getLinks(ruta)).toStrictEqual(arrayOfLinks);
  });
});

// función validateLinks
describe("validateLinks", () =>{
  it("Debería ser una función", () => {
    expect(typeof validateLinks).toBe("function");
  });
 
  
  it('Debería retornar links válidos ', async () =>{
    // DADO
    let ruta = 'C:/LABORATORIA/2. PROYECTOS/NIVEL 4/prueba.md';
    const arrayOfLinks = [{
        href: "https://nodejs.org/",
        text: "Node.js",
        file: ruta
      },
      {
        href: "https://breakdance.github.io/breakdance/",
        text: "Breakdance",
        file: ruta
      },
      {
        href: "https://pburguer123.com",
        text: "Axios",
        file: ruta
      }
    ];
    axios.get.mockResolvedValue({status: 200})

    // CUANDO
    const result = await validateLinks(arrayOfLinks)

    // ENTONCES
  });

});


