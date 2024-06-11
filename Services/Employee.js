const Employee = require('../Models/Employee.model')

exports.getAllEmployees = async (limit, skip) => {
  const totalCount = await Employee.countDocuments();
  let query = Employee.find().select({ name: 1, phone_no: 1}).sort({createdAt: -1});
  // if (limit !== 'null') {
  //   query = query.limit(limit);
  // }

  // if (skip !== 'null') {
  //   query = query.skip(skip);
  // }
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
  return await Employee.findById(id).select({ name: 1, phone_no: 1});
};
 
exports.updateEmployee = async (id, employee) => {
  return await Employee.findByIdAndUpdate(id, employee);
};
 
exports.deleteEmployee = async (id) => {
  return await Employee.findByIdAndDelete(id);
};