const createError = require("http-errors");
const employeeService = require("../Services/Employee");
const bcrypt = require('bcrypt')

exports.getAllEmployees = async (req, res, next) => {
  try {
    let limit = req.query.limit; 
    let skip = req.query.skip; 
    let response = await employeeService.getAllEmployees(limit, skip);
    const data = response.employees.map(employee => {
      const { password, ...rest } = employee._doc;
      return rest;
    });
    res.json({ data: {
        employees: data, 
        pagination: response.pagination
    }, status: "success" });
  } catch (err) {
    next(err)
  }
};

exports.createEmployee = async (req, res, next) => {
  const { first_name, last_name, role_id, phone_no, email, password } = req.body;
  const { file } = req;
  try {
    const newEmployeeData = { first_name, last_name, image: file.buffer, role_id, phone_no, email, password };
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
    const { file } = req;
    const { password } = req.body
    let updatedData = {...req.body, image: file.buffer}
    if(password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updatedData = {...updatedData, password: hashedPassword}
    }
    const employee = await employeeService.updateEmployee(req.params.id, updatedData);
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
