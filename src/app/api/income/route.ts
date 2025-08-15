import { createClient } from '../../utils/supabase/server';

export async function getIncome() {

    const supabase = await createClient()

    const { data, error } = await supabase
      .from("income")
      .select()
    
    if(error) {
      return new Response(JSON.stringify(error), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
}