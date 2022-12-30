const urlRegistro = 'https://api-auth-moby.herokuapp.com/api/user/register';

const validarUsuario = (nombre, mail, password, repPassword) => {
 let bandera = false;
 let longitudNombre = nombre.value.length;
 let longitudMail = mail.value.length;
 let longitudPassword = password.value.length;

 if (!(longitudNombre >= 5 && longitudNombre <= 15)) {
  alert('el nombre debe ser de entre 5 y 15 caracteres')
  bandera = false;
 }
 else if (!(longitudMail >= 10 && longitudMail <= 50)) {
  alert('el mail debe ser de entre 10 y 50 caracteres');
  bandera = false;
 }
 else if (!(longitudPassword >= 8 && longitudPassword <= 30)) {
  alert('la contraseña debe de ser entre 8 y 30 caracteres');
  bandera = false;
 }
 else if (!(password.value == repPassword.value)) {
  alert('las contraseñas no coinciden');
  bandera = false;
 }
 else {
  console.log('validacion correcta');
  bandera = true;
 }
 return bandera
}

const crearObjetoUsuario = () => {
 let nuevoUsuario;
 let nombreUsuario = document.querySelector('.nombre-usuario');
 let mailUsuario = document.querySelector('.mail-usuario');
 let passwordUsuario = document.querySelector('.password-usuario');
 let repPassword = document.querySelector('.rep-password-usuario');

 let validacion = validarUsuario(nombreUsuario, mailUsuario, passwordUsuario, repPassword);
 if (validacion) {
  nuevoUsuario = {
   name: nombreUsuario.value.toString(),
   mail: mailUsuario.value.toString(),
   password: passwordUsuario.value.toString()
  }
 }
 return nuevoUsuario
}

const postUsuario = async () => {
 const nuevoUsuario = crearObjetoUsuario();

 try {
  const resp = await fetch(urlRegistro, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8'},
  body: JSON.stringify(nuevoUsuario),
  mode:'cors'
  })
  if (resp.ok) {
   const resultado = await resp.json();
   console.log(resultado);
   if (resultado.header.resultCode == 0) {
    alert(`${resultado.header.message}`)
   }
  }
 }
 catch(error){alert(`ocurrio un error: ${error}`)}
}

let botonSubmit = document.querySelector('button');
botonSubmit.addEventListener('click', (e) => {
 postUsuario();
 e.preventDefault();
})





 //--------------------------------------------------------------
 //version anterior de funcion validarUsuario()
 // if ((longitudNombre >= 5 && longitudNombre <= 15) &&
 //  (longitudMail >= 10 && longitudMail <= 50) &&
 //  (longitudPassword >= 8 && longitudPassword <= 30) &&
 //  (password.value == repPassword.value)
 // ) {
 //  bandera = true;
 //  console.log('validacion correcta');
 // }
 // else {
 //  bandera = false;
 //  console.log('validacion incorrecta');
 // }

 //--------------------------------------------------------------

















