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

export type expenseFormdataRecord = {
    id: string;
    amount: number;
    description: string;
    category_id?: number;
    date?: string;
}

export type incomeFormdataRecord = {
    id: string;
    amount: number;
    description: string;
    date: string;
}

export type tab = {
    [key:string]: string
}

export type userCategoriesRecord = {
    id: number;
    name: string;
    order: number;
}

export type insertCategoryRow = {
    name: string;
}