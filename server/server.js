require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const EmployeeModel = require("./db/employee.model");
const EquipmentModel = require("./db/equipment.model");
const BrandModel = require("./db/brand.model");
const ToolModel = require("./db/tools.model");
const KittenModel = require("./db/kittens.model");
const BoardgameModel = require("./db/boardgame.model");



const { MONGO_URL, PORT = 8080 } = process.env;

if (!MONGO_URL) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}

const app = express();
app.use(express.json());

app.get("/api/employees", async (req, res) => {
  try {
    const page = req.query.page;
    const skip = (page - 1) * 10;
    const employees = (await EmployeeModel.find()
      .sort({ created: "desc" })
      .skip(skip)
      .limit(10)
      .populate('favoriteBrand')
      .populate('kittens')
      .populate('boardGame'));

    return res.json(employees);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/employees/:id", async (req, res) => {
  if (req.params.id == 'all') {
    const employees = await EmployeeModel.find().populate('favoriteBrand');
    return res.json(employees);
  } else {
    const employee = await EmployeeModel.findById(req.params.id).populate('favoriteBrand').populate('kittens').populate('boardGame');
    return res.json(employee);
  }
});

//FILTER, (missing)
app.get("/api/employees-filter", async (req, res) => {
  const filter = req.query.filter;
  const employees = await EmployeeModel.find().or([
    { level: { $regex: filter, $options: "i" } },
    { position: { $regex: filter, $options: "i" } },
    /* { attendance: filter} */
  ]);
  return res.json(employees);
});

//SORT
app.get("/api/employees-sort", async (req, res) => {
  try {
    const sortBy = req.query.sortby;
    const direction = () => {
      if (req.query.direction == 'false') {
        return 1
      } else {
        return -1
      }
    }
    let sort = {};
    sort[sortBy] = direction();
    const employees = await EmployeeModel.find().sort(sort);//{sortBy: direction()}
    return res.json(employees);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

//EQUIPMENT
app.get("/api/equipments/", async (req, res) => {
  const equipment = await EquipmentModel.find();
  return res.json(equipment);
});

app.post("/api/equipments/", async (req, res, next) => {
  const equipment = req.body;
  try {
    const saved = await EquipmentModel.create(equipment);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
});

app.delete("/api/equipments/:id", async (req, res, next) => {
  try {
    const equipment = await EquipmentModel.findByIdAndDelete(req.params.id);
    return res.json(equipment);
  } catch (err) {
    return next(err);
  }
});

app.patch('/api/equipments/:id', async (req, res, next) => {
  try {
    const equipmentId = req.params.id;
    const updateData = req.body;
    const updatedEquipment = await EquipmentModel.findByIdAndUpdate(
      equipmentId,
      updateData,
      { new: true }
    )
    return res.json(updatedEquipment)
  } catch (error) {
    next(error)
  }
})

//SEARCH
app.get('/employees/:name', async (req, res, next) => {
  try {
    const employeeName = req.params.name
    const employees = await EmployeeModel.find({ name: { $regex: employeeName, $options: 'i' } })
    return res.json(employees);
  } catch (error) {
    next(err)
  }
})

//ATTENDANCE
app.patch('/api/employees-attendance/:id', async (req, res, next) => {
  try {
    const employeeId = req.params.id;
    const currentEmployee = await EmployeeModel.findById(employeeId);
    const updatedEmployee = await EmployeeModel.findByIdAndUpdate(
      employeeId,
      { attendance: !currentEmployee.attendance },
      { new: true }
    );
    return res.json(updatedEmployee);
  } catch (error) {
    next(error);
  }
});

//BRANDS
app.get('/api/brand/', async (req, res, next) => {
  try {
    const brands = await BrandModel.find()
    return res.json(brands);
  } catch (error) {
    next(error);
  }
});

//TOP SALARY
app.get('/api/employees-topsalary', async (req, res, next) => {
  try {
    const topSalarys = await EmployeeModel.find().sort({ currentSalary: -1 }).limit(3)
    res.json(topSalarys);
  } catch (error) {
    next(error)
  }
});

//TOOLS
app.get('/api/tools', async (req, res, next) => {
  const filter = req.query.filter;
  try {
    if (filter == 'all') {
      const tools = await ToolModel.find();
      res.json(tools)
    } else {
      const tools = (await ToolModel.find({ name: { $regex: `^${filter}`, $options: 'i' } }))
      res.json(tools)
    }
  } catch (error) {
    next(error)
  }
})

app.post('/api/tools', async (req, res, next) => {
  const tool = req.body;
  try {
    const saved = await ToolModel.create(tool);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
})

//KITTENS
app.get('/api/kittens', async (req, res, next) => {
  try {
    const kittens = await KittenModel.find().populate('employee');
    res.json(kittens);
  } catch (error) {
    next(error)
  }
})

app.post("/api/kittens", async (req, res, next) => {
  const kitten = req.body;
  const employeeId = kitten.employee;
  try {
    const savedKitten = await KittenModel.create(kitten);
    const employee = await EmployeeModel.findById(employeeId);
    const kittens = { kittens: [...employee.kittens, savedKitten._id] }
    const savedEmployee = await EmployeeModel.findByIdAndUpdate(
      employeeId,
      kittens,
      { new: true }
    );
    return res.json(savedEmployee);
  } catch (err) {
    return next(err);
  }
});

app.patch('/api/kittens/', async (req, res, next) => { //DELETE? 2 helyről kérdézni?
  const kittenId = req.query.kitten;
  const employeeId = req.query.employee;
  const newKittens = req.body;//{ ...employee, kittens: updatedKittens }
  try {
    const deletedKitten = await KittenModel.findByIdAndDelete(kittenId);
    const updatedEmployee = await EmployeeModel.findByIdAndUpdate(employeeId, newKittens, { new: true });
    return res.json(updatedEmployee)
  } catch (error) {
    next(error)
  }
});

//BOARDGAME
app.get("/api/boardgame", async (req, res) => {
  const maxPlayers = req.query.maxPlayers;
  try {
    if (maxPlayers) {
      const game = await BoardgameModel.find({ maxPlayers: { $lte: maxPlayers } })
      return res.json(game);
    }
    const game = await BoardgameModel.find()
    return res.json(game);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/boardgame/:id", async (req, res) => {
  const gameId = req.params.id
  try {
    const game = await BoardgameModel.findById(gameId);
    return res.json(game)
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/boardgame", async (req, res) => {
  try {
    const game = req.body;
    const savedGame = await BoardgameModel.create(game);
    return res.json(savedGame);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/employees/", async (req, res, next) => {
  const employee = req.body;
  try {
    const saved = await EmployeeModel.create(employee);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
});

app.patch("/api/employees/:id", async (req, res, next) => {
  try {
    const employee = await EmployeeModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { new: true }
    );
    return res.json(employee);
  } catch (err) {
    return next(err);
  }
});

app.delete("/api/employees/:id", async (req, res, next) => {
  try {
    const employee = await EmployeeModel.findById(req.params.id);
    const deleted = await employee.delete();
    return res.json(deleted);
  } catch (err) {
    return next(err);
  }
});

const main = async () => {
  await mongoose.connect(MONGO_URL);

  app.listen(PORT, () => {
    console.log("App is listening on 8080");
    console.log("Try /api/employees route right now");
  });
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});