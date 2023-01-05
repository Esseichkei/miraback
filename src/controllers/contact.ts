import express from "express";
import Joi from "joi";
import { dbGet, dbPost, dbPut, dbDelete } from "./common";
const tableName = 'contact';

const contactSchema = Joi.object({
    id: Joi.number()
        .integer()
        .min(0)
        .required(),
    date: Joi.date()
        .required(),
    customer: Joi.string()
        .required(),
    topic: Joi.string()
        .required(),
    text: Joi.string()
        .required(),
    archived: Joi.number()
        .integer()
        .min(0)
        .max(1)
        .required()
});

const contactRouter = express.Router();
contactRouter.get('/contact', async (req, res) => {
    const reviews = await dbGet(tableName, req.body);
    res.json(reviews);
});
contactRouter.post('/contact', async (req, res) => {
    await dbPost(tableName, req.body, contactSchema);
    res.send('POST request for Contacts -- CREATE');
});
contactRouter.put('/contact', async (req, res) => {
    await dbPut(tableName, req.body, contactSchema);
    res.send('PUT request for Contacts -- UPDATE');
});
contactRouter.delete('/contact', async (req, res) => {
    await dbDelete(tableName, req.body);
    res.send('DELETE request for Contacts -- DELETE');
});
export default contactRouter;