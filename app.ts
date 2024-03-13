import { HolidayRequest } from './models/holidayRequest';
import express from "express";
import bodyParser from 'body-parser';
import HolidayRequests from './storage/holidayRequests';

const PORT = 3033;
const HOST = 'localhost';

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

const requests: HolidayRequest[] = [];
const Requests = new HolidayRequests();
interface Employee {
  id: number;
  name: string;
  remainingHolidays: number;
}

const employees: Employee[] = [];

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/add-employee', (req, res) => {
  const newEmployee: Employee = {
    id: employees.length,
    name: req.body.name,
    remainingHolidays: req.body.remainingHolidays,
  };

  employees.push(newEmployee);
  res.redirect('/');
});

app.get('/add-employee', (req, res)  => {
  res.render('add-employee');
});

app.get('/employees', (req, res)  => {
  res.render('employees', { employees });
});

app.get('/requests', (req, res)  => {
  const holidayRequests = Requests.getHolidayRequests();
  console.log(requests);
  res.render('requests', { holidayRequests });
});

app.get('/add-request', (req, res)  => {
  res.render('add-request');
});

app.post('/add-request', (req, res)  => {
    const holidayRequest = new HolidayRequest(req.body.employeeId, req.body.startDate, req.body.endDate);
    Requests.addHolidayRequest(holidayRequest);
    res.redirect('/requests');
});

app.post('/approve-request', (req, res)  => {
  const requestId = req.body.requestId;
  const request = requests.find(req => req.employeeId === requestId);;
  if (request) {
    request.status = 'approved';
    res.redirect('/requests');
  }
});

app.post('/reject-request', (req, res)  => {
  const requestId = req.body.requestId;
  const request = requests.find(req => req.employeeId === requestId);;
  if (request) {
    request.status = 'rejected';
    res.redirect('/requests');
  }
});

app.get('*', (req, res)  => {
  res.status(404).render('error');
});

app.listen(PORT, HOST, () => {
  console.log(`Server started: http://${HOST}:${PORT}`);
});