import { NextRequest, NextResponse } from "next/server";

const ADMIN_COOKIE = "cm_admin_session";

export async function POST(req: NextRequest) {
  const { password } = await req.json();

  const correct = process.env.ADMIN_PASSWORD ?? "codemode@admin2024";
  const secret = process.env.ADMIN_COOKIE_SECRET ?? "codemode_super_secret_key_2024";

  if (password !== correct) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, secret, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 24 hours
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete("cm_admin_session");
  return res;
}
