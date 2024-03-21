export function dateToLocalDateString(date: Date){
    return date.toLocaleDateString('en-US', {year: 'numeric', day: 'numeric', month: 'short'})
}