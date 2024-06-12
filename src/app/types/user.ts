// types/User.ts
export interface User {
    _id: string;
    username: string;
    email: string;
    specialization: string;
    password: string;
    isVerified: boolean;
    forgotPasswordToken?: string;
    forgotPasswordTokenExpiry?: Date;
    verifyToken?: string;
    verifyTokenExpiry?: Date;
}
