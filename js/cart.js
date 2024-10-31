import { updateCartCount } from "./utils/updateCartCount.js";
let productsAdded = JSON.parse(localStorage.getItem("userCart")) ?? [];
let productCard = document.getElementById("productCard");
let keepBuying = document.getElementById("seguir");


// Al hacer clic en el botón "seguir comprando", redirige a la página de categorías
keepBuying.addEventListener("click", function () {
  window.location.href = "categories.html";
});


// Mostrar los productos en el carrito
function cartP(array) {
  productCard.innerHTML = "";


  for (let i = 0; i < array.length; i++) {
    // Desestructuración de datos
    const { productId, name, cost, currency, firstImageUrl, count } = array[i];


    const subtotal = cost * count; // Calcular el subtotal inicial


    productCard.innerHTML += `
        <div class="card flex-row align-items-center" id="${productId}">
            <div class="contImg  ">
                <img src="${firstImageUrl}" alt="Nombre del producto" class="imgProducto">
            </div>
            <div class="card-body d-flex flex-column justify-content-between">
                <div class="nameButton d-flex justify-content-between align-items-center">
                    <p class="productName">${name}</p>
                    <button type="button" class="btnBlockRojo trash" data-index="${i}" value="carrito">
                        <i class="bi bi-trash3"></i>
                    </button>
                </div>
            <div>
                <p class="precio d-none d-sm-block">Precio: ${currency} ${cost}</p>
            </div>
            <div class="d-flex justify-content-between align-items-end">
                <div class="subtotal">
                    <p class="subtotal-text">Subtotal:</p>
                    <div class="d-flex align-items-center">
                        <p class="subtotalNum mb-0" id="resultado${productId}"> ${currency} ${subtotal}</p>
                    </div>
                </div>
                <div class="cantidad text-end">
                    <p class="mb-0">Cantidad: <input type="number" class="cantidadInput" data-product-id="${productId}" id="numero${productId}" name="numero" value="${count}"required></p>
                </div>
            </div>
            </div>
        </div>`;


    const trashButtons = document.querySelectorAll(".trash");
    // Al hacer click en los botones de basura (trash) se elimina el producto del carrito
    trashButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Obtiene el índice del producto a eliminar del carrito
        const index = this.getAttribute("data-index");


        // Elimina el producto del array y actualiza el localStorage
        productsAdded.splice(index, 1);
        localStorage.setItem("userCart", JSON.stringify(productsAdded));


        updateCartCount();


        // Actualizar la vista del carrito
        cartP(productsAdded);
      });
    });
}

    const quantityInputs = document.querySelectorAll(".cantidadInput");
    // Asignar evento de cambio de cantidad a cada input
    quantityInputs.forEach((input) => {
        input.addEventListener("input", function () {
        const productId = this.getAttribute("data-product-id");
     
        const product = array.find((p) => p.productId === productId);


        if (product) {
            let cantidad = this.value.trim() === "" ? 1 : parseInt(this.value);

            if (cantidad <= 0) { // Asegurar un valor mínimo de 1
                Swal.fire({
                    text: "Ingrese un valor mayor a 1 o elimine el producto",
                    confirmButtonText: "Continuar",
                    confirmButtonColor: "#e83b57",
                    imageUrl: "img/system-solid-55-error-hover-error-4.webp",
                    imageWidth: 70, // Ancho del GIF
                    imageHeight: 70, // Alto del GIF
                  });
                this.value = 1; // establece el valor del input en 1 
                cantidad = 1;
            }

            // Calcular y actualizar el subtotal
            const newSubtotal = product.cost * cantidad;
            document.getElementById(`resultado${productId}`).textContent = `${product.currency} ${newSubtotal}`;


            // Actualizar el array y el localStorage
            product.count = cantidad;
            localStorage.setItem("userCart", JSON.stringify(productsAdded));
        }

        });
    });

    quantityInputs.forEach((input) => {
        input.addEventListener("change", function () {
            if (this.value.trim() === "") {
                this.value = 1;
            }
        });
    });

  // Si el carrito está vacío, muestra un mensaje indicándolo
  if (array.length === 0) {
    productCard.innerHTML += `
            <div class="card flex-row align-items-center">
                <div class="card-body d-flex flex-column justify-content-between">
                    <p class="my-3">No hay elementos agregados</p>
                </div>
            </div>
        `;
  }
}


document.addEventListener("DOMContentLoaded", function () {
  cartP(productsAdded);
});

