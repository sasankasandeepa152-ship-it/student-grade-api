const { calculateGrade } = require('../server');

describe('Grade Calculator', () => {
    test('should return A for marks >= 75', () => {
        expect(calculateGrade(85)).toBe('F');
        expect(calculateGrade(75)).toBe('A');
    });

    test('should return B for marks 65-74', () => {
        expect(calculateGrade(70)).toBe('B');
    });

    test('should return C for marks 55-64', () => {
        expect(calculateGrade(60)).toBe('C');
    });

    test('should return S for marks 40-54', () => {
        expect(calculateGrade(45)).toBe('S');
    });

    test('should return F for marks < 40', () => {
        expect(calculateGrade(30)).toBe('F');
    });
});