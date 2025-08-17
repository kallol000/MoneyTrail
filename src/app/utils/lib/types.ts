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