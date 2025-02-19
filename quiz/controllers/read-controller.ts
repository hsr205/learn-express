import {NextFunction, RequestHandler, Response} from "express";
import {promises as fsPromises} from "fs";
import path from "path";
import data from "../../data/users.json";
import createHttpError from "http-errors";
import User from "../interfaces/user-interface";
import UserRequest from "../interfaces/user-request";


let users: User[];

const dataFile = '../../data/users.json';

async function readUsersFile() {
    try {
        console.log('reading file ... ');
        const data = await fsPromises.readFile(path.resolve(__dirname, dataFile));
        users = JSON.parse(data.toString());
        console.log('File read successfully');
    } catch (err) {
        console.error('Error reading file:', err);
        throw err;
    }
}

readUsersFile();

export const displayUsers = (req: UserRequest, res: Response, next: NextFunction) => {

    console.log("Inside displayingUsers");

    if (users) {
        req.users = users;
        next();
    } else {
        return res.json({
            error: {message: 'users not found', status: 404}
        });
    }

    req.users = users.filter(user => user && user.id !== undefined);


    let usernames = req.users.map(user => ({
        id: user.id,
        username: user.username
    }));

    console.log(`After usernames`);
    // let usernames = req.users?.map((user) => {
    //     return {id: user.id, username: user.username};
    // });


    res.send(usernames);
};


export const getEmailByUsername: RequestHandler = async (request, response, next) => {

    const userName = request.params.username;

    try {
        const userEmail = data.find((userObject) => {

            if (userObject) {
                if (userObject.username === userName) {
                    return userObject.email;
                }
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