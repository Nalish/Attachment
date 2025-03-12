// Define the Book type (structure of book data)
interface Book {
    id: number;
    title: string;
    author: string;
    genre: string;
    year: number;
    pages: number;
    publisher: string;
    description: string;
    price: number;
}

// Function to fetch books from the backend
export async function fetchBooks(): Promise<Book[]> {
    try {
        const response = await fetch('http://localhost:3002');
        
        // Check if the response is ok (status code 2xx)
        if (!response.ok) {
            throw new Error('Failed to fetch books');
        }

        // Parse the JSON response into an array of books
        const books: Book[] = await response.json();

        // Return the books array
        return books;

    } catch (error) {
        console.error('Error fetching books:', error);
        return [];
    }
}

// Example of calling the function and logging the result
fetchBooks().then(books => {
    console.log('Fetched books:', books);
});
