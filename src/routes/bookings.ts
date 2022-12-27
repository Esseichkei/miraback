import express from "express";
const bookingRouter = express.Router();
bookingRouter.get('/bookings', (req, res) => {
    res.send('GET request for bookings -- READ');
});
bookingRouter.post('/bookings', (req, res) => {
    res.send('POST request for bookings -- CREATE');
});
bookingRouter.put('/bookings', (req, res) => {
    res.send('PUT request for bookings -- UPDATE');
});
bookingRouter.delete('/bookings', (req, res) => {
    res.send('DELETE request for bookings -- DELETE');
});
export default bookingRouter;