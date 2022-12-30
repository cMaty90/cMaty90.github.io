
/*-----------------------tratamiento de Sesion de usuario----------------- */
let btnCerrarSesion = document.querySelector('.cerrar-sesion');
let nombreUsuario = JSON.parse(localStorage.getItem('miUsuario'));
let usuario = document.querySelector('.nombre-usuario');
usuario.textContent = `Bienvenido: ${nombreUsuario}`;

btnCerrarSesion.addEventListener('click', () => {
 window.open('index.html');
 window.close();
})


let vectorPersonajesFavoritos = JSON.parse(localStorage.getItem('vectorPersonajesFavoritos'));
for (let i = 0; i < vectorPersonajesFavoritos.length; i++) {
 console.log(vectorPersonajesFavoritos[i].image);
 
}

/*--------------------creacion de tarjetas y grilla---------------------- */
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
 cuerpoTarjeta.append(nombrePersonaje);
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
 for (let i = 0; i < 8; i++) {
 let fila = crearFila();
 contenedor.appendChild(fila);
 for (let j = 0; j < 5; j++) {
  let tarjeta = crearTarjeta();
  fila.appendChild(tarjeta);
  }
 }
}

/*-------------------------tratamiento de Api y datos asociados--------------------------*/

let longitudVector = vectorPersonajesFavoritos.length;
recorrerYAgregarTarjetas();

const tarjetas = document.querySelectorAll('.card');
const imagenes = document.querySelectorAll('.character');
const nombres = document.querySelectorAll('.personaje__nombre');
const linkPersonajes = document.querySelectorAll('.personaje__link');


//cargo las imagenes y los nombres correspondientes
for (let i = 0; i < tarjetas.length; i++) {
 if (vectorPersonajesFavoritos[i] == undefined) {
  imagenes[i].src = '';
  nombres[i].textContent = '';
  tarjetas[i].style = 'background-color :#3E576C; border:none';
 }
 else {
  imagenes[i].src = vectorPersonajesFavoritos[i].image;
  nombres[i].textContent = vectorPersonajesFavoritos[i].name;
  tarjetas[i].style = 'background-color :#5B5B59';
 }
}

for (let i = 0; i < linkPersonajes.length; i++) {
 linkPersonajes[i].addEventListener('click', () => {
  fetch(vectorPersonajesFavoritos[i].url)
   .then(res => res.json())
   .then(data => {
    localStorage.setItem('personajeEspecifico', JSON.stringify(data));
    linkPersonajes[i].href = 'personaje-especifico.html';
    window.location.assign(`${linkPersonajes[i].href}`);
  })
 })
 
}














