document.addEventListener('DOMContentLoaded', () =>{

let boton = document.getElementById('inicio');
boton.addEventListener('click', ()=>{
// let usuario = document.getElementById('usuario').value;
let email = document.getElementById('email').value;
let contraseña = document.getElementById('contraseña').value;

if (contraseña!="" && email!=""){

    // localStorage.setItem("user", usuario ); // aca indico que guarde en el localstorage mi variable usuario
    localStorage.setItem("email", email ) // aca indico que guarde en el localstorage mi variable usuario

    location.href="index.html"; // y luego me mande al index
    
}else{
    Swal.fire({
        title: "Falta completar usuario o contraseña",
        icon: "warning"
      });
}
});

});