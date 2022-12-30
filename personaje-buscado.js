
let urlPaginacion = "https://rickandmortyapi.com/api/character";

let nombrePersonajeBuscado = JSON.parse(localStorage.getItem('personajeBuscado'));
let urlPagina = `https://rickandmortyapi.com/api/character?name=${nombrePersonajeBuscado}`;

/*-----------------------tratamiento de Sesion de usuario----------------- */
let btnCerrarSesion = document.querySelector('.cerrar-sesion');
let nombreUsuario = JSON.parse(localStorage.getItem('miUsuario'));
let usuario = document.querySelector('.nombre-usuario');
usuario.textContent = `Bienvenido: ${nombreUsuario}`;

btnCerrarSesion.addEventListener('click', () => {
 window.open('index.html');
 window.close();
})

/*----------------creacion de tarjetas y grilla para personajes encontrados------------ */

const contenedor = document.querySelector('.container');

const crearTarjeta = () => {  //tarjeta de personajes
 let tarjeta = document.createElement('div');
 let imagenTarjeta = document.createElement('img');
 let cuerpoTarjeta = document.createElement('div');
 let nombrePersonaje = document.createElement('a');
 let spanNombrePersonaje = document.createElement('span');
 //asigno clases
 tarjeta.className = "card col-sm col-md col-lg p-0 m-3";
 // tarjeta.style = "width: 18rem;";
 imagenTarjeta.className = "card-img-top character";
 cuerpoTarjeta.className = "card-body personaje";
 nombrePersonaje.className = "personaje__link";
 nombrePersonaje.href = "#";
 spanNombrePersonaje.className = "personaje__nombre";
 //asigno hijos
 tarjeta.append(imagenTarjeta, cuerpoTarjeta);
 cuerpoTarjeta.appendChild(nombrePersonaje);
 nombrePersonaje.appendChild(spanNombrePersonaje);
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
const imagenes = document.querySelectorAll('.character');
const nombres = document.querySelectorAll('.personaje__nombre');
const linkPersonajes = document.querySelectorAll('.personaje__link');
const botonSiguiente = document.querySelector('.btnSiguiente');
const botonAnterior = document.querySelector('.btnAnterior');

//funcion para accder al personaje especifico y toda la info relacionada
const accederPersonajeEspecifico = (url) => {
 fetch(url)
 .then(res => res.json())
  .then(data => {
   for (let i = 0; i < linkPersonajes.length; i++) {
   linkPersonajes[i].addEventListener('click', (e) => {
    let datos = data.results[i];
    console.log(datos);
    localStorage.setItem('personajeEspecifico', JSON.stringify(datos));
    linkPersonajes[i].href = 'personaje-especifico.html';
    window.location(`${linkPersonajes[i].href}`);
    e.preventDefault();
    }); 
   }
  })
}

//se inserta los personajes por primera vez
fetch(urlPagina)
 .then(res => res.json())
 .then(data => {
  for (let i = 0; i < tarjetas.length; i++) {
   if (data.results[i]==undefined) {
    imagenes[i].src = '';
    nombres[i].textContent = '';
    tarjetas[i].style = 'background-color :#3E576C; border:none';
   }
   else {
    imagenes[i].src = data.results[i].image;
    imagenes[i].className = 'img-fluid';
    nombres[i].textContent = data.results[i].name;
    tarjetas[i].style = 'background-color :#5B5B59';
   }
  }
  cantidadDePaginas = data.info.pages; //recupero la cantidad de paginas para la navegacion
  console.log(cantidadDePaginas);
  localStorage.setItem('paginaPersonajeBuscado', '1');
 })
accederPersonajeEspecifico(urlPagina);

//funcion para insertar imagenes y nombre
const paginacion = async (url) => {
 const resp = await fetch(url);
 const resultado = await resp.json();
 for (let i = 0; i < tarjetas.length; i++) {
  console.log(resultado.results[i]); 
  if (resultado.results[i]==undefined) {
   imagenes[i].src = '';
   nombres[i].textContent = '';
   tarjetas[i].style = 'background-color :#3E576C; border:none';
  }
  else {
   imagenes[i].src = resultado.results[i].image;
   imagenes[i].className = 'img-fluid';
   nombres[i].textContent = resultado.results[i].name;
   tarjetas[i].style = 'background-color :#5B5B59;';
  }
 }
}

//evento del boton siguiente
let contadorPaginacion = 1;
botonSiguiente.addEventListener('click', () => {
 if (parseInt(JSON.parse(localStorage.getItem('paginaPersonajeBuscado'))) <= cantidadDePaginas) {
  contadorPaginacion++;
  localStorage.setItem('paginaPersonajeBuscado', JSON.stringify(contadorPaginacion));
  let nuevaPagina = `${urlPaginacion}?page=${contadorPaginacion}&name=${nombrePersonajeBuscado}`;
  console.log(`contador siguiente: ${contadorPaginacion}`);
  paginacion(nuevaPagina);
  accederPersonajeEspecifico(nuevaPagina);
 }
 else {
  alert('no hay mas paginas siguientes');
 }
})

//evento del boton anterior
botonAnterior.addEventListener('click', () => {
 if (parseInt(JSON.parse(localStorage.getItem('paginaPersonajeBuscado'))) > 0) {
  let paginaActual = JSON.parse(localStorage.getItem('paginaPersonajeBuscado'));
  contadorPaginacion = parseInt(paginaActual);
  contadorPaginacion--;
  localStorage.setItem('paginaPersonajeBuscado', JSON.stringify(contadorPaginacion));
  console.log(`contador anterior: ${contadorPaginacion}`);
  let paginaAnterior = `${urlPaginacion}?page=${contadorPaginacion}&name=${nombrePersonajeBuscado}`;
  paginacion(paginaAnterior);
  accederPersonajeEspecifico(paginaAnterior);
 }
 else {
  alert('no hay mas paginas anteriores');
 }
})
