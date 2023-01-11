import express from "express";
import { dbGet, dbPost, dbPut, dbDelete, roomSchema } from "../db/mongo";
const roomRouter = express.Router();
roomRouter.get('/rooms/:id(\\d+)', async (req, res) => {
    const response = await dbGet('Room', roomSchema, Number(req.params.id))
    res.json(response);
});
roomRouter.get('/rooms', async (req, res) => {
    const response = await dbGet('Room', roomSchema, -1);
    res.json(response);
});
roomRouter.post('/rooms', async (req, res) => {
    await dbPost('Room', roomSchema, req.body);
    res.send('POST request for Rooms -- CREATE');
});
roomRouter.put('/rooms', async (req, res) => {
    await dbPut('Room', roomSchema, req.body);
    res.send('PUT request for Rooms -- UPDATE');
});
roomRouter.delete('/rooms', async (req, res) => {
    await dbDelete('Room', roomSchema, req.body.id);
    res.send('DELETE request for Rooms -- DELETE');
});
export default roomRouter;