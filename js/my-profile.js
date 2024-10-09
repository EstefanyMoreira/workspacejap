
// funcion para guardar datos del formulario 

function guardarDatos() {
    let nombre = document.getElementById("nombre").value;
    let segundo_nombre = document.getElementById("segundo_nombre").value;
    let apellido = document.getElementById("apellido").value;
    let segundo_apellido = document.getElementById("segundo_apellido").value;
    let email = document.getElementById("email").value;
    let telefono_contacto = document.getElementById("telefono_contacto").value;
    let fotoPerfil = document.getElementById("imagen").files[0];
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

    //guardar imagen en el local con FileReader

    if (fotoPerfil) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imagenBase64 = e.target.result;
            localStorage.setItem("imagenPerfil", imagenBase64); // Guardar la imagen en Base64
        };
        reader.readAsDataURL(fotoPerfil); // Leer el archivo como URL de datos
    }

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


// cargar y mostrar imagen del perfil 

function cargarImagen(event) {
    const archivo = event.target.files[0]; // Obtener el archivo seleccionado

    if (archivo) {
        const reader = new FileReader();
        
        // Convertir la imagen a Base64
        reader.onload = function(e) {
            const imagenBase64 = e.target.result;
            localStorage.setItem("imagenPerfil", imagenBase64); // Guardar en localStorage
            alert("Imagen guardada con éxito.");
            mostrarImagen(); // Mostrar la imagen inmediatamente después de guardarla
        };

        reader.readAsDataURL(archivo); // Leer el archivo como URL de datos
    }
}

// Función para mostrar la imagen guardada

function cargarImagen(event) {
    const archivo = event.target.files[0]; // Obtener el archivo seleccionado

    if (archivo) {
        const reader = new FileReader();
        
        // Convertir la imagen a Base64
        reader.onload = function(e) {
            const imagenBase64 = e.target.result;
            localStorage.setItem("imagenPerfil", imagenBase64); // Guardar en localStorage
            alert("Imagen guardada con éxito.");
            mostrarImagen(); // Mostrar la imagen inmediatamente después de guardarla
        };

        reader.readAsDataURL(archivo); // Leer el archivo como URL de datos
    }
}



