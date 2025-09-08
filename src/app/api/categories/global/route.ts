// import { createClient } from "@/app/utils/supabase/client";
import { createClient } from "@/app/utils/supabase/server";

export async function GET() {
  // const { searchParams } = new URL(req.url);
  // const year = parseInt(searchParams.get("year")!);
  // const month = parseInt(searchParams.get("month")!);

  const supabase = await createClient()

  const { data, error } = await supabase
      .from("global_categories")
      .select( `id, name` )
    
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