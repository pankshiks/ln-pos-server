const Employee = require('../Models/Employee.model')

exports.getAllEmployees = async (limit, skip) => {
  const totalCount = await Employee.countDocuments({email: { $ne: "droon99@yopmail.com" }});
  let query = Employee.find({ email: { $ne: "droon99@yopmail.com" } }).sort({createdAt: -1});
  if (limit !== 'null') {
    query = query.limit(limit);
  }

  if (skip !== 'null') {
    query = query.skip(skip);
  }
  let employees = await query;
  return {
    employees: employees, 
    pagination: { 
      limit: limit || totalCount,
      skip: skip || 0,
      total: totalCount
    }
  }
};
exports.createEmployee = async (employee) => {
  return await Employee.create(employee);
};
exports.getEmployeeById = async (id) => {
  return await Employee.findById(id);
};
 
exports.updateEmployee = async (id, employee) => {
  return await Employee.findByIdAndUpdate(id, employee);
};
 
exports.deleteEmployee = async (id) => {
  return await Employee.findByIdAndDelete(id);
};