import express from "express";
import { dbGet, dbPost, dbPut, dbDelete, bookingSchema } from "../db/mongo";
const bookingRouter = express.Router();
bookingRouter.get('/bookings', async (req, res) => {
    let response;
    if (req.body.id !== undefined)
        response = await dbGet('Booking', bookingSchema, req.body.id);
    else
        response = await dbGet('Booking', bookingSchema, -1);
    res.json(response);
});
bookingRouter.post('/bookings', async (req, res) => {
    await dbPost('Booking', bookingSchema, req.body);
    res.send('POST request for Bookings -- CREATE');
});
bookingRouter.put('/bookings', async (req, res) => {
    await dbPut('Booking', bookingSchema, req.body);
    res.send('PUT request for Bookings -- UPDATE');
});
bookingRouter.delete('/bookings', async (req, res) => {
    await dbDelete('Booking', bookingSchema, req.body.id);
    res.send('DELETE request for Bookings -- DELETE');
});
export default bookingRouter;