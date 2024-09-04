let LIST_URL = PRODUCTS_URL + localStorage.getItem("catID") + EXT_TYPE

//array donde se cargarán los datos recibidos:
let productsArray = [];

// Función que recibe un array con los datos, y los muestra en pantalla a través del DOM
    function showProductList(array) {
        let htmlContentToAppend = "";

        for (let i = 0; i < array.length; i++) { 
            let product = array[i];
            htmlContentToAppend += `
            <div class="product-item" data-product-id="` + product.id + `">
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
                selectedProducts();
            } 
        })
    });

// Guarda en localStorage la ID del producto seleccionado y redirige a la página product-info.html
    function selectedProducts() {
        let productItem = document.querySelectorAll(".product-item");
        
        productItem.forEach(function(products) {
            
            products.addEventListener("click", function() {
                let idP = products.getAttribute("data-product-id");  
                
                localStorage.setItem("productID", idP);
                window.location.href = 'product-info.html';
            });
        });
    }
// En la línea 13 del código se agregó el atributo data-product-id. 
// El prefijo data- permite crear atributos personalizados. 
// Son útiles para almacenar datos que se puedan usar en JS sin interferir con la estructura HTML.