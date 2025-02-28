import { validateUsername } from "./union";


describe("validateUsername function", () => {
    it('should return true for valid usernames', () => {
        expect(validateUsername('Matt1234')).toBe(true);
        expect(validateUsername('Alice')).toBe(false);
        expect(validateUsername('Bob')).toBe(false);
    });

    it('should return false for null', () => {
        expect(validateUsername(null)).toBe(false);
    });

    it('should return false for empty string', () => {
        expect(validateUsername("")).toBe(false);
    });
});