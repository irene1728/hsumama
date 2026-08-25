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

  // 如果沒有登入，且進入管理頁（登入頁除外）
  if (!user && isAdminPage && !isLoginPage) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }

  // 如果已登入，檢查是否為管理員
  if (user && isAdminPage) {
    const { data: adminUser, error } = await supabase
      .from("admin_users")
      .select("user_id")
      .eq("user_id", user.id)
      .maybeSingle();

    // 查詢發生錯誤，或使用者不是管理員
    if (error || !adminUser) {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }

    // 管理員已登入，又進入登入頁
    if (isLoginPage) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/products";
      return NextResponse.redirect(url);
    }
  }

  return response;
}