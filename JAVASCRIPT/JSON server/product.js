document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("products-container");

    // Fetch product data from json-server
    fetch("http://localhost:3000/products")
        .then(response => response.json())
        .then(products => {
            products.forEach(product => {
                // Create a div for each product
                const productCard = document.createElement("div");
                productCard.classList.add("product");

                // Add product details
                productCard.innerHTML = `
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p>Category: ${product.category}</p>
                    <p>Price: $${product.price}</p>
                    <p>Stock: ${product.stock}</p>
                    <button>Add to Cart</button>
                `;

                // Append to container
                container.appendChild(productCard);
            });
        })
        .catch(error => console.error("Error fetching products:", error));
});
