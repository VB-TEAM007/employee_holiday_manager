import express from 'express';
import Employee from '../models/employee';
import { collections } from '../utils/database';

const employeeRouter = express.Router();

employeeRouter.get('/add-employee', (req, res)  => {
  res.render('add-employee');
});

employeeRouter.post('/add-employee', async (req, res) => {
  const newEmployee = {
    name: req.body.name,
    remainingHolidays: req.body.remainingHolidays,
  }
  await collections.employee?.insertOne(newEmployee);
  res.redirect('employees');
});

employeeRouter.get('/employees', async(req, res)  => {
  const employees = (await collections.employee?.find({}).toArray()) as Employee[];
  res.render('employees', { employees });
});

export default employeeRouter;
