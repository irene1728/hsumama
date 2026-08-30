import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { createClient } from "@/lib/supabase/server";

export default async function AdminHeader() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="border-b bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex h-12 md:h-12 items-center justify-between px-6">

        <div>
          <Link
            href="https://hsumama.bestlife.tw"
            className="text-3xl font-bold text-gray-900 hover:text-orange-600 transition-colors"
          >
            徐媽媽冰鑽滷味
          </Link>
        </div>

        {user ? (
          <LogoutButton />
        ) : (
          <Link
            href="/admin/login"
            className="rounded-lg bg-orange-500 text-xl px-2 py-2 text-white hover:bg-orange-600"
          >
            登 入
          </Link>
        )}

      </div>
    </header>
  );
}