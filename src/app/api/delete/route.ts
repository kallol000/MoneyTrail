import { createClient } from '../../utils/supabase/client';


// upsert expense(s)
export async function deleteExpense(id:string) {

    const supabase = createClient()


    const { data, error } = await supabase
        .from("expenses")
        .delete()
        .eq("id", id)
    
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