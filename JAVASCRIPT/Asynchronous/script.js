let booksData = [];

async function fetchBooks() {
    try {
        const response = await fetch("http://localhost:3000/books")
        booksData = await response.json();

        const bookDetails = document.getElementById("bookDetails");

        booksData.forEach(book => {

            const bookDiv = document.createElement("div");
            bookDiv.classList.add("book");
            bookDiv.innerHTML = "";//used to clear any previous                         

            bookDiv.innerHTML = `
               <h2>${book.title}</h2>
               <img src=${book.image} >
               <p id="warningMsg" >${book.pages > 500 ? "warning This book has over 500 pages" : ""}</p>
               <p><strong>ID</strong>${book.id}</p>
                <p><strong>Author</strong>${book.author}</p>
                <p><strong>Genre:</strong> ${book.genre}</p>
                <p><strong>year:</strong> ${book.year}</p>
                <p><strong>Pages:</strong> ${book.pages}</p>
                <p><strong>Publisher:</strong> ${book.publisher}</p>
                <p><strong>Description:</strong> ${book.description}</p>
               `;

            bookDetails.appendChild(bookDiv);
            
        });


    } catch (error) {
        console.error("Error Fetching Data:", error);
    }
}

document.addEventListener("DOMContentLoaded", fetchBooks);

function summariseData() {

    const summarisedData = booksData.map(book => {
        return `${book.title} by ${book.author} - ${book.genre} (${book.pages}pages)`
    })
    console.log(summarisedData);
}


function filterData() {
    const filteredItems = booksData.filter((book) => (book.year < 1950))
    console.log(filteredItems);
}
function sortBooks() {
    const sortedBooks = booksData.sort((a, b) => (a.pages - b.pages))
    console.log(sortedBooks);
}
