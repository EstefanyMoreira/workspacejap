
// funcion para guardar datos del formulario 

function guardarDatos() {
    let nombre = document.getElementById("nombre").value;
    let segundo_nombre = document.getElementById("segundo_nombre").value;
    let apellido = document.getElementById("apellido").value;
    let segundo_apellido = document.getElementById("segundo_apellido").value;
    let email = document.getElementById("email").value;
    let telefono_contacto = document.getElementById("telefono_contacto").value;

    // validar campos requeridos
    if (!nombre || !email || !apellido) {
        alert("Por favor, complete todos los campos obligatorios.");  
        return;
    }

    // guardar en el localStorage
    const datos = { nombre, segundo_nombre, apellido, segundo_apellido, email, telefono_contacto };
    localStorage.setItem("datosFormulario", JSON.stringify(datos));
    localStorage.setItem("loggeado", true);
    localStorage.setItem("email", email);

    alert("Datos guardados con exito");  
}

// mostrar el email guardado en el local al cargar la p[agina
// window.onload se dispara cuando la página y  sus recursos cargaron por completo 

window.onload = function() {
    const emailGuardado = localStorage.getItem("email");
    document.getElementById("email").value = emailGuardado;
    }


// asignar el evento al boton

let guardar = document.getElementById("guardarBtn")

guardar.addEventListener("click", () => {
    guardarDatos();
}
)



