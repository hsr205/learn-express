import express from 'express';
import ReadUsers from "./readUsers";
import WriteUsers from "./writeUsers";

const app = express();
const port = 8000;


app.use('/read', ReadUsers);
app.use('/write', WriteUsers);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
