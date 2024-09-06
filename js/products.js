let LIST_URL = PRODUCTS_URL + localStorage.getItem("catID") + EXT_TYPE;

//array donde se cargarán los datos recibidos:
let productsArray = [];

// Función que recibe un array con los datos, y los muestra en pantalla a través del DOM
function showProductList(array) {
  let htmlContentToAppend = "";

  for (let i = 0; i < array.length; i++) {
    let product = array[i];
    htmlContentToAppend += `
            <div class="product-item" data-product-id="` + product.id + `"><div>
                <img src="` + product.image + `" alt="product image" class="imgProduct">
            </div>
                <div>
                    <h4>` + product.name + `</h4> 
                    <p class="description">` + product.description + `</p>
                    <br>
                    <br> 
                    <p> Precio </p>
                    <p id="precio"> `+ product.currency + ` ` + product.cost +  `
                    <small>` + product.soldCount + ` vendidos </small> </p>
                </div>
            </div>
            <hr>
            `;
  }
  document.getElementById("products-container").innerHTML = htmlContentToAppend;
}

// Cargar datos y mostrar productos cuando la página se haya cargado
document.addEventListener("DOMContentLoaded", function () {
  getJSONData(LIST_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      productsArray = resultObj.data.products;
      showProductList(productsArray);
      selectedProducts();
    }
  });
  searchProduct();
});

let productsFiltradosArray = [];

//Entrega 3 filtrado de productos intervalo de precios

function filtrarPrecios() {
  //obtener los valores numericos de los input
  //parseInt convierte el string en valores numericos enteros
  let preciomin = parseInt(document.getElementById("preciomin").value);
  let preciomax = parseInt(document.getElementById("preciomax").value);

  // agrego una validacion por si el usuario no ingresa letras
  if (isNaN(preciomin) || isNaN(preciomax)) {
    alert("Por favor, ingresar valores numéricos.");
  } else if (preciomin > preciomax) {
    alert("Precio mínimo debe ser menor a precio máximo");
  } else {
    productsFiltradosArray = productsArray.filter(
      (product) => product.cost >= preciomin && product.cost <= preciomax
    );

    // Mostrar los productos filtrados en la página
    showProductList(productsFiltradosArray);
  }
}

//recorrer arreglo comparando los costos
//      for (let product of productsArray) {
//        if (product.cost >= preciomin && product.cost <= preciomax) {
//            console.log (product.cost)

//        }}}

//Agrego evento al boton de filtrar

let filtrarBtn = document.getElementById("filtrarbtn");

filtrarBtn.addEventListener("click", (event) => {
  filtrarPrecios();
});

// funcion que ordena los productos según el parámetro ingresado

function sortProducts(option) {
  let productsSort;
  if (productsFiltradosArray.length) {
    productsSort = productsFiltradosArray;
  } else {
    productsSort = productsArray;
  }

  switch (option) {
    case "precioAscendente":
      productsSort = productsSort.sort((a, b) => a.cost - b.cost);
      break;
    case "precioDescendente":
      productsSort = productsSort.sort((a, b) => b.cost - a.cost);
      break;
    case "relevancia":
      productsSort = productsSort.sort((a, b) => b.soldCount - a.soldCount);
      break;
  }
  showProductList(productsSort);
}

let sortButtonPriceUp = document.getElementById("price-up");
let sortButtonPriceDown = document.getElementById("price-down");
let sortButtonRelevance = document.getElementById("relevance");

sortButtonPriceUp.addEventListener("click", (event) => {
  sortProducts("precioAscendente");
});

sortButtonPriceDown.addEventListener("click", (event) => {
  sortProducts("precioDescendente");
});

sortButtonRelevance.addEventListener("click", (event) => {
  sortProducts("relevancia");
});

// Guarda en localStorage la ID del producto seleccionado y redirige a la página product-info.html
function selectedProducts() {
  let productItem = document.querySelectorAll(".product-item");

  productItem.forEach(function (products) {
    products.addEventListener("click", function () {
      let idP = products.getAttribute("data-product-id");

      localStorage.setItem("productID", idP);
      window.location.href = "product-info.html";
    });
  });
}
// En la línea 13 del código se agregó el atributo data-product-id.
// El prefijo data- permite crear atributos personalizados.
// Son útiles para almacenar datos que se puedan usar en JS sin interferir con la estructura HTML.

// Función para filtrar productos según lo que se escriba en la barra de búsqueda
function searchProduct(){
    let searchBar = document.getElementById("searchBar");
        
    searchBar.addEventListener("input", function() {
        const input = document.getElementById("searchBar").value.toLowerCase();

        let filteredProducts = productsArray.filter(products => {
            return products.name.toLowerCase().includes(input) || products.description.toLowerCase().includes(input);
        });
    
        showProductList(filteredProducts);
    });
}
// El evento "input" detecta cada vez que se escribe algo.
// .filter permite filtrar los elementos de un array según una condición.
// En este caso filtra si la descripción o el nombre de los productos incluye el texto escrito en la barra de búsqueda.