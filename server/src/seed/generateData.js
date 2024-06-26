const { FieldModel } = require('../models/Field');
const { CityModel } = require('../models/City');
const { ReservationModel } = require('../models/Reservation');
const { TeamModel } = require('../models/Team');
const { UserModel } = require('../models/User');
const { ResultModel } = require('../models/Result');
const { MatchModel } = require('../models/Match');

const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');

async function generateFakeData () {
    const salt = await bcrypt.genSalt();
    // Clean existing data
    await CityModel.deleteMany({});
    await FieldModel.deleteMany({});
    await ResultModel.deleteMany({});
    await TeamModel.deleteMany({});
    await MatchModel.deleteMany({});
    await ReservationModel.deleteMany({});
    await UserModel.deleteMany({});

    // try {
    const admin = new UserModel({
        username: 'superuser',
        name: 'Josip',
        surname: 'Bogunovic',
        email: 'admin@admin.com',
        password: await bcrypt.hash('password', salt),
        phone: '0993404575',
        role: 'ADMIN',
        isDeleted: false
    });
    const josip = new UserModel({
        username: 'josip',
        name: 'Josip',
        surname: 'Bogunovic',
        email: 'josip@mail.com',
        password: await bcrypt.hash('asdasdasd', salt),
        phone: '0993404576',
        role: 'USER',
        isDeleted: false
    });
    const josip2 = new UserModel({
        username: 'josip2',
        name: 'Josip',
        surname: 'Bogunovic',
        email: 'josip2@mail.com',
        password: await bcrypt.hash('asdasdasd', salt),
        phone: '0993404577',
        role: 'FIELD_OWNER',
        isDeleted: false
    });
    await admin.save();
    await josip.save();
    await josip2.save();
    // Generate users
    const users = [];
    for (let i = 0; i < 50; i++) {
        const user = new UserModel({
            username: faker.internet.userName(),
            name: faker.person.firstName(),
            surname: faker.person.lastName(),
            email: faker.internet.email(),
            password: await bcrypt.hash('password', salt),
            phone: faker.phone.number(),
            role: faker.helpers.arrayElement(['USER', 'FIELD_OWNER']),
            isDeleted: false
        });
        users.push(user);
        await user.save();
    }
    console.log(users);

    // Generate cities
    const cities = [];
    for (let i = 0; i < 5; i++) {
        const city = new CityModel({
            name: faker.location.city()
        });
        cities.push(city);
        await city.save();
    }

    // Generate fields
    const fields = [];
    for (let i = 0; i < 10; i++) {
        const field = new FieldModel({
            name: faker.company.name(),
            city: faker.helpers.arrayElement(cities),
            address: faker.location.streetAddress(),
            owner: faker.helpers.arrayElement(users.filter(user => user.role === 'FIELD_OWNER'))._id,
            maxPlayers: faker.helpers.arrayElement([10, 12, 14, 16])
        });
        fields.push(field);
        await field.save();
    }

    // Generate results
    const results = [];
    for (let i = 0; i < 10; i++) {
        const result = new ResultModel({
            whiteTeamScore: faker.number.int({ min: 0, max: 10 }),
            blackTeamScore: faker.number.int({ min: 0, max: 10 })
        });
        results.push(result);
        await result.save();
    }

    // Generate teams
    const teams = [];
    for (let i = 0; i < 10; i++) {
        const team = new TeamModel({
            players: faker.helpers.arrayElements(users.map(each => each._id)),
            color: faker.helpers.arrayElement(['white', 'black'])
        });
        teams.push(team);
        await team.save();
    }

    //     // Generate matches
    //     const matches = [];
    //     for (let i = 0; i < 10; i++) {
    //         const match = new MatchModel({
    //             whiteTeam: faker.helpers.arrayElement(teams),
    //             blackTeam: faker.helpers.arrayElement(teams),
    //             result: faker.helpers.arrayElement(results)
    //         });
    //         matches.push(match);
    //         await match.save();
    //     }

    //     // Generate reservations
    //     for (let i = 0; i < 20; i++) {
    //         const reservation = new ReservationModel({
    //             field: faker.helpers.arrayElement(fields)._id,
    //             match: faker.helpers.arrayElement(matches),
    //             time: faker.date.future(),
    //             status: faker.helpers.arrayElement(['scheduled', 'canceled', 'done']),
    //             registeredPlayers: faker.helpers.arrayElements(users.map(each => each._id), 2),
    //             openEntry: faker.datatype.boolean()
    //         });
    //         await reservation.save();
    //     }
    // } catch (error) {
    //     console.log(error);
    // }

    console.log('Fake data generated successfully');
    mongoose.disconnect();
}
module.exports = generateFakeData;
