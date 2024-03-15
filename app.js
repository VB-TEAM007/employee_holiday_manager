"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const holidayRequests_1 = __importDefault(require("./storage/holidayRequests"));
const validation_1 = require("./utils/validation");
const employee_1 = require("./models/employee");
const emplioyeers_1 = __importDefault(require("./storage/emplioyeers"));
const axios_1 = __importDefault(require("axios"));
const PORT = 3033;
const HOST = 'localhost';
const CURRENT_YEAR = new Date().getFullYear();
const UKRAINE_COUNTRY_CODE = 'UA';
const BASE_URL = `https://date.nager.at/api/v3/PublicHolidays/${CURRENT_YEAR}/${UKRAINE_COUNTRY_CODE}`;
const app = (0, express_1.default)();
app.set('view engine', 'ejs');
app.use(body_parser_1.default.urlencoded({ extended: true }));
const Requests = new holidayRequests_1.default();
const Employees = new emplioyeers_1.default();
app.get('/', (req, res) => {
    res.render('index');
});
app.get('/add-employee', (req, res) => {
    res.render('add-employee');
});
var employeeId = 0;
app.post('/add-employee', (req, res) => {
    const newEmployee = new employee_1.Employee(employeeId++, req.body.name, req.body.remainingHolidays);
    Employees.addEmployee(newEmployee);
    res.redirect('/employees');
});
app.get('/employees', (req, res) => {
    const employees = Employees.getEmployees();
    res.render('employees', { employees });
});
app.get('/requests', (req, res) => {
    const holidayRequests = Requests.getHolidayRequests();
    res.render('requests', { holidayRequests });
});
app.get('/add-request', (req, res) => {
    res.render('add-request');
});
// var requestId = 0;
// app.post('/add-request', (req, res)  => {
//     const requests = Requests.getHolidayRequests();
//     const holidayRequest = new HolidayRequest( requestId++, parseInt(req.body.employeeId), req.body.startDate, req.body.endDate);
//     if (validateHolidayRequest(holidayRequest, Employees)){
//     Requests.addHolidayRequest(holidayRequest);
//     res.redirect('/requests');    
//     }
//     else res.render('add-request')
// }); 
app.post('/approve-request/:id', (req, res) => {
    const request = Requests.getHolidayById(parseInt(req.params.id));
    if (request) {
        request.status = 'approved';
    }
    res.redirect('/requests');
});
app.post('/reject-request/:id', (req, res) => {
    const request = Requests.getHolidayById(parseInt(req.params.id));
    if (request) {
        request.status = 'rejected';
    }
    res.redirect('/requests');
});
app.post('/delete-request/:id', (req, res) => {
    Requests.deleteHolidayRequests(req.body.id);
    res.redirect('/requests');
});
app.get('/update-request/:id', (req, res) => {
    const id = req.params.id;
    res.render('update-request', { id });
});
app.post('/update-request/:id', (req, res) => {
    const id = req.params.id;
    const request = Requests.getHolidayById(parseInt(id));
    if (request) {
        request.startDate = req.body.startDate;
        request.endDate = req.body.endDate;
        if ((0, validation_1.validateHolidayRequest)(request, Employees)) {
            res.redirect('/requests');
        }
    }
    res.render('update-request', { id });
});
app.get('/public-holidays', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(BASE_URL);
        const holidays = response.data.map((h) => ({ date: h.date, name: h.name }));
        res.render('public-holidays', { holidays });
    }
    catch (error) {
        console.error('Error fetching public holidays:', error);
    }
}));
app.get('*', (req, res) => {
    res.status(404).render('error');
});
app.get('*', (req, res) => {
    res.status(404).render('error');
});
app.listen(PORT, HOST, () => {
    console.log(`Server started: http://${HOST}:${PORT}`);
});
