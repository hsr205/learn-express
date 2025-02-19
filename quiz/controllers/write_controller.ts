import {RequestHandler} from "express";
import path from "path";
import {promises as fsPromises} from 'fs';
import User from "../types";


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

export const addUser: RequestHandler<unknown, unknown, User, unknown> = async (request, response, next) => {


    try {

        let newUser = request.body as User;

        users.push(newUser);

        await fsPromises.writeFile(
            path.resolve(__dirname, dataFile),
            JSON.stringify(users)
        );

        console.log('User Saved');
        response.send('done');
    } catch (err) {
        console.log('Failed to write:', err);
        response.status(500).send('Error saving user');
    }
};