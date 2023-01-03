import express from "express";
import queryDb from "../db/mysql";
import Joi from "joi";

interface IdInfo {
    id: number | undefined
}

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

const userGet = async (info: IdInfo): Promise<Object> => {
    if (info.id !== undefined) {
        try {
            const result = await queryDb("SELECT * FROM users WHERE id=?", info.id);
            return result;
        } catch(err) {
            console.error(err);
            return {};
        }
    }
    else {
        try {
            const result = await queryDb("SELECT * FROM users");
            return result;
        } catch(err) {
            console.error(err);
            return {};
        }
    }
};

const userPost = async (info: Object): Promise<void> => {
    try {
        await roomSchema.validateAsync(info, {abortEarly: false});
    } catch (err) {
        console.error(err);
    }
    try {
        await queryDb("INSERT INTO users SET ?", info);
    } catch (err) {
        console.error(err);
    }
};
const userPut = async (info: IdInfo): Promise<void> => {
    try {
        await roomSchema.validateAsync(info, {abortEarly: false});
    } catch (err) {
        console.error(err);
    }
    try {
        await queryDb("UPDATE users SET ? WHERE id=?", [info, info.id]);
    } catch (err) {
        console.error(err);
    }
}
const userDelete = async (info: IdInfo): Promise<void> => {
    if (info === undefined)
        return;
    try {
        await queryDb("DELETE FROM users WHERE id=?", info.id);
    } catch (err) {
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
userRouter.put('/users', async (req, res) => {
    await userPut(req.body);
    res.send('PUT request for Users -- UPDATE');
});
userRouter.delete('/users', async (req, res) => {
    await userDelete(req.body);
    res.send('DELETE request for Users -- DELETE');
});
export default userRouter;