const createError = require("http-errors");
const employeeService = require("../Services/Employee");
const bcrypt = require('bcrypt')

exports.getAllEmployees = async (req, res, next) => {
  try {
    let limit = req.query.limit; 
    let skip = req.query.skip; 
    let response = await employeeService.getAllEmployees(limit, skip);
    res.json({ data: response  });
  } catch (err) {
    next(err)
  }
};

exports.createEmployee = async (req, res, next) => {
  const { name, phone_no, password } = req.body;
  try {
    const newEmployeeData = { name, phone_no, password };
    await employeeService.createEmployee(newEmployeeData);
    res.json({ message: "Employee Added Successfully", status: "success" });
  } catch (err) {
    next(err)
  }
};

exports.getEmployeeById = async (req, res, next) => {
  try {
    const employee = await employeeService.getEmployeeById(req.params.id);
    if(!employee) throw createError.NotFound()
    res.json({ data: employee, status: "success" });
  } catch (err) {
    next(err)
  }
};

exports.updateEmployee = async (req, res, next) => {
  try {
    const { name, password } = req.body
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const employee = await employeeService.updateEmployee(req.params.id, { name: name, password: hashedPassword });
    if(!employee) throw createError.NotFound()
    res.json({ message: "Employee Updated Successfully", status: "success" });
  } catch (err) {
    next(err)
  }
};

exports.deleteEmployee = async (req, res, next) => {
  try {
    const employee = await employeeService.deleteEmployee(req.params.id);
    if(!employee) throw createError.NotFound()
    res.json({ message: "Employee Deleted Successfully", status: "success" });
  } catch (err) {
    next(err)
  }
};
