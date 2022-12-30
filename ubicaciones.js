
//animacion con GSAP
const animacionGrilla = (etiqueta) => {
 gsap.to(etiqueta,1, {
    scale: 0.1, 
    y: 60,
    yoyo: true, 
    repeat: 1, 
    delay: 0,
   stagger: {
     ease: "power1.inOut",
     amount: 1.5,
     axis:"x",
     grid: "auto",
     from: "end"
    }
  });
}

const urlUbicaciones = "https://rickandmortyapi.com/api/location";

/*-----------------------tratamiento de Sesion de usuario----------------- */
let btnCerrarSesion = document.querySelector('.cerrar-sesion');
let nombreUsuario = JSON.parse(localStorage.getItem('miUsuario'));
let usuario = document.querySelector('.nombre-usuario');
usuario.textContent = `Bienvenido: ${nombreUsuario}`;

btnCerrarSesion.addEventListener('click', () => {
 window.open('index.html');
 window.close();
})

/*--------------------creacion de tarjetas y grilla---------------------- */

const contenedor = document.querySelector('.container');

const crearTarjeta = () => {  //tarjeta de ubicaciones
 let tarjeta = document.createElement('div');
 let nombreUbicacion = document.createElement('h5');
 let cuerpoTarjeta = document.createElement('div');
 let tipoUbicacion = document.createElement('a');
 let spanTipoUbicacion = document.createElement('span');
 let dimensionUbicacion = document.createElement('p');
 //asigno clases
 tarjeta.className = "card col-sm col-md col-lg p-0 m-3";
 // tarjeta.style = "width: 18rem;";
 nombreUbicacion.className = "nombre-ubicacion";
 cuerpoTarjeta.className = "card-body ubicacion";
 tipoUbicacion.className = "ubicacion__link";
 tipoUbicacion.href = "#";
 spanTipoUbicacion.className = "ubicacion__tipo";
 dimensionUbicacion.className = "ubicacion__dimension ";
 //asigno hijos
 tarjeta.append(nombreUbicacion,cuerpoTarjeta);//
 cuerpoTarjeta.append(tipoUbicacion,dimensionUbicacion);
 tipoUbicacion.appendChild(spanTipoUbicacion);
 return tarjeta
}

const crearFila = () => {
 let fila = document.createElement('div');
 fila.className = "row";
 return fila
}

//creo filas, las recorro y les agrego 5 tarjetas
const recorrerYAgregarTarjetas = () => {
 for (let i = 0; i < 4; i++) {
 let fila = crearFila();
 contenedor.appendChild(fila);
 for (let j = 0; j < 5; j++) {
  let tarjeta = crearTarjeta();
  fila.appendChild(tarjeta);
  }
 }
}
recorrerYAgregarTarjetas();

/*-------------------------tratamiento de Api y datos asociados--------------------------*/

let cantidadDePaginas;

const tarjetas = document.querySelectorAll('.card');
const nombresUbicaciones = document.querySelectorAll('.nombre-ubicacion');
const tiposUbicaciones = document.querySelectorAll('.ubicacion__tipo');
const dimensionesUbicaciones = document.querySelectorAll('.ubicacion__dimension');
const botonSiguiente = document.querySelector('.btnSiguiente');
const botonAnterior = document.querySelector('.btnAnterior');
const linksUbicaciones = document.querySelectorAll('.ubicacion__link');

//funcion para accder a la ubicacion especifica y toda la info relacionada
const accederUbicacionEspecifica = (url) => {
 fetch(url)
 .then(res => res.json())
  .then(data => {
   for (let i = 0; i < linksUbicaciones.length; i++) {
    linksUbicaciones[i].addEventListener('click', (e) => {
     let datos = data.results[i];
     localStorage.setItem('ubicacionEspecifica', JSON.stringify(datos));
     linksUbicaciones[i].href = 'ubicacion-especifica.html';
     window.location(`${linksUbicaciones[i].href}`);
     e.preventDefault();
    }); 
   }
  })
}

//se insertan las ubicaciones por primera vez
fetch(urlUbicaciones)
 .then(res => res.json())
 .then(data => {
  for (let i = 0; i < tarjetas.length; i++) {
   animacionGrilla(tarjetas[i]);
   nombresUbicaciones[i].textContent = `${data.results[i].name}`;
   tiposUbicaciones[i].textContent = `${data.results[i].type}`;
   dimensionesUbicaciones[i].textContent = `dimension: ${data.results[i].dimension}`;
  }
  cantidadDePaginas = data.info.pages; //recupero la cant de pags para la paginacion
  localStorage.setItem('paginaUbicaciones','1') //inicializo para poder el valor y seguir con la paginacion
 })
accederUbicacionEspecifica(urlUbicaciones);

 //funcion para insertar datos de las tarjetas
const paginacion = async (url) => {
 const resp = await fetch(url);
 const resultado = await resp.json();
 for (let i = 0; i < tarjetas.length; i++) {
  if (resultado.results[i]==undefined) {
   nombresUbicaciones[i].textContent = '';
   tiposUbicaciones[i].textContent = '';
   dimensionesUbicaciones[i].textContent = '';
   tarjetas[i].style = 'background-color :#3E576C; border:none; width:5px';
  }
  else {
   nombresUbicaciones[i].textContent = `${resultado.results[i].name}`;
   tiposUbicaciones[i].textContent = `${resultado.results[i].type}`;
   dimensionesUbicaciones[i].textContent = `dimension: ${resultado.results[i].dimension}`;
   tarjetas[i].style = 'background-color :#5B5B59;';
  }
 }
}

let contadorPaginacion = 1;
botonSiguiente.addEventListener('click', () => {
 if (parseInt(JSON.parse(localStorage.getItem('paginaUbicaciones'))) <= cantidadDePaginas) {
  contadorPaginacion++;
  localStorage.setItem('paginaUbicaciones', JSON.stringify(contadorPaginacion));
  let nuevaPagina = `${urlUbicaciones}?page=${contadorPaginacion}`;
  console.log(`contador siguiente: ${contadorPaginacion}`);
  paginacion(nuevaPagina);
 }

 else {
  alert('no hay mas paginas siguientes');
 }
})

botonAnterior.addEventListener('click', () => {
 if (parseInt(JSON.parse(localStorage.getItem('paginaUbicaciones'))) > 0) {
  let paginaActual = JSON.parse(localStorage.getItem('paginaUbicaciones'));
  contadorPaginacion = parseInt(paginaActual);
  contadorPaginacion--;
  localStorage.setItem('paginaUbicaciones', JSON.stringify(contadorPaginacion));
  console.log(`contador anterior: ${contadorPaginacion}`);
  let paginaAnterior = `${urlUbicaciones}?page=${contadorPaginacion}`;
  paginacion(paginaAnterior);
 }
 else {
  alert('no hay mas paginas anteriores');
 }
})

/*--------------------------busqueda de ubicacion------------------------------- */
let botonBuscarUbicacion = document.querySelector('.buscador__btn');
botonBuscarUbicacion.href = "#";
let nombreUbicacionParaBuscar = document.querySelector('.buscador__input');
botonBuscarUbicacion.addEventListener('click', () => {
 localStorage.setItem('ubicacionBuscada', JSON.stringify(nombreUbicacionParaBuscar.value));
 botonBuscarUbicacion.href = "ubicacion-buscada.html";
 window.location(`${botonBuscarUbicacion.href}`);
})

