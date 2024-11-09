import { updateCartCount } from "./utils/updateCartCount.js";
let productsAdded = JSON.parse(localStorage.getItem("userCart")) ?? [];
let productCard = document.getElementById("productCard");
let keepBuying = document.getElementById("seguir");
let totalCurrency = document.getElementById("total");
let currencySelector = document.querySelector('select[name="select"]');

const exchange = 40;

// Al hacer clic en el botón "seguir comprando", redirige a la página de categorías
keepBuying.addEventListener("click", function () {
  window.location.href = "categories.html";
});


// Mostrar los productos en el carrito
function cartP(array) {
    productCard.innerHTML = "";

    let total = 0;

    for (let i = 0; i < array.length; i++) {
    // Desestructuración de datos
    const { productId, name, cost, currency, firstImageUrl, count } = array[i];

    const subtotal = cost * count; // Calcular el subtotal inicial

    let USD = currency === "UYU" ? subtotal * exchange : subtotal;
    total += USD;

    totalCurrency.innerHTML = `${total}`;

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
    }
    totalCurrency.innerHTML = `${total}`;

    // Añade eventos de eliminación y cambio de cantidad
    Trash(array);
    Quantity(array);

    // Actualiza el total cada vez que se carga el carrito
    updateTotal(array);

    // Si el carrito está vacío, muestra un mensaje indicándolo
    if (array.length === 0) {
        productCard.innerHTML += `
            <div class="card flex-row align-items-center">
                <div class="card-body d-flex flex-column justify-content-between">
                    <p class="my-3">No hay elementos agregados</p>
                </div>
            </div>
        `;
        totalCurrency.innerHTML = `0`;
    }
}

// Función para asignar eventos de eliminación de productos
function Trash(array) {
    const trashButtons = document.querySelectorAll(".trash");

    // Al hacer click en los botones de basura (trash) se elimina el producto del carrito
    trashButtons.forEach((button) => {
        button.addEventListener("click", function () {
            // Obtiene el índice del producto a eliminar del carrito
            const index = this.getAttribute("data-index");

            // Elimina el producto del array y actualiza el localStorage
            array.splice(index, 1);
            localStorage.setItem("userCart", JSON.stringify(array));

            updateCartCount();

            cartP(productsAdded); // Actualizar la vista del carrito
        });
    });
}
    
// Función para asignar eventos de cambio de cantidad de productos
function Quantity(array) {
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
                        text: "Ingrese un valor mayor 0 o elimine el producto",
                        confirmButtonText: "Continuar",
                        confirmButtonColor: "#e83b57",
                        imageUrl: "img/system-solid-55-error-hover-error-4.webp",
                        imageWidth: 70,
                        imageHeight: 70,
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
            // Llamar a la función para actualizar el badge del carrito y la función para recalcular el total
            updateCartCount();
            updateTotal(array);
        });

        input.addEventListener("change", function () {
            if (this.value.trim() === "") {
                this.value = 1;
            }
            updateCartCount();
            updateTotal(array);
        });
    });
}

// Función para recalcular el total
function updateTotal(array) {

    let newTotal = 0;

    const selectedCurrency = currencySelector.value;

    array.forEach((product) => {
        const subtotal = product.count * product.cost;
        let convertedSubtotal = subtotal;

        if (selectedCurrency === "UYU" && product.currency === "USD") {
            // Si se seleccionó UYU y el producto está en USD, convierte
            convertedSubtotal = subtotal * exchange;
        } else if (selectedCurrency === "USD" && product.currency === "UYU") {
            // Si se seleccionó USD y el producto está en UYU, convierte
            convertedSubtotal = subtotal / exchange;
        }

        newTotal += convertedSubtotal;
        
    });



    // Detallito, dar formato al total con puntos y comas
    totalCurrency.innerHTML = `${newTotal.toLocaleString('es-UY', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

}

currencySelector.addEventListener("change", function () {
    // Guardar la currency en el local
    localStorage.setItem("selectedCurrency", currencySelector.value);
    // Actualiza el total al cambiar la currency
    updateTotal(productsAdded);
});

document.addEventListener("DOMContentLoaded", function () {

    // Recuperar la opción de currency seleccionada
    const savedCurrency = localStorage.getItem("selectedCurrency");
    if (savedCurrency) {
        currencySelector.value = savedCurrency;
    }
    
    cartP(productsAdded);
});

// Botón que abre modal

const btnCompletarDatos = document.getElementById('completarDatos');
    const Modal = new bootstrap.Modal(document.getElementById('staticBackdrop'));

    btnCompletarDatos.addEventListener('click', function() {
      Modal.show();
    });

    document.getElementById('finalizar').addEventListener('click', function() {
        Modal.hide();
      });


function showAlertError() {
        document.getElementById("alert-danger").classList.add("show");
}