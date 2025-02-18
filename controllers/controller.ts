import {RequestHandler} from "express";
import createHttpError from "http-errors";
import data from '../data/users.json';


export const getEmailByUsername: RequestHandler = async (request, response, next) => {

    const userName = request.params.username;

    try {
        const userEmail = data.find((userObject) => {
            if (userObject.username === userName) {
                return userObject.email;
            }
        });

        if (!userEmail) {
            throw createHttpError(404, `User not found`);
        }

        response.status(200).json(userEmail.email);
    } catch (error) {
        // Calls the exception handler THAT IS DIRECTLY AFTER THIS CODE BLOCK
        next(error);
    }
}