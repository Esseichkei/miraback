import express from "express";
import queryDb from "../db/mysql";
import Joi from "joi";

const userPost = async (req: any): Promise<void> => {
    const roomSchema = Joi.object({
        id: Joi.number()
            .integer()
            .min(0)
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
        const roomValidation = await roomSchema.validateAsync(req.body, {abortEarly: false});
        console.log(roomValidation);
    }
    catch(err) {
        console.error(err);
        return;
    }
    try {
        const queryResponse = await queryDb("INSERT INTO users SET ?", req.body);
        console.log(queryResponse);
    }
    catch(err) {
        console.error(err);
    }
}

const userRouter = express.Router();
userRouter.get('/users', (req, res) => {
    res.send('GET request for Users -- READ');
});
userRouter.post('/users', async (req, res) => {
    await userPost(req);
    res.send('POST request for Users -- CREATE');
});
userRouter.put('/users', (req, res) => {
    res.send('PUT request for Users -- UPDATE');
});
userRouter.delete('/users', (req, res) => {
    res.send('DELETE request for Users -- DELETE');
});
export default userRouter;