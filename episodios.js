
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


const urlEpisodios = "https://rickandmortyapi.com/api/episode";

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

const crearTarjeta = () => {  //tarjeta de episodios
 let tarjeta = document.createElement('div');
 let nroEpisodio = document.createElement('h5');
 let cuerpoTarjeta = document.createElement('div');
 let nombresEpisodio = document.createElement('a');
 let spanNombreEpisodio = document.createElement('span');
 let descripcionEpisodio = document.createElement('p');
 //asigno clases
 tarjeta.className = "card col-sm col-md col-lg p-0 m-3";
 // tarjeta.style = "width: 18rem;";
 nroEpisodio.className = "numero-episodio";
 cuerpoTarjeta.className = "card-body epìsodio";
 nombresEpisodio.className = "episodio__link";
 nombresEpisodio.href = "#";
 spanNombreEpisodio.className = "episodio__nombre";
 descripcionEpisodio.className = "episodio__descripcion";
 //asigno hijos
 tarjeta.append(nroEpisodio,cuerpoTarjeta);//
 cuerpoTarjeta.append(nombresEpisodio,descripcionEpisodio);
 nombresEpisodio.appendChild(spanNombreEpisodio);
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
const numerosEpisodios = document.querySelectorAll('.numero-episodio');
const nombresEpisodios = document.querySelectorAll('.episodio__nombre');
const descripcionesEpisodios = document.querySelectorAll('.episodio__descripcion');
const botonSiguiente = document.querySelector('.btnSiguiente');
const botonAnterior = document.querySelector('.btnAnterior');
const linksEpisodios = document.querySelectorAll('.episodio__link');

//funcion para accder al episodio especifico y toda la info relacionada
const accederEpisodioEspecifico = (url) => {
 fetch(url)
 .then(res => res.json())
  .then(data => {
   for (let i = 0; i < linksEpisodios.length; i++) {
    linksEpisodios[i].addEventListener('click', (e) => {
     let datos = data.results[i];
     console.log(datos);
     localStorage.setItem('episodioEspecifico', JSON.stringify(datos));
     linksEpisodios[i].href = 'episodio-especifico.html';
     window.location(`${linksEpisodios[i].href}`);
     e.preventDefault();
    }); 
   }
  })
}


//se inserta los episodios por primera vez
fetch(urlEpisodios)
 .then(res => res.json())
 .then(data => {
  for (let i = 0; i < tarjetas.length; i++) {
   animacionGrilla(tarjetas[i]);
   numerosEpisodios[i].textContent = `Episodio ${data.results[i].id}`;
   nombresEpisodios[i].textContent = `${data.results[i].name}`;
   descripcionesEpisodios[i].textContent = `fecha lanzamiento: ${data.results[i].air_date} |
                                            temporada: ${data.results[i].episode}`;
  }
  cantidadDePaginas = data.info.pages; //recupero la cant de pags para la paginacion
  localStorage.setItem('paginaEpisodios','1') //inicializo para poder el valor y seguir con la paginacion
 })
accederEpisodioEspecifico(urlEpisodios);

//funcion para insertar datos de los episodios
const paginacion = async (url) => {
 const resp = await fetch(url);
 const resultado = await resp.json();
 for (let i = 0; i < tarjetas.length; i++) {
  if (resultado.results[i] == undefined) {
   numerosEpisodios[i].textContent = '';
   nombresEpisodios[i].textContent = '';
   descripcionesEpisodios[i].textContent = '';
   tarjetas[i].style = 'background-color :#3E576C; border:none; width:5px';
  }
  else {
   numerosEpisodios[i].textContent = `Episodio ${resultado.results[i].id}`;
   nombresEpisodios[i].textContent = `${resultado.results[i].name}`;
   descripcionesEpisodios[i].textContent = `fecha lanzamiento: ${resultado.results[i].air_date} |
                                            temporada: ${resultado.results[i].episode}`;
   tarjetas[i].style = 'background-color :#5B5B59;';
  }
 }
}

let contadorPaginacion = 1;
botonSiguiente.addEventListener('click', () => {
 if (parseInt(JSON.parse(localStorage.getItem('paginaEpisodios'))) <= cantidadDePaginas) {
  contadorPaginacion++;
  localStorage.setItem('paginaEpisodios', JSON.stringify(contadorPaginacion));
  let nuevaPagina = `${urlEpisodios}?page=${contadorPaginacion}`;
  console.log(`contador siguiente: ${contadorPaginacion}`);
  paginacion(nuevaPagina);
  accederEpisodioEspecifico(nuevaPagina);
 }

 else {
  alert('no hay mas paginas siguientes');
 }
})

botonAnterior.addEventListener('click', () => {
 if (parseInt(JSON.parse(localStorage.getItem('paginaEpisodios'))) > 0) {
  let paginaActual = JSON.parse(localStorage.getItem('paginaEpisodios'));
  contadorPaginacion = parseInt(paginaActual);
  contadorPaginacion--;
  localStorage.setItem('paginaEpisodios', JSON.stringify(contadorPaginacion));
  console.log(`contador anterior: ${contadorPaginacion}`);
  let paginaAnterior = `${urlEpisodios}?page=${contadorPaginacion}`;
  paginacion(paginaAnterior);
  accederEpisodioEspecifico(paginaAnterior);
 }
 else {
  alert('no hay mas paginas anteriores');
 }
})

/*--------------------------busqueda de episodios------------------------------- */

let botonBuscarEpisodio = document.querySelector('.buscador__btn');
botonBuscarEpisodio.href = "#";
let nombreEpisodioParaBuscar = document.querySelector('.buscador__input');
botonBuscarEpisodio.addEventListener('click', () => {
 localStorage.setItem('episodioBuscado', JSON.stringify(nombreEpisodioParaBuscar.value));
 botonBuscarEpisodio.href = "episodio-buscado.html";
 window.location(`${botonBuscarEpisodio.href}`);
})
