import express from "express";
import queryDb from "../db/mysql";
import Joi from "joi";

interface GetInfo {
    id: number | undefined
}

const userGet = async (info: GetInfo): Promise<Object> => {
    if (info.id !== undefined) {
        const result = await queryDb("SELECT * FROM users WHERE id=?", info.id);
        return result;
    }
    else {
        const results = await queryDb("SELECT * FROM users");
        return results;
    }
}

const userPost = async (info: Object): Promise<void> => {
    const roomSchema = Joi.object({
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
    try {
        const roomValidation = await roomSchema.validateAsync(info, {abortEarly: false});
        console.log(roomValidation);
    }
    catch(err) {
        console.error(err);
        return;
    }
    try {
        const queryResponse = await queryDb("INSERT INTO users SET ?", info);
        console.log(queryResponse);
    }
    catch(err) {
        console.error(err);
    }
}

const userRouter = express.Router();
userRouter.get('/users', async (req, res) => {
    const users = await userGet(req.body);
    res.json(JSON.stringify(users));
});
userRouter.post('/users', async (req, res) => {
    await userPost(req.body);
    res.send('POST request for Users -- CREATE');
});
userRouter.put('/users', (req, res) => {
    res.send('PUT request for Users -- UPDATE');
});
userRouter.delete('/users', (req, res) => {
    res.send('DELETE request for Users -- DELETE');
});
export default userRouter;