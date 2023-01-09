import mongoose from "mongoose";

//require("dotenv").config();

interface IdObject {
    id: number
}

export const roomSchema = new mongoose.Schema({
    id: Number,
    type: Number,
    offer: Number,
    price: Number,
    discount: Number,
    description: String,
    cancellation: String,
    amenities: String,
    photos: String
}, {collection: 'rooms'});
export const bookingSchema = new mongoose.Schema({
    id: Number,
    check_in: Date,
    check_out: Date,
    first_name: String,
    last_name: String,
    room_id: Number,
    price: Number,
    special_request: String
}, {collection: 'bookings'});
export const userSchema = new mongoose.Schema({
    id: Number,
    full_name: String,
    email: String,
    start_date: Date,
    description: String,
    contact: String,
    status: Number,
    photo: String
}, {collection: 'users'});
export const contactSchema = new mongoose.Schema({
    id: Number,
    date: Date,
    customer: String,
    topic: String,
    text: String,
    archived: Number
}, {collection: 'contact'});

console.log(process.env.MONGO_URI);
const connect = async () => {
    return await mongoose.connect(String(process.env.MONGO_URI));
}

export const dbGet = async (itemString: string, schema: mongoose.Schema, id: number = -1) => {
    const connection = await connect();
    const model = connection.model(itemString, schema);
    if (id === -1) {
        return await model.find().exec();
    } else {
        return await model.findOne({id: id}).exec();
    }
}
export const dbPost = async (itemString: string, schema: mongoose.Schema, object: IdObject) => {
    const connection = await connect();
    const model = connection.model(itemString, schema);
    const item = new model({...object});
    if ((await model.find({id: object.id}).exec()).length === 0) {
        await item.save();
        return 'Item saved!';
    }
    return 'Item already in DB.';
}
export const dbPut = async (itemString: string, schema: mongoose.Schema, object: IdObject) => {
    const connection = await connect();
    const model = connection.model(itemString, schema);
    const response = await model.updateOne({id: object.id}, {...object});
    if (response.acknowledged && response.modifiedCount) {
        return 'Item updated!';
    }
    return 'Item not updated, something went wrong.';
}
export const dbDelete = async (itemString: string, schema: mongoose.Schema, id: number)=> {
    const connection = await connect();
    const model = connection.model(itemString, schema);
    const response = await model.deleteOne({id: id});
    if (response.acknowledged && response.deletedCount) {
        return 'Item deleted!';
    }
    return 'Item not deleted, something went wrong.';
}