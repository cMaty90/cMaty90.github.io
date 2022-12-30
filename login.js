//animacion con GSAP

gsap.from(".clasegsap", {
 duration: 1.5,
  y:-200,
  scale: 0,  
  delay: 0.5, 
  stagger: 0.5,
  ease: "elastic", 
  force3D: true
});

/*------------------------------------------------- */

urlLogin = ' https://api-auth-moby.herokuapp.com/api/user/login';

const validarInicioSesion = (mail, mailResp) => {
 let bandera = false;
 if ((mail != mailResp)) {
  bandera = false;
 }
 else {
  bandera = true;
 }
 return bandera
}

const crearObjetoInciarSesion = () => {
 let usuario;
 let mailUsuario = document.querySelector('.mailInicio');
 let passwordUsuario = document.querySelector('.contrasenia');
 usuario = {
  mail: mailUsuario.value,
  password: passwordUsuario.value
 }
 return usuario
}

const postIniciarSesion = async () => {
 let mailUsario = document.querySelector('.mailInicio').value;
 const nuevoUsuario = crearObjetoInciarSesion();
 try {
  const resp = await fetch(urlLogin, {
   method: 'POST',
   headers: { 'Content-Type': 'application/json; charset=utf-8'},
   body: JSON.stringify(nuevoUsuario)
  })

  if (resp.ok) {
   const resultado = await resp.json();
   let resultadoMail = resultado.data.user.mail;
   let validacion = validarInicioSesion(mailUsario, resultadoMail);
   if (validacion) {
    alert('inicio de sesion exitoso');
    localStorage.setItem('miUsuario', JSON.stringify(resultado.data.user.name));
    window.open('personajes.html');
    window.close();
   }
  }
  else {
   const resultado = await resp.json();
   alert(`error al iniciar sesion: ${resultado.header.error}`)
  }

 }
 catch(e){alert(`mail o contraseña incorrecto`)}
}

let boton = document.querySelector('button');
boton.addEventListener('click', (e) => {
 postIniciarSesion();
 e.preventDefault();
})



