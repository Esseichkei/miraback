import mongoose from "mongoose";

interface IdObject {
    id: number
}

const room = new mongoose.Schema({
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
const booking = new mongoose.Schema({
    id: Number,
    check_in: Date,
    check_out: Date,
    first_name: String,
    last_name: String,
    room_id: Number,
    price: Number,
    special_request: String
}, {collection: 'bookings'});
const user = new mongoose.Schema({
    id: Number,
    full_name: String,
    email: String,
    start_date: Date,
    description: String,
    contact: String,
    status: Number,
    photo: String
}, {collection: 'users'});
const contact = new mongoose.Schema({
    id: Number,
    date: Date,
    customer: String,
    topic: String,
    text: String,
    archived: Number
}, {collection: 'contact'});

const connect = async () => {
    return await mongoose.connect('mongodb://127.0.0.1:27017/miraback');
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
    }
}
export const dbUpdate = async (itemString: string, schema: mongoose.Schema, object: IdObject) => {
    const connection = await connect();
    const model = connection.model(itemString, schema);
    await model.updateOne({id: object.id}, {...object});
}
export const dbDelete = async (itemString: string, schema: mongoose.Schema, id: number)=> {
    const connection = await connect();
    const model = connection.model(itemString, schema);
    await model.deleteOne({id: id});
}