import express from "express";
import { dbGet, dbPost, dbPut, dbDelete, contactSchema } from "../db/mongo";
const contactRouter = express.Router();
contactRouter.get('/contact', async (req, res) => {
    let response;
    if (req.body.id !== undefined)
        response = await dbGet('Contact', contactSchema, req.body.id);
    else
        response = await dbGet('Contact', contactSchema, -1);
    res.json(response);
});
contactRouter.post('/contact', async (req, res) => {
    await dbPost('Contact', contactSchema, req.body);
    res.send('POST request for Contact -- CREATE');
});
contactRouter.put('/contact', async (req, res) => {
    await dbPut('Contact', contactSchema, req.body);
    res.send('PUT request for Contact -- UPDATE');
});
contactRouter.delete('/contact', async (req, res) => {
    await dbDelete('Contact', contactSchema, req.body.id);
    res.send('DELETE request for Contact -- DELETE');
});
export default contactRouter;