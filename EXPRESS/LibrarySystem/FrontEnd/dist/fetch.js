"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Function to fetch books from the backend
function fetchBooks() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('http://localhost:3002');
            // Check if the response is ok (status code 2xx)
            if (!response.ok) {
                throw new Error('Failed to fetch books');
            }
            // Parse the JSON response into an array of books
            const books = yield response.json();
            // Return the books array
            return books;
        }
        catch (error) {
            console.error('Error fetching books:', error);
            return [];
        }
    });
}
// Example of calling the function and logging the result
fetchBooks().then(books => {
    console.log('Fetched books:', books);
});
//# sourceMappingURL=fetch.js.map