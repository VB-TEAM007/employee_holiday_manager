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
const holidayRequest_1 = require("./models/holidayRequest");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const holidayRequests_1 = __importDefault(require("./storage/holidayRequests"));
const validation_1 = require("./utils/validation");
const employee_1 = require("./models/employee");
const emplioyeers_1 = __importDefault(require("./storage/emplioyeers"));
const workWithAPI_1 = require("./utils/workWithAPI");
const PORT = 3033;
const HOST = 'localhost';
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
app.get('/requests', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const holidayRequests = Requests.getHolidayRequests();
    const publicHolidays = yield (0, workWithAPI_1.getPublicHoildays)();
    res.render('requests', { holidayRequests, publicHolidays });
}));
app.get('/add-request', (req, res) => {
    res.render('add-request');
});
var requestId = 0;
app.post('/add-request', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const holidayRequest = new holidayRequest_1.HolidayRequest(requestId++, parseInt(req.body.employeeId), req.body.startDate, req.body.endDate);
    if (yield (0, validation_1.validateHolidayRequest)(holidayRequest, Employees)) {
        Requests.addHolidayRequest(holidayRequest);
        res.redirect('/requests');
    }
    else
        res.render('add-request');
}));
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
app.post('/update-request/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const request = Requests.getHolidayById(parseInt(id));
    if (request) {
        request.startDate = req.body.startDate;
        request.endDate = req.body.endDate;
        if (yield (0, validation_1.validateHolidayRequest)(request, Employees)) {
            res.redirect('/requests');
        }
    }
    res.render('update-request', { id });
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
