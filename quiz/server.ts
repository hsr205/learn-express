import express, {Express} from 'express';
import ReadUsers from "./readUsers";
import WriteUsers from "./writeUsers";


import cors from 'cors';

// the server application object created by the express server
const app: Express = express();
const port: number = 8000;


// a middleware function the verifies the origin of the request using a cors package
app.use(cors({origin: 'http://localhost:3000'}));

// adds the middleware function to the application
app.use('/read', ReadUsers);


// a middleware function that parses the request body to json
// app.use(express.json());
// app.use(express.urlencoded({extended: true}));

app.use('/write', WriteUsers);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});