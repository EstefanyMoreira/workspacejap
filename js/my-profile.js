
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

     // obtener usuarios ya guardados o sino hacer un arreglo vacio en el cual se guardaran los datos

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // verificar si el email ya existe para traer los datos segun el email
    // se utiliza find index para que devuelva el index primer dato que coincida con el email para poder modificar los datos
    //de usuario 
    // usurio loggeado nos dice si el usuario ya existe

    const usuarioLoggeado = usuarios.findIndex(usuario => usuario.email === email);
    
    // aqui se abren 2 opcion, o modificar los datos ya guardados
    // o crear un usuario nuevo pusheandolo al arreglo 

    if (usuarioLoggeado > -1) {
    
        usuarios[usuarioLoggeado] = { nombre, segundo_nombre, apellido, segundo_apellido, email, telefono_contacto, modo };
    } else {
        const nuevoUsuario = { nombre, segundo_nombre, apellido, segundo_apellido, email, telefono_contacto, modo };
        usuarios.push(nuevoUsuario);
    }

    // guardar el arreglo actualizado en localStorage
    // convertir datos en cadena de texto para guardar en el local

    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    const datos = { nombre, segundo_nombre, apellido, segundo_apellido, email, telefono_contacto, modo };

    localStorage.setItem("datosFormulario", JSON.stringify(datos));
   
    //guardar imagen en el local con FileReader

    if (fotoPerfil) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imagenBase64 = e.target.result;
             // guardar la imagen en Base64
            localStorage.setItem("imagenPerfil", imagenBase64);
        };
         // leer el archivo como URL de datos
        reader.readAsDataURL(fotoPerfil);
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

        if (usuario.modo) {
            document.querySelector(`input[name="modo"][value="${usuario.modo}"]`).checked = true;
        }
    } else {
        const emailGuardado = localStorage.getItem("email");
        document.getElementById("email").value = emailGuardado;
    }
};


// asignar el evento al boton y voilà! yey!!

let guardar = document.getElementById("guardarBtn")

guardar.addEventListener("click", () => {
    guardarDatos();
}
)

