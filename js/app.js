const resultado = document.querySelector('#resultado');
const year = document.querySelector('#year');
const transmision = document.querySelector('#transmision');
const puertas = document.querySelector('#puertas');
const marca = document.querySelector('#marca');
const maximo = document.querySelector('#maximo');
const minimo = document.querySelector('#minimo');

const max = new Date().getFullYear();
const min = max-10;




//generar objetos busqueda

const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: '',
}

//eventos
document.addEventListener('DOMContentLoaded', ()=>{
     // mostrar autitos a cargar
    //llena las opciones de año

    selectYear();
    mostrarAutos(autos);

});

marca.addEventListener('change', e =>{
    datosBusqueda.marca = e.target.value;
    filtrarauto();
});

year.addEventListener('change', e=>{
    datosBusqueda.year = parseInt(e.target.value);
     filtrarauto();

});
minimo.addEventListener('change', e=> {
    datosBusqueda.minimo = e.target.value;
    filtrarauto();
    
});
maximo.addEventListener('change', e=>{
    datosBusqueda.maximo = e.target.value;
    filtrarauto();
   
});
puertas.addEventListener('change', e=>{
    datosBusqueda.puertas = parseInt(e.target.value);
    filtrarauto();
    
});
transmision.addEventListener('change', e=>{
    datosBusqueda.transmision = e.target.value;
    filtrarauto();
    
});
color.addEventListener('change', e =>{
    datosBusqueda.color = e.target.value;
    filtrarauto();
});
//funciones
function mostrarAutos(autos){

    limpiarHTML();

    autos.forEach( auto =>{

        //elimino el AUTO.MODELO AUTO.MARCA ETC
        const {marca, modelo, year,precio,puertas,color,transmision} = auto;


        const autoHTML = document.createElement('p');
        autoHTML.textContent =  `
        ${marca} ${modelo} ${year} -
        Precio: ${precio} - Puertas: ${puertas} - Color: ${color} - Transmision:  ${transmision}
        `;
       
     resultado.appendChild(autoHTML);
     resultado.classList.add('border', 'border-green-500', 'text-green-500', 'background-green-500');
    });
}
function selectYear(){

    for(let i = max; i>=min; i--){
      const opcion = document.createElement('option');
      opcion.value = i;
      opcion.textContent = i;
      year.appendChild(opcion);
      
    }

}
function selectTransmision(){
    autos.forEach(auto =>{
      
    const opciontrans = document.createElement('option');
    opciontrans.textContent = `${auto.marca}`;
    transmision.appendChild(opciontrans);
    })
}
function filtrarauto(){
 const resultado = autos
 .filter( filtrarMarca )
 .filter( filtrarYear )
 .filter( filtrarPMin )
 .filter (filtrarPMax)
 .filter(filtrarPuertas)
 .filter(filtrarTransmision)
 .filter (filtrarColor);   /////// PASAMOS AUTO A LA OTRA FUNCION, ESTO SE DENOMINA FUNCION SOBRE OTRA FUNCION


if (resultado.length){
 mostrarAutos(resultado);
}
else {
    noResultado();
}
}

function filtrarMarca(auto){
const {marca} = datosBusqueda; //ASI SACO EL -datosBusqueda.marca ----> y queda marca sola
 if(marca){///NO ESTA VACIO
     return auto.marca === marca;
 }
  return auto;
}
function filtrarYear(auto){
    const {year} = datosBusqueda;
    if(year){///NO ESTA VACIO
        return auto.year === year;
    }
    return auto;
}

 function filtrarPMin(auto){
   const {minimo} = datosBusqueda;
      if (minimo){///NO ESTA VACIO
          return auto.precio >= minimo;

      }
   return auto;
     
}
function filtrarPMax(auto){
    const {maximo} = datosBusqueda;
    if(maximo){///NO ESTA VACIO
        return auto.precio < maximo;
    }
    return auto;
}
function filtrarPuertas(auto){
    const {puertas} = datosBusqueda;
    if(puertas){///NO ESTA VACIO
        return puertas === auto.puertas;
    }
    return auto;
}
function filtrarTransmision(auto){
    const {transmision} = datosBusqueda;
    if(transmision){ ///NO ESTA VACIO
           return auto.transmision === transmision;
    }
    return auto;
}
function filtrarColor(auto){
    const {color} = datosBusqueda;
    if(color){
        return auto.color === color;
    }
    return auto;
}


//LIMPIAR HTML

function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

function noResultado(){
    limpiarHTML();
    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta','error');
    noResultado.textContent = 'NO HAY RESULTADO, INTENTA OTROS TERMINOS';
     resultado.appendChild(noResultado);
}