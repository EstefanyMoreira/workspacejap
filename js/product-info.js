document.addEventListener("DOMContentLoaded", function() {
// obtener nombre de la página
    function getPageNameFromURL() {
        const path = window.location.pathname;
        const pageName = path.split('/').pop();
        return pageName.charAt(0).toUpperCase() + pageName.slice(1).replace('.html', '');
    }

// crear el breadcrumb
    function createBreadcrumb(categoryName, productName) {
        const breadcrumbData = [
            { text: 'Categoría', href: '/categories.html' },
            { text: categoryName, href: `/products.html` },
            { text: productName, href: '#' }
        ];

        const breadcrumbContainer = document.getElementById('breadcrumb');
        breadcrumbContainer.innerHTML = '';

        breadcrumbData.forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.classList.add('breadcrumb-item');

            if (item.href && index < breadcrumbData.length - 1) {
                const link = document.createElement('a');
                link.href = item.href;
                link.textContent = item.text;
                listItem.appendChild(link);
            } else {
                listItem.textContent = item.text;
                listItem.classList.add('active');
            }

            breadcrumbContainer.appendChild(listItem);
        });
    }

    // obtener la información del producto
    function getProductInfo(url) {
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => ({ status: "ok", data }))
            .catch(error => ({ status: "error", message: error.message }));
    }

    // obtener el ID del producto desde localStorage
    const productId = localStorage.getItem("productID");
    if (!productId) {
        console.error('ID de producto no encontrado en localStorage.');
        document.getElementById('products-container').innerHTML = '<p>ID de producto no encontrado.</p>';
        return;
    }

    const PRODUCT_URL = PRODUCT_INFO_URL + productId + EXT_TYPE;

    // otener la información del producto
    getProductInfo(PRODUCT_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            const product = resultObj.data;

        // mostrar los datos del producto
            const productsContainer = document.getElementById('products-container');

        // ruta a la carpeta de imágenes
            const imageFolder = "img/";

        // establece que se muestre la primera imágen
            const firstImageFilename = `prod${productId}_1.jpg`;
            const firstImageUrl = `${imageFolder}${firstImageFilename}`;

        // array con las imágenes del ID del producto
            const numImages = 5;
            let imagesHtml = '';
            for (let i = 2; i <= numImages; i++) {
                const filename = `prod${productId}_${i}.jpg`;
                imagesHtml += `<img src="${imageFolder}${filename}" alt="product image ${i}" class="related-image" onerror="this.style.display='none';">`;
            }

            productsContainer.innerHTML = `
                <div class="product-item" data-product-id="${product.id}">
                <div>
                    <img src="${firstImageUrl}" alt="Product image" class="imgProduct">
                </div>
                <div>
                    <h4>${product.name}</h4> 
                    <p>Descripción</p>
                    <p class="description">${product.description}</p>
                    <br>
                    <small>${product.soldCount} vendidos</small>
                    <p id="precio">${product.currency} ${product.cost}</p>
                    <p>Imágenes relacionadas</p>
                    ${imagesHtml}
                </div>
            </div>
            `;
        // se llaman las funciones para mostrar datos de la página actual en el breadcrumb
            const categoryName = product.category;
            createBreadcrumb(categoryName, product.name);
        }
    });
});
