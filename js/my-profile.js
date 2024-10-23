
// funcion para guardar datos del formulario y modificar los datos se se ingresan distintos con el mismo mail

function guardarDatos() {
    let nombre = document.getElementById("nombre").value;
    let segundo_nombre = document.getElementById("segundo_nombre").value;
    let apellido = document.getElementById("apellido").value;
    let segundo_apellido = document.getElementById("segundo_apellido").value;
    let email = document.getElementById("email").value;
    let telefono_contacto = document.getElementById("telefono_contacto").value;
    let fotoPerfil = document.getElementById("imagen").files[0];
    let modo = document.querySelector('input[name="modo"]:checked').value;
    
    // validar campos requeridos
    if (!nombre || !email || !apellido) {
        alert("Por favor, complete todos los campos obligatorios.");  
        return;
    }
    
    // aqui se abren 2 opcion, o modificar los datos ya guardados
    // o crear un usuario nuevo pusheandolo al arreglo 

    const datosFormulario = { 
        nombre, 
        segundo_nombre, 
        apellido, 
        segundo_apellido, 
        email, 
        telefono_contacto, 
        modo 
    };

    if (usuarioLoggeado > -1) {
    
        usuarios[usuarioLoggeado] = { ...datosFormulario };

    } else {
        usuarios.push(datosFormulario);
    }

    // guardar el arreglo actualizado en localStorage
    // convertir datos en cadena de texto para guardar en el local
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
   
    //guardar imagen en el local con FileReader
    if (fotoPerfil) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imagenBase64 = e.target.result;

            // Si no existe el usuario logueado, es un usuario nuevo y se agrega al arreglo
            if (usuarioLoggeado < 0) {
                const nuevoUsuario = { nombre, segundo_nombre, apellido, segundo_apellido, email, telefono_contacto, modo, imagen: imagenBase64 };
                usuarios.push(nuevoUsuario);
            } else {
                usuarios[usuarioLoggeado].imagen = imagenBase64; // Si es un usuario existente, actualizar su imagen
            }
            localStorage.setItem("usuarios", JSON.stringify(usuarios)); // Guardar usuarios actualizados en localStorage

            document.getElementById('fotoPerfil').src = imagenBase64;
    
    
           // Agregar la imagen al objeto datosFormulario
            datosFormulario.imagenPerfil = imagenBase64;

            // Actualizar el usuario loggeado con la imagen
            usuarios[usuarioLoggeado].imagenPerfil = imagenBase64;

            // Guardar datosFormulario actualizado
            localStorage.setItem("datosFormulario", JSON.stringify(datosFormulario));
            localStorage.setItem("usuarios", JSON.stringify(usuarios)); // Actualizar usuarios en localStorage

        };
         // leer el archivo como URL de datos
        reader.readAsDataURL(fotoPerfil);
    } else {
        // Si no hay imagen, solo guardamos datosFormulario
        localStorage.setItem("datosFormulario", JSON.stringify(datosFormulario));
    }
    

    alert("Datos guardados con exito");  
}




// mostrar el email guardado en el local al cargar la p[agina
// window.onload (esto es nuevo)se dispara cuando la pagina y  sus recursos cargaron por completo 

window.onload = function() {

    const emailLoggin = localStorage.getItem("email");
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

     // buscar el usuario por email
     const usuario = usuarios.find(usuario => usuario.email === emailLoggin);

    // verificar si hay datos guardados y si el email coincide,
    // si es asi entonces se cargan los datos
   
    if (usuario) {
        document.getElementById("nombre").value = usuario.nombre || '';
        document.getElementById("segundo_nombre").value = usuario.segundo_nombre || '';
        document.getElementById("apellido").value = usuario.apellido || '';
        document.getElementById("segundo_apellido").value = usuario.segundo_apellido || '';
        document.getElementById("telefono_contacto").value = usuario.telefono_contacto || '';
        document.getElementById("email").value = usuario.email;
        

         

        // Cargar imagen de perfil si existe
        if (usuario.imagenPerfil) {
            document.getElementById('imgPerfil').src = usuario.imagenPerfil;
            document.getElementById('fotoPerfil').src = usuario.imagenPerfil;
        }
    } else {
        const emailGuardado = localStorage.getItem("email");
        document.getElementById("email").value = emailGuardado;

    }

    if (usuario.modo) {
        document.querySelector(`input[name="modo"][value="${usuario.modo}"]`).checked = true;
    }
};


// asignar el evento al boton y voilà! yey!!

let guardar = document.getElementById("guardarBtn")

guardar.addEventListener("click", () => {
    guardarDatos();
});

// Feedback de imagen cargada
document.getElementById('imagen').addEventListener('change', function() {
    const feedbackValid = document.getElementById('valid-feedback-img');
    feedbackValid.style.display = 'block';
});