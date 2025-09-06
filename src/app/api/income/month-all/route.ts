// import { createClient } from "@/app/utils/supabase/client";
import { incomeFormdataRecord } from "@/app/utils/lib/types";
import { createClient } from "@/app/utils/supabase/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const year = parseInt(searchParams.get("year")!);
  const month = parseInt(searchParams.get("month")!);

  // console.log(year, month)

  const supabase =await createClient()
    
  const { data, error } = await supabase.rpc("get_incomes_for_month", { p_year: year, p_month:month });
  
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

  let incomePayload:incomeFormdataRecord[] = await req.json()
  
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

export async function DELETE(req: Request) {

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  
  const supabase = await createClient()

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

