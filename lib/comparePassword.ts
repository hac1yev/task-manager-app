import { compare } from 'bcrypt';
 
export const comparePassword = async (enteredPassword: string, hashedPassword: string) => {
    const passwordIsValid = await compare(enteredPassword, hashedPassword);

    return passwordIsValid;
};