import {Request} from 'express';

export default interface User {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
}

/**
 * A type that represents the request received by the server
 */
export default interface UserRequest extends Request {
    users?: User[];
}