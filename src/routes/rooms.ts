import express from "express";
const roomRouter = express.Router();
roomRouter.get('/rooms', (req, res) => {
    res.send('Rooms say hi world');
});
export default roomRouter;