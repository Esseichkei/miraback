import express from "express";
import Joi from "joi";
import { dbGet, dbPost, dbPut, dbDelete } from "./common";
const tableName = 'users';

const userSchema = Joi.object({
    id: Joi.number()
        .integer()
        .min(0)
        .required(),
    full_name: Joi.string()
        .required(),
    email: Joi.string()
        .email()
        .required(),
    start_date: Joi.date()
        .required(),
    description: Joi.string(),
    contact: Joi.string()
        .required(),
    status: Joi.number()
        .min(0)
        .max(1)
        .required(),
    photo: Joi.string()
        .required()
});

const userRouter = express.Router();
userRouter.get('/users', async (req, res) => {
    const users = await dbGet(tableName, req.body);
    res.json(JSON.stringify(users));
});
userRouter.post('/users', async (req, res) => {
    await dbPost(tableName, req.body, userSchema);
    res.send('POST request for Users -- CREATE');
});
userRouter.put('/users', async (req, res) => {
    await dbPut(tableName, req.body, userSchema);
    res.send('PUT request for Users -- UPDATE');
});
userRouter.delete('/users', async (req, res) => {
    await dbDelete(tableName, req.body);
    res.send('DELETE request for Users -- DELETE');
});
export default userRouter;