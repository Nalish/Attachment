var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function fetchBooks() {
    return __awaiter(this, arguments, void 0, function* (queryParams = "") {
        try {
            const response = yield fetch(`http://localhost:3000/api/books${queryParams}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return yield response.json();
        }
        catch (error) {
            console.error("Error Fetching Data:", error);
            return [];
        }
    });
}
//# sourceMappingURL=events.js.map