document.addEventListener('DOMContentLoaded', () =>{

let boton = document.getElementById('inicio');
boton.addEventListener('click', ()=>{
let usuario = document.getElementById('usuario').value;
let contraseña = document.getElementById('contraseña').value;

if (usuario!="" && contraseña!=""){

    localStorage.setItem("user", usuario ) // aca indico que guarde en el localstorage mi variable usuario
    location.href="index.html"; // y luego me mande al index
    
}else{
    alert ("Falta completar usuario o contraseña");
}
});

});