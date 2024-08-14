document.addEventListener('DOMContentLoaded', () =>{

let boton = document.getElementById('inicio');
boton.addEventListener('click', ()=>{
let usuario = document.getElementById('usuario').value;
let contraseña = document.getElementById('contraseña').value;

if (usuario!="" && contraseña!=""){
location.href="index.html";
}else{
    alert ("Falta completar usuario o contraseña");
}
});

});