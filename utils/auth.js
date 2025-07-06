export const checkPin = (pin) => {
    // In a real app, you'd want to hash this and store it securely
    const CORRECT_PIN = '1234';
    return pin === CORRECT_PIN;
};