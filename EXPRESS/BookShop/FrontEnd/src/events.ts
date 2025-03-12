
export async function fetchBooks(queryParams: string = "") {
    try {
        const response = await fetch(`http://localhost:3000/api/books${queryParams}`);
        // if (!response.ok) {
        //     throw new Error(`HTTP error! Status: ${response.status}`);
        // }
        await response.json();
         return
    } catch (error) {
        console.error("Error Fetching Data:", error);
        return [];
    }
}
