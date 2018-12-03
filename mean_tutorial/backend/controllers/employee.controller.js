const Employee = require('../models/employee')
const employeeCtrl = {};

employeeCtrl.getEmployees = async function (req, res){
  const employees = await Employee.find();
  res.json(employees)
}

employeeCtrl.createEmployees = async function(req, res){
  const employee = new Employee(req.body);
  await employee.save()
  res.json({'Status': 'Employee saved'})
}

employeeCtrl.getEmployee = async function (req, res){
  const employee = await Employee.findById(req.params.id);
  res.json(employee);
}

employeeCtrl.editEmployee = async function (req, res){
  const employee = {
    name: req.body.name,
    position: req.body.position,
    office: req.body.office,
    salary: req.body.salary,
  }
  await Employee.findByIdAndUpdate(req.params.id, {$set:employee}, {new:true});
  res.json({'Status': 'Employee updated'})
}

employeeCtrl.deleteEmployee = async function (req, res){
  await Employee.findByIdAndRemove(req.params.id)
  res.json({'Status': 'Employee deleted'})
}

module.exports = employeeCtrl;
