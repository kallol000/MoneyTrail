import { monthIndex } from "./types";

export const months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]

export const monthsinNumber: monthIndex = {
    January: 1, February: 2, March: 3, April: 4, May: 5, June: 6, July: 7, August: 8, September: 9, October: 10, November: 11, December: 12
}

export function daysInMonth(month:number, year:number) {
    const daysInMonths = [31, (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) 
    ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return daysInMonths[month - 1];
}

export function comparator( a: string, b: string ) {
    if ( a === "date" || b === "date" ) {
        return -1
    }
    return 1
}