import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {

  const { data, error } = await supabase
    .from("products")
    .select(
  "id, slug, name, image, price, promotion_enabled, promotion_type, promotion_price, promotion_discount, promotion_start_at, promotion_end_at"
)
    .eq("is_active", true)
    .order("sort_order");

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(data);

}