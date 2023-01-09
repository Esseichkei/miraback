require("dotenv").config();
import { faker } from '@faker-js/faker';
import { dbPost, roomSchema, bookingSchema, userSchema, contactSchema } from './mongo';
import bcrypt from 'bcrypt';

const saltRounds = 10;
//rooms
async function seedRooms() {
    for (let i = 0; i < 50; i++) {
        const room = {
            id: i,
            type: faker.helpers.arrayElement([0, 1, 2, 3, 4]),
            offer: faker.helpers.arrayElement([0, 1]),
            price: Number(faker.commerce.price(50)),
            discount: Number(faker.commerce.price(0, 100)),
            description: faker.lorem.paragraphs(),
            cancellation: faker.lorem.sentence(),
            amenities: faker.lorem.sentence(),
            photos: `${faker.image.imageUrl()} ${faker.image.imageUrl()} ${faker.image.imageUrl()}`
        };
        try {
            const result = await dbPost("Room", roomSchema, room);
            console.log(result);
        }
        catch(err) {
            console.error(err);
        }
    }
}

seedRooms();

//bookings
async function seedBookings() {
    for (let i = 0; i < 50; i++) {
        const booking = {
            id: i,
            check_in: faker.date.between('2022-05-15', '2022-08-01'),
            check_out: faker.date.between('2022-08-02', '2022-09-15'),
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            room_id: faker.datatype.number(50),
            price: Number(faker.commerce.price(50)),
            special_request: faker.lorem.sentence(),
        };
        try {
            const result = await dbPost("Booking", bookingSchema, booking);
            console.log(result);
        }
        catch(err) {
            console.error(err);
        }
    }
}

seedBookings();

//users
async function seedUsers() {
    const catUser = {
        id: 0,
        full_name: 'Kid Kittinton',
        email: 'cat@catmail.com',
        password: await bcrypt.hash('meow', saltRounds),
        start_date: '2022-09-01',
        description: 'A real fluffy cat that always delivers!',
        contact: '12345678',
        status: 1,
        photo: faker.image.imageUrl(200, 200, 'cat')
    }
    try {
        const result = await dbPost("User", userSchema, catUser);
        console.log(result);
    }
    catch(err) {
        console.error(err);
    }
    for (let i = 1; i < 50; i++) {
        const user = {
            id: i,
            full_name: faker.name.fullName(),
            email: faker.internet.email(),
            password: await bcrypt.hash(faker.internet.password(), saltRounds),
            start_date: faker.date.recent(),
            description: faker.lorem.sentence(),
            contact: faker.phone.number(),
            status: faker.helpers.arrayElement([0, 1]),
            photo: faker.image.imageUrl()
        };
        try {
            const result = await dbPost("User", userSchema, user);
            console.log(result);
        }
        catch(err) {
            console.error(err);
        }
    }
}

seedUsers();

//contact
async function seedContact() {
    for (let i = 0; i < 50; i++) {
        const contact = {
            id: i,
            date: faker.date.recent(),
            customer: faker.name.fullName(),
            topic: faker.lorem.sentence(),
            text: faker.lorem.paragraphs(),
            archived: faker.helpers.arrayElement([0, 1])
        };
        try {
            const result = await dbPost("Contact", contactSchema, contact);
            console.log(result);
        }
        catch(err) {
            console.error(err);
        }
    }
}

seedContact();