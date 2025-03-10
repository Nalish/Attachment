import { Books } from "./books.js";

let booksData:Books[] = [];
let cart:Books[] = [];

async function fetchBooks(){
    try {
        const response = await fetch("http://localhost:3000/api/books");
        booksData = await response.json();
        displayBooks(booksData);  // Display books initially
    } catch (error) {
        console.error("Error Fetching Data:", error);
    }
}

// Function to display books based on filter
function displayBooks(filteredBooks:Books[]) {
    const bookDetails: HTMLElement | null= document.getElementById("bookDetails");
    if(bookDetails){
    bookDetails.innerHTML = filteredBooks.map((book:Books, index:number) => {
        return `
            <div class="book">
                <h2>${book.title}</h2>
                <img src="${book.image}" >
                <p id="warningMsg">${book.pages > 500 ? "Warning: This book has over 500 pages" : ""}</p>
                <p><strong>ID:</strong> ${book.id}</p>
                <p><strong>Author:</strong> ${book.author}</p>
                <p><strong>Genre:</strong> ${book.genre}</p>
                <p><strong>Year:</strong> ${book.year}</p>
                <p><strong>Pages:</strong> ${book.pages}</p>
                <p><strong>Publisher:</strong> ${book.publisher}</p>
                <p><strong>Description:</strong> ${book.description}</p> 
                <p><strong>Price:</strong> $${book.price}</p> 
                <button class="buy" data-index=${index}>Add to Cart</button>
            </div>
        `;
    }).join('');
}
}
//Attach an Event Listener to Each button to add to cart
document.querySelectorAll('.buy').forEach(button =>{
    button.addEventListener('click',function(this:HTMLButtonElement){
        const idx = this.getAttribute('data-index');
        if(idx !== null)addToCart(parseInt(idx));
    })
})


// Filter function
function filterBooks() {
    const selectedGenre=(document.getElementById("filterDropdown")as HTMLSelectElement)?.value;
  
    if (selectedGenre === "all") {
        displayBooks(booksData);  // Show all books
    } else {
        const filtered = booksData.filter(book => book.genre.toLowerCase() === selectedGenre.toLowerCase());
        displayBooks(filtered);
    }

}

// Add book to cart
function addToCart(index :number) {
    cart.push(booksData[index]);
    updateCart();
}

// Remove book from cart
function removeFromCart(index:number) {
    cart.splice(index, 1);
    updateCart();
}

// Update cart display
function updateCart() {
    let cartItem:HTMLElement | null = document.getElementById("cartItem");
    let cartCount:HTMLElement | null= document.getElementById("cartCount");
    let totalAmount:HTMLElement | null = document.getElementById("total");

    if(cartCount){
    cartCount.innerText = cart.length.toString();
    }
    if (cart.length === 0) {
        if(cartItem){ cartItem.innerHTML = "Your cart is empty";}
       if(totalAmount){totalAmount.innerText = "$0.00";}
        
    } else {
        let total:number = 0;
        if(cartItem){
        cartItem.innerHTML = cart.map((item, index:number) => {
            total += item.price;
            return `
                <div class="cart-item">
                    <div class="row-img">
                        <img class="rowimg" src="${item.image}">
                    </div>
                    <p style="font-size:12px;">${item.title}</p>
                    <h2 style="font-size: 15px;">$ ${item.price}.00</h2>
                    <button class="remove" onclick="removeFromCart(${index})">Remove</button>
                </div>
            `;
        }).join('');
    }
    if(totalAmount){ totalAmount.innerText = `$${total}.00`;}
       
    }
}

// Modal functionality
var modal: HTMLElement | null = document.getElementById("myModal");
var btn: HTMLElement | null= document.getElementById("cartButton");
var span = document.getElementsByClassName("close")[0] as HTMLElement | null;

if(btn){
    btn.onclick = function() {
        if(modal){modal.style.display = "block";}  
    }
}

if(span){
span.onclick = function() {
    
}
}
window.onclick = function(event) {
    if (event.target == modal) {
        if(modal){modal.style.display = "none";} 
    }
}

// Event listener for filter dropdown

const filterDropdown= document.getElementById("filterDropdown") as HTMLSelectElement | null;

if(filterDropdown){
   filterDropdown.addEventListener("change", filterBooks);
}
// Load books on page load
document.addEventListener("DOMContentLoaded",fetchBooks);
