const LIST_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json"

//array donde se cargarán los datos recibidos:
let productsArray = [];

// Función que recibe un array con los datos, y los muestra en pantalla a través del DOM
    function showProductList(array) {
        let htmlContentToAppend = "";

        for (let i = 0; i < array.length; i++) { 
            let product = array[i];
            htmlContentToAppend += `
            <div class="product-item">
                <div>
                    <img src="` + product.image + `" alt="product image" class="imgProduct">
                </div>
                <div>
                    <h4>` + product.name + `</h4> 
                    <p class="description">` + product.description + `</p>
                    <br>
                    <br> 
                    <p> Precio </p>
                    <p id="precio"> USD ` + product.cost + `
                    <small>` + product.soldCount + ` vendidos </small> </p>
                </div>
            </div>
            <hr>
            `;
        }
        document.getElementById("products-container").innerHTML = htmlContentToAppend; 
        }

// Cargar datos y mostrar productos cuando la página se haya cargado
    document.addEventListener("DOMContentLoaded", function() {
        getJSONData(LIST_URL).then(function(resultObj) {
            if (resultObj.status === "ok") {
                productsArray = resultObj.data.products; 
                showProductList(productsArray);
            } 
        })
    });


    let productsFiltradosArray = [];


    //Entrega 3 filtrado de productos intervalo de precios
 
function filtrarPrecios() {

//obtener los valores numericos de los input
//parseInt convierte el string en valores numericos enteros
    let preciomin = parseInt(document.getElementById("preciomin").value)
    let preciomax = parseInt(document.getElementById("preciomax").value)

// agrego una validacion por si el usuario no ingresa letras
    if (isNaN(preciomin) || isNaN(preciomax) ) {
        alert("Por favor, ingresar valores numéricos.");}
    
    else if (preciomin > preciomax) {
        alert("Precio mínimo debe ser menor a precio máximo");
    }

    else {

    let productosFiltrados = productsArray.filter(product => 
        product.cost >= preciomin && product.cost <= preciomax
    );

    

    // Mostrar los productos filtrados en la página
    showProductList(productosFiltrados);
    
}}

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

 