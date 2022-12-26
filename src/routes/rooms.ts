import express from "express";
const roomRouter = express.Router();
roomRouter.get('/rooms', (req, res) => {
    res.send('GET request for Rooms -- READ');
});
roomRouter.post('/rooms', (req, res) => {
    res.send('POST request for Rooms -- CREATE');
});
roomRouter.put('/rooms', (req, res) => {
    res.send('PUT request for Rooms -- UPDATE');
});
roomRouter.delete('/rooms', (req, res) => {
    res.send('DELETE request for Rooms -- DELETE');
});
export default roomRouter;