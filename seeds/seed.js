const sequelize = require('../config/connection');
const { Driver, License, Car } = require('../models');

const departmentSeedData = require('./departmentSeedData.json');
const employeeSeedData = require('./employeeSeedData.json');
const roleSeedData = require('./roleSeedData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const drivers = await Driver.bulkCreate(driverSeedData);

  for (const { id } of drivers) {
    const newLicense = await License.create({
      driver_id: id,
    });
  }

  for (const car of carSeedData) {
    const newCar = await Car.create({
      ...car,
      // Attach a random driver ID to each car
      driver_id: drivers[Math.floor(Math.random() * drivers.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();