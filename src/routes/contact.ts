import express from "express";
const contactRouter = express.Router();
contactRouter.get('/contact', (req, res) => {
    res.send('GET request for Contacts -- READ');
});
contactRouter.post('/contact', (req, res) => {
    res.send('POST request for Contacts -- CREATE');
});
contactRouter.put('/contact', (req, res) => {
    res.send('PUT request for Contacts -- UPDATE');
});
contactRouter.delete('/contact', (req, res) => {
    res.send('DELETE request for Contacts -- DELETE');
});
export default contactRouter;