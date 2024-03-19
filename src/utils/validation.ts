import { HolidayRequest } from "../models/holidayRequest";
import Employeers from "../storage/emplioyeers";
import { getPublicHoildays } from "./workWithAPI";

const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

export async function validateHolidayRequest(request: HolidayRequest, Employees: Employeers): Promise<boolean> {  
  const employee = Employees.getEmployeeById(request.employeeId);
  if (employee) {
    const today: Date = new Date();
    const startDate: Date = new Date(request.startDate);
    const endDate: Date = new Date(request.endDate);

    if (startDate > today) {
      const totalDaysRequested = Math.ceil((endDate.getTime() - startDate.getTime()) / MILLISECONDS_PER_DAY);
      const publicHolidays = await getPublicHoildays();
      if (publicHolidays){
      const holidays = countHolidaysBetweenDates(publicHolidays, startDate, endDate);
        if(holidays > 1){
          employee.remainingHolidays += +holidays;
          console.log(`your request falls on ${holidays} holiday, ${holidays} day has been added to your possible vacation days`);
        }
        if (totalDaysRequested > employee.remainingHolidays) {
          console.log('Holiday request exceeds the maximum consecutive days allowed');
          return false;
        } else {
          return true;
        }
      } else {
        return false;
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

function countHolidaysBetweenDates(holidays:{ date: string, name: string, localName: string }[], startDate: Date, endDate: Date) {
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