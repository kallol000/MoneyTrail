// import { createClient } from "@/app/utils/supabase/client";
import { createClient } from "@/app/utils/supabase/server";

export async function GET() {
  // const { searchParams } = new URL(req.url);
  // const year = parseInt(searchParams.get("year")!);
  // const month = parseInt(searchParams.get("month")!);

  const supabase = await createClient()

  const { data, error } = await supabase
      .from("user_categories")
      .select( `id, name, order` )
      .order('order', { ascending: true })
    
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

export async function POST(req:Request) {
  // const { searchParams } = new URL(req.url);
  // const year = parseInt(searchParams.get("year")!);
  // const month = parseInt(searchParams.get("month")!);
  const categoriesPayload = await req.json()

  const supabase = await createClient()

  const { data, error } = await supabase
        .from("user_categories")
        .upsert(categoriesPayload)
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

export async function DELETE(req:Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  const supabase = await createClient()

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

