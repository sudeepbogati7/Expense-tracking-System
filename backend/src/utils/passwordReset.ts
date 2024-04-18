import { randomBytes } from 'crypto';

// Function to generate a random token
const generateToken = (): string => {
    // Generate a random buffer of bytes
    const buffer = randomBytes(32);
    // Convert buffer to a hexadecimal string
    const token = buffer.toString('hex');
    return token;
};
export default generateToken;