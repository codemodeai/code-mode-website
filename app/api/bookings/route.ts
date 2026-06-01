import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, phone, company, service, message, date, time_slot } = body;

  if (!name || !email || !date || !time_slot) {
    return NextResponse.json({ error: "Name, email, date and time slot required" }, { status: 400 });
  }

  // Check slot isn't already taken
  const { data: existing } = await supabase
    .from("bookings")
    .select("id")
    .eq("date", date)
    .eq("time_slot", time_slot)
    .eq("status", "confirmed")
    .maybeSingle();

  if (existing) {
    return NextResponse.json({ error: "This slot is already booked" }, { status: 409 });
  }

  const { error } = await supabase.from("bookings").insert({
    name, email, phone, company, service, message, date, time_slot,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");

  let query = supabase.from("bookings").select("*").order("date").order("time_slot");
  if (date) query = query.eq("date", date);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function PATCH(req: NextRequest) {
  const { id, status } = await req.json();
  const { error } = await supabase.from("bookings").update({ status }).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
