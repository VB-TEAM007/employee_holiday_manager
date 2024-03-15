"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.f = exports.validateHolidayRequest = void 0;
// import workWithApi from "./workWithAPI"
const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
function validateHolidayRequest(request, Employees) {
    console.log(request);
    const employee = Employees.getEmployeeById(request.employeeId);
    if (employee) {
        const today = new Date();
        const startDate = new Date(request.startDate);
        const endDate = new Date(request.endDate);
        if (startDate > today) {
            const totalDaysRequested = Math.ceil((endDate.getTime() - startDate.getTime()) / MILLISECONDS_PER_DAY);
            if (totalDaysRequested < employee.remainingHolidays) {
                // workWithApi.main(startDate, endDate);
                console.log('Holiday request exceeds the maximum consecutive days allowed');
                return false;
            }
            else {
                return true;
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
}
exports.validateHolidayRequest = validateHolidayRequest;
function f(startDate, endDate) {
    // if (validateHolidayRequest) {
    //   workWithApi.main()
    // } 
}
exports.f = f;
