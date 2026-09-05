import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

type MarqueeAnnouncement = {
  id: string;
  content: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

// ==================================================
// 新增公告
// ==================================================

async function addAnnouncement(formData: FormData) {
  "use server";

  const supabase = await createClient();

  const content = String(formData.get("content") ?? "").trim();

  if (!content) {
    return;
  }

  const { data: lastAnnouncement } = await supabase
    .from("marquee_announcements")
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle();

  const nextSortOrder =
    (lastAnnouncement?.sort_order ?? 0) + 1;

const { error } = await supabase
  .from("marquee_announcements")
  .insert({
    content,
    is_active: true,
    sort_order: nextSortOrder,
  });

if (error) {
  console.error("新增跑馬燈失敗：", error);
  throw new Error(`新增跑馬燈失敗：${error.message}`);
}

  revalidatePath("/admin/marquee");
}

// ==================================================
// 修改公告
// ==================================================

async function updateAnnouncement(formData: FormData) {
  "use server";

  const supabase = await createClient();

  const id = String(formData.get("id") ?? "");
  const content = String(formData.get("content") ?? "").trim();

  if (!id || !content) {
    return;
  }

  await supabase
    .from("marquee_announcements")
    .update({
      content,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  revalidatePath("/admin/marquee");
}

// ==================================================
// 啟用／停用
// ==================================================

async function toggleAnnouncement(formData: FormData) {
  "use server";

  const supabase = await createClient();

  const id = String(formData.get("id") ?? "");
  const isActive =
    String(formData.get("is_active")) === "true";

  if (!id) {
    return;
  }

  await supabase
    .from("marquee_announcements")
    .update({
      is_active: !isActive,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  revalidatePath("/admin/marquee");
}

// ==================================================
// 儲存跑馬燈速度
// ==================================================

async function updateMarqueeSpeed(formData: FormData) {
  "use server";

  const supabase = await createClient();

  const speed = Number(formData.get("speed_seconds"));

  if (!Number.isInteger(speed) || speed < 5 || speed > 120) {
    return;
  }

  const { error } = await supabase
    .from("marquee_settings")
    .update({
      speed_seconds: speed,
      updated_at: new Date().toISOString(),
    })
    .eq("id", 1);

  if (error) {
    console.error("儲存跑馬燈速度失敗：", error);
    throw new Error(`儲存跑馬燈速度失敗：${error.message}`);
  }

  revalidatePath("/admin/marquee");
}

// ==================================================
// 刪除公告
// ==================================================

async function deleteAnnouncement(formData: FormData) {
  "use server";

  const supabase = await createClient();

  const id = String(formData.get("id") ?? "");

  if (!id) {
    return;
  }

  await supabase
    .from("marquee_announcements")
    .delete()
    .eq("id", id);

  revalidatePath("/admin/marquee");
}

// ==================================================
// 上移公告
// ==================================================

async function moveUpAnnouncement(formData: FormData) {
  "use server";

  const supabase = await createClient();

  const id = String(formData.get("id") ?? "");

  if (!id) {
    return;
  }

  const { data: current } = await supabase
    .from("marquee_announcements")
    .select("id, sort_order")
    .eq("id", id)
    .single();

  if (!current) {
    return;
  }

  const { data: previous } = await supabase
    .from("marquee_announcements")
    .select("id, sort_order")
    .lt("sort_order", current.sort_order)
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!previous) {
    return;
  }

  await supabase
    .from("marquee_announcements")
    .update({
      sort_order: previous.sort_order,
      updated_at: new Date().toISOString(),
    })
    .eq("id", current.id);

  await supabase
    .from("marquee_announcements")
    .update({
      sort_order: current.sort_order,
      updated_at: new Date().toISOString(),
    })
    .eq("id", previous.id);

  revalidatePath("/admin/marquee");
}


// ==================================================
// 下移公告
// ==================================================

async function moveDownAnnouncement(formData: FormData) {
  "use server";

  const supabase = await createClient();

  const id = String(formData.get("id") ?? "");

  if (!id) {
    return;
  }

  const { data: current } = await supabase
    .from("marquee_announcements")
    .select("id, sort_order")
    .eq("id", id)
    .single();

  if (!current) {
    return;
  }

  const { data: next } = await supabase
    .from("marquee_announcements")
    .select("id, sort_order")
    .gt("sort_order", current.sort_order)
    .order("sort_order", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (!next) {
    return;
  }

  await supabase
    .from("marquee_announcements")
    .update({
      sort_order: next.sort_order,
      updated_at: new Date().toISOString(),
    })
    .eq("id", current.id);

  await supabase
    .from("marquee_announcements")
    .update({
      sort_order: current.sort_order,
      updated_at: new Date().toISOString(),
    })
    .eq("id", next.id);

  revalidatePath("/admin/marquee");
}

// ==================================================
// 頁面
// ==================================================

export default async function MarqueeAdminPage() {
  const supabase = await createClient();

  const { data: marqueeSettings } = await supabase
    .from("marquee_settings")
    .select("speed_seconds")
    .eq("id", 1)
    .maybeSingle();

  const speedSeconds =
    marqueeSettings?.speed_seconds ?? 24;

  const { data: announcements, error } = await supabase
    .from("marquee_announcements")
    .select(
      "id, content, is_active, sort_order, created_at, updated_at"
    )
    .order("sort_order", { ascending: true });

  const items: MarqueeAnnouncement[] =
    announcements ?? [];

  return (
    <main className="max-w-5xl mx-auto px-3 md:px-4 py-4 md:py-6">

      {/* ==================================================
          標題
          ================================================== */}

      <div className="mb-5">
        <h1 className="text-3xl md:text-4xl font-bold text-stone-800">
          跑馬燈管理
        </h1>

        <p className="mt-2 text-gray-500">
          管理首頁顯示的跑馬燈公告。
        </p>
      </div>

      {/* ==================================================
          新增公告
          ================================================== */}

      <section className="rounded-xl border bg-white p-4 md:p-6 shadow-sm mb-5">

        <h2 className="text-xl font-bold text-stone-800 mb-4">
          新增跑馬燈公告
        </h2>

        <form action={addAnnouncement} className="space-y-3">

          <textarea
            name="content"
            rows={3}
            placeholder="請輸入跑馬燈公告內容..."
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            required
          />

          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded-lg bg-orange-500 px-5 py-2.5 font-bold text-white hover:bg-orange-600 transition"
            >
              ＋ 新增公告
            </button>
          </div>

        </form>

      </section>

{/* ==================================================
    跑馬燈設定
    ================================================== */}

<section className="rounded-xl border bg-white p-4 md:p-6 shadow-sm mb-5">

  <h2 className="text-xl font-bold text-stone-800">
    跑馬燈設定
  </h2>

  <p className="mt-1 text-sm text-gray-500">
    控制公告從右往左移動的速度。
  </p>

  <form
    action={updateMarqueeSpeed}
    className="mt-4"
  >

    <div className="flex flex-wrap items-end gap-3">

      <div>
        <label
          htmlFor="speed_seconds"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          動畫速度
        </label>

        <div className="flex items-center gap-2">

          <input
            id="speed_seconds"
            name="speed_seconds"
            type="number"
            min="5"
            max="120"
            step="1"
            defaultValue={speedSeconds}
            className="w-28 rounded-lg border border-gray-300 px-4 py-2.5 text-base outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            required
          />

          <span className="text-gray-600">
            秒
          </span>

        </div>
      </div>

      <button
        type="submit"
        className="rounded-lg bg-blue-600 px-5 py-2.5 font-bold text-white hover:bg-blue-700 transition"
      >
        儲存設定
      </button>

    </div>

    <p className="mt-3 text-sm text-gray-400">
      秒數越小，跑馬燈越快；秒數越大，跑馬燈越慢。
      可設定 5～120 秒。
    </p>

  </form>

</section>

      {/* ==================================================
          公告列表
          ================================================== */}

      <section className="rounded-xl border bg-white shadow-sm overflow-hidden">

        <div className="p-4 md:p-5 border-b">
          <h2 className="text-xl font-bold text-stone-800">
            公告列表
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            啟用的公告會在首頁依排序順序輪流播放。
          </p>
        </div>

        {error ? (
          <div className="p-5 text-red-600">
            讀取跑馬燈資料失敗。
          </div>
        ) : items.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            目前還沒有跑馬燈公告。
          </div>
        ) : (
          <div>

            {items.map((item, index) => (
              <div
                key={item.id}
                className="border-b last:border-b-0 p-4 md:p-5"
              >

                {/* 順序 + 狀態 */}

                <div className="flex flex-wrap items-center gap-2 mb-3">

                  <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-bold text-gray-600">
                    #{index + 1}
                  </span>

                  {item.is_active ? (
                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-bold text-green-700">
                      ● 啟用中
                    </span>
                  ) : (
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-bold text-gray-500">
                      ● 已停用
                    </span>
                  )}

                </div>

                {/* 編輯 */}

                <form
                  action={updateAnnouncement}
                  className="space-y-3"
                >

                  <input
                    type="hidden"
                    name="id"
                    value={item.id}
                  />

                  <textarea
                    name="content"
                    defaultValue={item.content}
                    rows={3}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                    required
                  />

                  <div className="flex flex-wrap gap-2">

                    <button
                      type="submit"
                      className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700 transition"
                    >
                      儲存修改
                    </button>

                  </div>

                </form>

                {/* 操作 */}

              <div className="mt-3 flex flex-wrap gap-2">

  {/* 上移 */}

  <form action={moveUpAnnouncement}>
    <input
      type="hidden"
      name="id"
      value={item.id}
    />

    <button
      type="submit"
      disabled={index === 0}
      className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition"
    >
      ↑ 上移
    </button>
  </form>


  {/* 下移 */}

  <form action={moveDownAnnouncement}>
    <input
      type="hidden"
      name="id"
      value={item.id}
    />

    <button
      type="submit"
      disabled={index === items.length - 1}
      className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition"
    >
      ↓ 下移
    </button>
  </form>


  {/* 啟用／停用 */}

  <form action={toggleAnnouncement}>
    
                    <input
                      type="hidden"
                      name="id"
                      value={item.id}
                    />

                    <input
                      type="hidden"
                      name="is_active"
                      value={String(item.is_active)}
                    />

                    <button
                      type="submit"
                      className={`rounded-lg px-4 py-2 text-sm font-bold transition ${
                        item.is_active
                          ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          : "bg-green-100 text-green-700 hover:bg-green-200"
                      }`}
                    >
                      {item.is_active
                        ? "停用公告"
                        : "啟用公告"}
                    </button>
                  </form>

                  <form action={deleteAnnouncement}>
                    <input
                      type="hidden"
                      name="id"
                      value={item.id}
                    />

                    <button
                      type="submit"
                      className="rounded-lg bg-red-50 px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-100 transition"
                    >
                      刪除
                    </button>
                  </form>

                </div>

              </div>
            ))}

          </div>
        )}

      </section>

    </main>
  );
}