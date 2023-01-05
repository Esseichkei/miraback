import express from "express";
import Joi from "joi";
import { dbGet, dbPost, dbPut, dbDelete } from "./common";
const tableName = 'bookings';

const bookingSchema = Joi.object({
    id: Joi.number()
        .integer()
        .min(0)
        .required(),
    check_in: Joi.date()
        .required(),
    check_out: Joi.date()
        .min(Joi.ref('check_in'))
        .required(),
    first_name: Joi.string()
        .required(),
    last_name: Joi.string()
        .required(),
    room_number: Joi.number()
        .integer()
        .min(0)
        .required(),
    price: Joi.number()
        .min(50)
        .max(1000)
        .required(),
    special_request: Joi.string()
        .required()
});

const bookingRouter = express.Router();
bookingRouter.get('/bookings', async (req, res) => {
    const bookings = await dbGet(tableName, req.body);
    res.json(bookings);
});
bookingRouter.post('/bookings', async (req, res) => {
    await dbPost(tableName, req.body, bookingSchema);
    res.send('POST request for bookings -- CREATE');
});
bookingRouter.put('/bookings', async (req, res) => {
    await dbPut(tableName, req.body, bookingSchema);
    res.send('PUT request for bookings -- UPDATE');
});
bookingRouter.delete('/bookings', async (req, res) => {
    await dbDelete(tableName, req.body);
    res.send('DELETE request for bookings -- DELETE');
});
export default bookingRouter;