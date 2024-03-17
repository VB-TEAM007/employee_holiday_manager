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
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateHolidayRequest = void 0;
const workWithAPI_1 = require("./workWithAPI");
const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
function validateHolidayRequest(request, Employees) {
    return __awaiter(this, void 0, void 0, function* () {
        const employee = Employees.getEmployeeById(request.employeeId);
        if (employee) {
            const today = new Date();
            const startDate = new Date(request.startDate);
            const endDate = new Date(request.endDate);
            if (startDate > today) {
                const totalDaysRequested = Math.ceil((endDate.getTime() - startDate.getTime()) / MILLISECONDS_PER_DAY);
                const publicHolidays = yield (0, workWithAPI_1.getPublicHoildays)();
                if (publicHolidays) {
                    const holidays = countHolidaysBetweenDates(publicHolidays, startDate, endDate);
                    if (holidays > 1) {
                        employee.remainingHolidays += holidays;
                        console.log(`your request falls on ${holidays} holiday, ${holidays} day has been added to your possible vacation days`);
                    }
                    if (totalDaysRequested > employee.remainingHolidays) {
                        console.log('Holiday request exceeds the maximum consecutive days allowed');
                        return false;
                    }
                    else {
                        return true;
                    }
                }
                else {
                    return false;
                }
            }
            else {
                console.log('Date is lower than todays date');
                return false;
            }
        }
        else {
            console.log('Employeer with this ID is not found');
            return false;
        }
    });
}
exports.validateHolidayRequest = validateHolidayRequest;
function countHolidaysBetweenDates(holidays, startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    let count = 0;
    holidays.forEach(holiday => {
        const holidayDate = new Date(holiday.date);
        if (holidayDate >= start && holidayDate <= end) {
            count++;
        }
    });
    return count;
}
