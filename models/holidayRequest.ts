export class HolidayRequest{
    id: number;
    employeeId: number;
    startDate: Date;
    endDate: Date;
    status: 'pending' | 'approved' | 'rejected';

    constructor(id: number, employeeId: number, startDate: Date, endDate: Date){
        this.id = id;
        this.employeeId = employeeId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = 'pending';
    }
}