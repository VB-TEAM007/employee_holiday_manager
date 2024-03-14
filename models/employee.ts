export class Employee {
    id: number = 0;
    name: string;
    remainingHolidays: number;

    constructor(
        id: number,
        name: string,
        remainingHolidays: number
    ){
        this.id = id++;
        this.name = name;
        this.remainingHolidays = remainingHolidays;
    }
}