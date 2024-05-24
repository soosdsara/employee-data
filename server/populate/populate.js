/*
Loading the .env file and creates environment variables from it
*/
require("dotenv").config();
const mongoose = require("mongoose");
const names = require("./names.json");
const levels = require("./levels.json");
const positions = require("./positions.json");
const EmployeeModel = require("../db/employee.model");
const BrandModel = require("../db/brand.model");


const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); // exit the current program
}

const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];

function salary() {
  return Math.floor(Math.random() * (55000 - 30000)) + 30000;
};

const first = (name) => name.split(' ')[0];
const middle = (name) => {
  if (name.split(' ').length === 3) {
    return name.split(' ')[1];
  } else {
    return '';
  }
};
const last = (name) => {
  if (name.split(' ').length === 3) {
    return name.split(' ')[2];
  } else {
    return name.split(' ')[1];
  }
};

const brandsNames = ["Acer", "Razer", "HP", "Dell", "Lenovo", "Apple"];
const colorNames = ['#0000FF', '#FFFF00', '#008000', '#FF0000', '#FF69B4', '#40E0D0'];
const desiredSalary = [61502, 62415, 70915, 64082, 55061];

const populateBrand = async () => {
  await BrandModel.deleteMany({});

  const brands = brandsNames.map((name) => (
    {
      name: name,
    }));

  await BrandModel.create(...brands);
  console.log("Brands created");
};


const populateEmployees = async () => {
  await EmployeeModel.deleteMany({});

  const brands = await BrandModel.find();

  const employees = names.map((name) => (
    {
      name: name,
      first: first(name),
      middle: middle(name),
      last: last(name),
      level: pick(levels),
      position: pick(positions),
      attendance: false,
      equipment: null,
      favoriteBrand: pick(brands)._id,
      favoriteColor: pick(colorNames),
      startingDate: Date.now(),
      currentSalary: salary(),
      desiredSalary: pick(desiredSalary),
    }));

  await EmployeeModel.create(...employees);
  console.log("Employees created");
};

const main = async () => {
  await mongoose.connect(mongoUrl);

  await populateBrand();

  await populateEmployees();

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
