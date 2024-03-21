import { ObjectId } from "mongodb";

export default interface Employee {
    name?: string,
    remainingHolidays?: number,
    _id?: ObjectId,
}
