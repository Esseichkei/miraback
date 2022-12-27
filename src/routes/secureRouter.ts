import express from "express";
import roomRouter from "../controllers/rooms";
import bookingRouter from "../controllers/bookings";
import userRouter from "../controllers/users";
import contactRouter from "../controllers/contact";

const secureRouter = express.Router();
secureRouter.use(roomRouter);
secureRouter.use(bookingRouter);
secureRouter.use(userRouter);
secureRouter.use(contactRouter);

export default secureRouter;