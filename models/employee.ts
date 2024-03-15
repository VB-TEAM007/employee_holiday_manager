export class Employee {
    id: number;
    name: string;
    remainingHolidays: number;

    constructor(
        id: number,
        name: string,
        remainingHolidays: number
    ){
        this.id = id;
        this.name = name;
        this.remainingHolidays = remainingHolidays;
    }
}
