const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

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
// Se agregó el atributo data-product-id.
// El prefijo data- permite crear atributos personalizados.
// Son útiles para almacenar datos que se puedan usar en JS sin interferir con la estructura HTML.

document.addEventListener('DOMContentLoaded', () =>{

  let usuario = localStorage.getItem("user");
  
  if (usuario === null) {
    location.href = "login.html"
  } else {
    document.getElementById("miPerfil").innerText = usuario

  }
    
  });