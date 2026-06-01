import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    name, email, phone, company, role,
    project_name, project_type, description,
    platforms, features, timeline,
    service, budget,
    designs, codebase, hear_about, extra,
    message, source,
  } = body;

  if (!name || !email) {
    return NextResponse.json({ error: "Name and email required" }, { status: 400 });
  }

  const { error } = await supabase.from("leads").insert({
    name, email, phone, company, role,
    project_name, project_type, description,
    platforms, features, timeline,
    service, budget,
    designs, codebase, hear_about, extra,
    message,
    source: source ?? "contact_form",
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function GET() {
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function PATCH(req: NextRequest) {
  const { id, status } = await req.json();
  const { error } = await supabase.from("leads").update({ status }).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
