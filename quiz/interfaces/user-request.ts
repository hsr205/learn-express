import User from "./user-interface";
import {Request} from "express";


/**
 * A type that represents the request received by the server
 */
export default interface UserRequest extends Request {
    users?: User[];
}