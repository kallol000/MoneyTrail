export type expenseRow = {
    month: string;
    category: string;
    total_spent: string;
}

export type singleBarChartRow = {
    month: string;
    [key:string]: string;
}

export type tabLinkRow = {
    name: string;
    link: string;
}

export type monthYear = {
    month: string;
    year: string;
}

export type monthIndex = {
    [key: string] : number
}

export type expenseRecord = {
    date: string;
    [ key: string ]: string | number;
}

export type insertExpenseRecord = {
    [key:number] : {    
        date: string;
        category: string;
        amount: number;
    }
}