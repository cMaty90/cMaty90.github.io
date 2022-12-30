
/*-----------------------tratamiento de Sesion de usuario----------------- */
let btnCerrarSesion = document.querySelector('.cerrar-sesion');
let nombreUsuario = JSON.parse(localStorage.getItem('miUsuario'));
let usuario = document.querySelector('.nombre-usuario');
usuario.textContent = `Bienvenido: ${nombreUsuario}`;

btnCerrarSesion.addEventListener('click', () => {
 window.open('index.html');
 window.close();
})

let datosEpisodioEspecifico = JSON.parse(localStorage.getItem('episodioEspecifico'));
// console.log(datosEpisodioEspecifico);

const nombreEpisodio = document.querySelector('.nombre-episodio');
const fechaLanzamiento = document.querySelector('.fecha-lanzamiento');
const episodio = document.querySelector('.episodio');

nombreEpisodio.textContent = `Nombre Del Episodio: ${datosEpisodioEspecifico.name}`;
fechaLanzamiento.textContent = `Fecha De Lanzamiento: ${datosEpisodioEspecifico.air_date}`;
episodio.textContent = `Epìsodio: ${datosEpisodioEspecifico.episode}`;

/*----------------------------------------------------------------------------------------*/
//creacion de etiquetas <a> con los personajes del episodio

let contenedorLinksEpisodios = document.querySelector('.links-personajes');

const crearLinkPersonaje = () => {
 let link;
 link = document.createElement('a');
 link.className = 'link-personaje mt-1'; //solo para la creacion de las columnas
 return link
}

let columnas = document.querySelectorAll('.col');

//recorro las columnas y dentro, creo las etiquetas <a></a>
for (let i = 0; i < columnas.length; i++) {
 for (let j = 0; j < 20; j++) {
  let link = crearLinkPersonaje();
  columnas[i].appendChild(link);
 }
}

let vectorUrlPersonajes = [];
vectorUrlPersonajes = datosEpisodioEspecifico.characters;

//selecciono las etiquetas <a> (me devolvera un vector)
let etiquetasPersonajes = document.querySelectorAll('.link-personaje');

const cargarPersonajesEpisodioEspecifico = async () => {
 for (let i = 0; i < vectorUrlPersonajes.length; i++) {
  const resp = await fetch(vectorUrlPersonajes[i]);
  const resultado = await resp.json();
  etiquetasPersonajes[i].textContent = resultado.name;
  etiquetasPersonajes[i].href = '#';
  etiquetasPersonajes[i].addEventListener('click', () => {
   localStorage.setItem('personajeEspecifico', JSON.stringify(resultado));
   etiquetasPersonajes[i].href = "personaje-especifico.html";
   window.location(`${etiquetasPersonajes[i].href}`);
  })
 }
}
cargarPersonajesEpisodioEspecifico()

