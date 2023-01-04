import express from "express";
import { dbGet, dbPost, dbPut, dbDelete, userSchema } from "../db/mongo";
const userRouter = express.Router();
userRouter.get('/users', async (req, res) => {
    let response;
    if (req.body.id !== undefined)
        response = await dbGet('User', userSchema, req.body.id);
    else
        response = await dbGet('User', userSchema, -1);
    res.json(response);
});
userRouter.post('/users', async (req, res) => {
    await dbPost('User', userSchema, req.body);
    res.send('POST request for Users -- CREATE');
});
userRouter.put('/users', async (req, res) => {
    await dbPut('User', userSchema, req.body);
    res.send('PUT request for Users -- UPDATE');
});
userRouter.delete('/users', async (req, res) => {
    await dbDelete('User', userSchema, req.body.id);
    res.send('DELETE request for Users -- DELETE');
});
export default userRouter;