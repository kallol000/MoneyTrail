import { UUID } from "crypto";

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

export type fetchedExpenseRecord = {
    id: UUID;
    amount: number;
    description: string;
}

export type expenseFormdataRecord = {
    id?: UUID;
    amount: number;
    description: string;
    category_id?: number;
    date?: string;
}

export type unsavedExpenseRecord = {
    amount: number;
    description: string;
    category_id: number;
    date: string;
}


export type tab = {
    [key:string]: string
}

export type userCategoriesRecord = {
    id: number;
    name: string;
}