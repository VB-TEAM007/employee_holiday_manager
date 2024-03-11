const HolidayRequest = require('./storage/holidayRequest');
const express = require('express');
const bodyParser = require('body-parser');
const PORT = 3033;
const HOST = 'localhost';

const app = express();
app.use(express.static('public'))
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));

const holidayRequests = [];
const employees = [];

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/add-employee', (req, res) => {
  const newEmployee = {
    id: employees.length,
    name: req.body.name,
    remainingHolidays: req.body.remainingHolidays,
  };

  employees.push(newEmployee);
  res.redirect('/');
});

app.get('/add-employee', (req, res) => {
  res.render('add-employee');
});

app.get('/employees', (req, res) => {
  res.render('employees', { employees });
});

app.get('/holidays', (req, res) => {
  res.render('holidays', { holidayRequests });
});

app.post('/approve-request', (req, res) => {
  const requestId = req.body.requestId;
  const request = holidayRequests.find(req => req.id === requestId);
  if (request) {
    request.status = 'approved';
    res.redirect('/holidays');
  } 
});

app.post('/reject-request', (req, res) => {
  const requestId = req.body.requestId;
  const request = holidayRequests.find(req => req.id === requestId);
  if (request) {
    request.status = 'rejected';
    res.redirect('/holidays');
  } 
});

app.get('/add-holiday', (req, res) => {
  res.render('add-holiday');
});

app.post('/add-holiday', (req, res) => {
  const newRequest = new HolidayRequest(req.body);
  holidayRequests.push(newRequest);
  res.redirect('/holidays')
});

app.get('*', (req, res) => {
  res.status(404).render('error');
});

app.listen(PORT, HOST, () => {
  console.log(`Server started: http://${HOST}:${PORT}`);
});