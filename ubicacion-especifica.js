
/*-----------------------tratamiento de Sesion de usuario----------------- */
let btnCerrarSesion = document.querySelector('.cerrar-sesion');
let nombreUsuario = JSON.parse(localStorage.getItem('miUsuario'));
let usuario = document.querySelector('.nombre-usuario');
usuario.textContent = `Bienvenido: ${nombreUsuario}`;

btnCerrarSesion.addEventListener('click', () => {
 window.open('index.html');
 window.close();
})
//----------------------------------------------------------------------

let datosUbicacionEspecifica = JSON.parse(localStorage.getItem('ubicacionEspecifica'));

const nombreUbicacion = document.querySelector('.nombre-ubicacion');
const tipoUbicacion = document.querySelector('.tipo-ubicacion');
const dimensionUbicacion = document.querySelector('.dimension-ubicacion');

nombreUbicacion.textContent = `Nombre Ubicacion: ${datosUbicacionEspecifica.name}`;
tipoUbicacion.textContent = `Tipo Ubicacion: ${datosUbicacionEspecifica.type}`;
dimensionUbicacion.textContent = `Dimension: ${datosUbicacionEspecifica.dimension}`;

/*----------------------------------------------------------------------------------------*/

let contenedorLinksUbicaciones = document.querySelector('.links-residentes');

const crearLinkResidente = () => {
 let link;
 link = document.createElement('a');
 link.className = 'link-residente mt-1'; //solo para la creacion de las columnas
 return link
}

let columnas = document.querySelectorAll('.col');

//recorro las columnas y dentro, creo las etiquetas <a></a>
for (let i = 0; i < columnas.length; i++) {
 for (let j = 0; j < 26; j++) {
  let link = crearLinkResidente();
  columnas[i].appendChild(link);
 }
}

let vectorUrlResidentes = [];
vectorUrlResidentes = datosUbicacionEspecifica.residents;

let etiquetasResidentes = document.querySelectorAll('.link-residente');

const cargarResidenteUbicacionEspecifica = async () => {
 for (let i = 0; i < vectorUrlResidentes.length; i++) {
  const resp = await fetch(vectorUrlResidentes[i]);
  const resultado = await resp.json();
  etiquetasResidentes[i].textContent = resultado.name;
  etiquetasResidentes[i].href = '#';
  etiquetasResidentes[i].addEventListener('click', () => {
   localStorage.setItem('personajeEspecifico', JSON.stringify(resultado));
   etiquetasResidentes[i].href = "personaje-especifico.html";
   window.location(`${etiquetasResidentes[i].href}`);
  })
 }
}
cargarResidenteUbicacionEspecifica()