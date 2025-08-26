import { createClient } from '../../utils/supabase/client';
import { expenseFormdataRecord, incomeFormdataRecord } from '@/app/utils/lib/types';



// upsert expense(s)
export async function upsertExpense(expensesPayload : expenseFormdataRecord[]) {

    const supabase = createClient()

    expensesPayload = expensesPayload.filter(expense => expense.amount !== 0)

    const { data, error } = await supabase
        .from("expenses")
        .upsert(expensesPayload, { onConflict: "id" })
        .select()
    
    if(error) {
      return new Response(JSON.stringify({message:error.message}), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
}

// upsert income(s)
export async function upsertIncome(incomePayload : incomeFormdataRecord[]) {

    const supabase = createClient()

    incomePayload = incomePayload.filter(income => income.amount !== 0)

    const { data, error } = await supabase
        .from("income")
        .upsert(incomePayload, { onConflict: "id" })
        .select()
    
    if(error) {
      return new Response(JSON.stringify({message:error.message}), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
}