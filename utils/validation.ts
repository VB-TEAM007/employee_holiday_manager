import { HolidayRequest } from "../models/holidayRequest";
import Employeers from "../storage/emplioyeers";
import HolidayRequests from "../storage/holidayRequests";

export function validateHolidayRequest(request: HolidayRequest, Employees: Employeers): boolean {
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  const employees = Employees.getEmployees();
  console.log(request);

  const employee = Employees.getEmployeeById(request.employeeId);
  console.log(employee);

  if (employee) {
    const today: Date = new Date();
    const startDate: Date = new Date(request.startDate);
    const endDate: Date = new Date(request.endDate)
    console.log(today);
    console.log(startDate);
    
    if (startDate > today) {
      const totalDaysRequested = Math.ceil((endDate.getTime() - startDate.getTime()) / MILLISECONDS_PER_DAY);
      if (totalDaysRequested > employee.remainingHolidays) {
        console.log('Holiday request exceeds the maximum consecutive days allowed');
        return false;
      } else {
        return true;
      }
    } else {
      console.log('Date is lower than todays date');
      return false;
    }
  } else {
    console.log('Employeer with this ID is not found');
    return false;
  }
}
