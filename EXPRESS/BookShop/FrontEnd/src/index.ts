import { fetchBooks } from "./events.js";

let booksData: Books[] = [];
let cart: Books[] = [];
export type Books={
    id:number;
    pages:number;
    title:string;
    image:string;
    author:string;
    genre:string;
    year:number;
    publisher:string;
    description:string;
    price:number;
}

// Function to display books
function displayBooks(filteredBooks: Books[]) {
    const bookDetails = document.getElementById("bookDetails");
    if (bookDetails) {
        bookDetails.innerHTML = filteredBooks.map((book, index) => `
            <div class="book">
                <h2>${book.title}</h2>
                <img src="${book.image}">
                <p id="warningMsg">${book.pages > 500 ? "Warning: This book has over 500 pages" : ""}</p>
                <p><strong>ID:</strong> ${book.id}</p>
                <p><strong>Author:</strong> ${book.author}</p>
                <p><strong>Genre:</strong> ${book.genre}</p>
                <p><strong>Year:</strong> ${book.year}</p>
                <p><strong>Pages:</strong> ${book.pages}</p>
                <p><strong>Publisher:</strong> ${book.publisher}</p>
                <p><strong>Description:</strong> ${book.description}</p> 
                <p><strong>Price:</strong> $${book.price}</p> 
                <button class="buy" data-index="${index}">Add to Cart</button>
            </div>
        `).join('');

        // Attach event listeners for "Add to Cart" buttons
        document.querySelectorAll('.buy').forEach(button => {
            button.addEventListener('click', function (this: HTMLButtonElement) {
                const idx = this.getAttribute('data-index');
                if (idx !== null) addToCart(parseInt(idx));
            });
        });
    }
}

// Load books from API
const loadBooks = async (args: string = "") => {
    const books = await fetchBooks(args);
    booksData:Books[] = books;
    displayBooks(books);
};

// Add book to cart
function addToCart(index: number) {
    cart.push(booksData[index]);
    updateCart();
}

// Remove book from cart
function removeFromCart(index: number) {
    cart.splice(index, 1);
    updateCart();
}

// Update cart display
function updateCart() {
    const cartItem = document.getElementById("cartItem");
    const cartCount = document.getElementById("cartCount");
    const totalAmount = document.getElementById("total");

    if (cartCount) {
        cartCount.innerText = cart.length.toString();
    }

    if (cart.length === 0) {
        if (cartItem) cartItem.innerHTML = "Your cart is empty";
        if (totalAmount) totalAmount.innerText = "$0.00";
    } else {
        let total = 0;
        if (cartItem) {
            cartItem.innerHTML = cart.map((item, index) => {
                total += item.price;
                return `
                    <div class="cart-item">
                        <div class="row-img">
                            <img class="rowimg" src="${item.image}">
                        </div>
                        <p style="font-size:12px;">${item.title}</p>
                        <h2 style="font-size: 15px;">$ ${item.price}.00</h2>
                        <button class="remove" data-index="${index}">Remove</button>
                    </div>
                `;
            }).join('');

            // Attach event listeners for "Remove" buttons
            document.querySelectorAll('.remove').forEach(button => {
                button.addEventListener('click', function (this: HTMLButtonElement) {
                    const idx = this.getAttribute('data-index');
                    if (idx !== null) removeFromCart(parseInt(idx));
                });
            });
        }
        if (totalAmount) totalAmount.innerText = `$${total}.00`;
    }
}

// Modal functionality
const modal = document.getElementById("myModal");
const btn = document.getElementById("cartButton");
const span = document.getElementsByClassName("close")[0] as HTMLElement | null;

if (btn) {
    btn.onclick = function () {
        if (modal) modal.style.display = "block";
    };
}

if (span) {
    span.onclick = function () {
        if (modal) modal.style.display = "none";
    };
}

window.onclick = function (event) {
    if (event.target === modal) {
        if (modal) modal.style.display = "none";
    }
};

// Filter function
function filterBooks() {
    const selectedGenre = (document.getElementById("filterDropdown") as HTMLSelectElement)?.value;

    if (selectedGenre === "all") {
        displayBooks(booksData);  // Show all books
    } else {
        const filtered = booksData.filter(book => book.genre.toLowerCase() === selectedGenre.toLowerCase());
        displayBooks(filtered);
    }
}

// Event listener for filter dropdown
const filterDropdown = document.getElementById("filterDropdown") as HTMLSelectElement | null;
if (filterDropdown) {
    filterDropdown.addEventListener("change", filterBooks);
}

// Load books on page load
document.addEventListener("DOMContentLoaded", () => loadBooks());
