// import { createClient } from "@/app/utils/supabase/client";
import { expenseFormdataRecord } from "@/app/utils/lib/types";
import { createClient } from "@/app/utils/supabase/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");
  const categoryId = parseInt(searchParams.get("categoryId")!);

  const supabase = await createClient()
    
  const { data, error } = await supabase
  .from("expenses")
  .select(`id, amount, description, category_id, date`)
  .eq('date', date)
  .eq('category_id', categoryId)
  
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

export async function POST(req: Request) {
  const supabase = await createClient()
  
  let expensesPayload: expenseFormdataRecord[] = await req.json()

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

export async function DELETE(req: Request) {
  
  const supabase = await createClient()

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  
  const {data, error } = await supabase
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