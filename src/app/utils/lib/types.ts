import { UUID } from "crypto";

export type expenseRow = {
    category_id: number;
    category_name: string;
    total_spent: number;
}

export type timeSeriesExpenseRow = {
    month: string;
    categories: {
        [key: string]: number;
    }
}

export type multiBarChartRow = {
    [key:string]: string | number;
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


export type cardProps = {
    variant: "identity" | "secondary";
    title?: string;
    description?: string;
    children?: React.ReactNode;
    data?: string | number;
}