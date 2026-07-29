import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );

          response = NextResponse.next({
            request,
          });

          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // 更新 Session 並取得登入資訊
const {
  data: { user },
} = await supabase.auth.getUser();

// 目前請求的路徑
const path = request.nextUrl.pathname;

// 是否為登入頁
const isLoginPage = path === "/admin/login";

// 是否為管理頁
const isAdminPage = path.startsWith("/admin");

// 未登入且進入管理頁（登入頁除外）
if (!user && isAdminPage && !isLoginPage) {
  const url = request.nextUrl.clone();
  url.pathname = "/admin/login";
  return NextResponse.redirect(url);
}

// 已登入又開登入頁
if (user && isLoginPage) {
  const url = request.nextUrl.clone();
  url.pathname = "/admin/products";
  return NextResponse.redirect(url);
}

return response;

}