import express from "express";
import Joi from "joi";
import { dbGet, dbPost, dbPut, dbDelete } from "./common";
const tableName = 'rooms';

const roomSchema = Joi.object({
    number: Joi.number()
        .integer()
        .min(0)
        .required(),
    type: Joi.number()
        .min(0)
        .max(4)
        .required(),
    offer: Joi.number()
        .min(0)
        .max(1)
        .required(),
    start_date: Joi.date()
        .required(),
    price: Joi.number()
        .min(50)
        .max(1000)
        .required(),
    discount: Joi.number()
        .min(0)
        .max(100)
        .required(),
    description: Joi.string()
        .required(),
    cancellation: Joi.string()
        .required(),
    amenities: Joi.string()
        .required(),
    photos: Joi.string()
        .pattern(/([^ ]+ [^ ]+ [^ ]+)/) //three nonspace blobs separated by two spaces
        .required()
});

const roomRouter = express.Router();
roomRouter.get('/rooms', async (req, res) => {
    const rooms = await dbGet(tableName, req.body);
    res.json(rooms);
});
roomRouter.post('/rooms', async (req, res) => {
    await dbPost(tableName, req.body, roomSchema);
    res.send('POST request for Rooms -- CREATE');
});
roomRouter.put('/rooms', async (req, res) => {
    await dbPut(tableName, req.body, roomSchema);
    res.send('PUT request for Rooms -- UPDATE');
});
roomRouter.delete('/rooms', async (req, res) => {
    await dbDelete(tableName, req.body);
    res.send('DELETE request for Rooms -- DELETE');
});
export default roomRouter;