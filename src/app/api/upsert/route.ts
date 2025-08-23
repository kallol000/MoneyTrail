import { createClient } from '../../utils/supabase/client';
import { expenseFormdataRecord } from '@/app/utils/lib/types';


// upsert expense(s)
export async function upsertExpense(expensesPayload : expenseFormdataRecord[]) {

    const supabase = createClient()

    const { data, error } = await supabase
        .from("expenses")
        .upsert(expensesPayload, { onConflict: "id" });
    
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