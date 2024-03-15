import { HolidayRequest } from "../models/holidayRequest";

export default class HolidayRequests {
    private  holidayRequests: HolidayRequest[] = [];

    addHolidayRequest(holidayRequest: HolidayRequest): void {
        this.holidayRequests.push(holidayRequest);
    }

    getHolidayRequests(): HolidayRequest[] {
        return this.holidayRequests;
    }

    getHolidayById( id: number) {
        return this.holidayRequests.find(holidayRequest => parseInt(holidayRequest.id.toString()) === id);
    }

    deleteHolidayRequests(id: number): HolidayRequest[] {
        return this.holidayRequests.splice(id, 1);
    }
}