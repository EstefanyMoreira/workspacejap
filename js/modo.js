// Función para aplicar el modo día/noche
function aplicarModo(modo) {
    document.body.classList.toggle('modo-noche', modo === 'noche');
    document.querySelector(`input[name="modo"][value="${modo}"]`).checked = true;
}

// Mostrar el modo guardado al cargar la página
window.onload = function() {
    const datosGuardados = JSON.parse(localStorage.getItem("datosFormulario"));
    if (datosGuardados) {
        aplicarModo(datosGuardados.modo);
    }
}

// Guarda en el LocalStorage al guardar datos del formulario
function guardarDatos() {
    let modo = document.querySelector('input[name="modo"]:checked').value;

    const datos = { modo };
    localStorage.setItem("datosFormulario", JSON.stringify(datos));

    aplicarModo(modo);
}

document.getElementById("guardarBtn").addEventListener("click", guardarDatos);