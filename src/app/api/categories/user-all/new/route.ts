// import { createClient } from "@/app/utils/supabase/client";
import { insertCategoryRow } from "@/app/utils/lib/types";
import { createClient } from "@/app/utils/supabase/server";

export async function POST(req:Request) {
  // const { searchParams } = new URL(req.url);
  // const year = parseInt(searchParams.get("year")!);
  // const month = parseInt(searchParams.get("month")!);
  const categoriesPayload:insertCategoryRow[] = await req.json()

  const supabase = await createClient()

  const { data, error } = await supabase
      .from("user_categories")
      .insert(categoriesPayload)
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