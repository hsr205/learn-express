import {NextFunction, Request, RequestHandler, Response} from "express";
import path from "path";
import {promises as fsPromises} from 'fs';


interface User {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
}

/**
 * A type that represents the request received by the server
 */
interface UserRequest extends Request {
    users?: User[];
}

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

export const addMsgToRequest = (req: UserRequest, res: Response, next: NextFunction) => {
    if (users) {
        req.users = users;
        next();
    } else {
        return res.json({
            error: {message: 'users not found', status: 404}
        });
    }

    let usernames = req.users?.map((user) => {
        return {id: user.id, username: user.username};
    });
    res.send(usernames);
};

export const addUser: RequestHandler<unknown, unknown, unknown, unknown> = async (request, response, next) => {
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