// import { createClient } from "@/app/utils/supabase/client";
import { createClient } from "@/app/utils/supabase/server";
import { insertCategoryRow } from "@/app/utils/lib/types";

export async function GET() {

  const supabase = await createClient()

  const { data, error } = await supabase
    .from("user_details")
    .select(`name`)
    
    console.log(data)

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

export async function POST(req:Request) {

  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");
  
  const categoriesPayload:insertCategoryRow[] = await req.json()

  const supabase = await createClient()

  const { data, error } = await supabase.rpc("save_new_user_details", {p_name: username, p_categories:categoriesPayload} )

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