import express from "express";
import { dbGet, dbPost, dbPut, dbDelete, roomSchema } from "../db/mongo";
const roomRouter = express.Router();
roomRouter.get('/rooms', async (req, res) => {
    let response;
    if (req.body.id !== undefined)
        response = await dbGet('Room', roomSchema, req.body.id);
    else
        response = await dbGet('Room', roomSchema, -1);
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