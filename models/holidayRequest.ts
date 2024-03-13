export class HolidayRequest{
    employeeId: number;
    startDate: Date;
    endDate: Date;
    status: 'pending' | 'approved' | 'rejected';

    constructor(employeeId: number, startDate: Date, endDate: Date){
        this.employeeId = employeeId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = 'pending';
    }
}