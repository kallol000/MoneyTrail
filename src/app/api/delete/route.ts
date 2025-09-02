import { createClient } from '../../utils/supabase/client';


// delete expense(s)
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
// delete income(s)
export async function deleteIncome(id:string) {

    const supabase = createClient()


    const { data, error } = await supabase
        .from("income")
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


export async function deleteUserCategory(id:string) {

    const supabase = createClient()

    const { data, error } = await supabase 
        .from("user_categories")
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