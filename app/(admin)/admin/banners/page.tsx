"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type BannerType = "main" | "activity" | "benefit";

type Banner = {
  id: number;
  type: BannerType;
  title: string;
  image_url: string;
  mobile_image_url: string | null;
  link_url: string | null;
  is_active: boolean;
  sort_order: number;
  start_at: string | null;
  end_at: string | null;
  created_at: string;
  updated_at: string;
};

type FormData = {
  title: string;
  image_url: string;
  mobile_image_url: string;
  link_url: string;
  is_active: boolean;
  sort_order: string;
  start_at: string;
  end_at: string;
};

const emptyForm: FormData = {
  title: "",
  image_url: "",
  mobile_image_url: "",
  link_url: "",
  is_active: true,
  sort_order: "1",
  start_at: "",
  end_at: "",
};

const typeLabels: Record<BannerType, string> = {
  main: "主 Banner",
  activity: "活動",
  benefit: "福利",
};

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

const supabase = createClient();
export default function BannersPage() {
const [authEmail, setAuthEmail] = useState("");

  const [activeTab, setActiveTab] =
    useState<BannerType>("main");

  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [form, setForm] = useState<FormData>(
    emptyForm
  );

  const [desktopFile, setDesktopFile] =
    useState<File | null>(null);

  const [mobileFile, setMobileFile] =
    useState<File | null>(null);

  const [removeMobileImage, setRemoveMobileImage] =
    useState(false);

  const [desktopPreview, setDesktopPreview] =
    useState("");

  const [mobilePreview, setMobilePreview] =
    useState("");

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] =
    useState("");

  // =========================================================
  // 載入 Banner
  // =========================================================

  async function loadBanners() {
    setLoading(true);
    setErrorMessage("");

    const { data, error } = await supabase
      .from("homepage_banners")
      .select("*")
      .eq("type", activeTab)
      .order("sort_order", {
        ascending: true,
      })
      .order("id", {
        ascending: true,
      });

    if (error) {
      console.error(
        "載入 Banner 失敗:",
        error
      );

      setErrorMessage(
        `載入失敗：${error.message}`
      );

      setBanners([]);
    } else {
      setBanners(
        (data ?? []) as Banner[]
      );
    }

    setLoading(false);
  }

  useEffect(() => {
    loadBanners();
  }, [activeTab]);


  useEffect(() => {
  async function checkAuth() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    console.log(
      "Banner 後台目前登入帳號：",
      user?.id,
      user?.email
    );

    setAuthEmail(
      user?.email ?? ""
    );
  }

  checkAuth();
}, []);
  // =========================================================
  // 清除訊息
  // =========================================================

  function clearMessages() {
    setMessage("");
    setErrorMessage("");
  }

  // =========================================================
  // 開啟新增
  // =========================================================

  function handleAdd() {
    clearMessages();

    setEditingId(null);

    setForm({
      ...emptyForm,
      sort_order:
        String(banners.length + 1),
    });

    setDesktopFile(null);
    setMobileFile(null);

    setDesktopPreview("");
    setMobilePreview("");

    setRemoveMobileImage(false);

    setShowForm(true);
  }

  // =========================================================
  // 開啟編輯
  // =========================================================

  function handleEdit(
    banner: Banner
  ) {
    clearMessages();

    setEditingId(banner.id);

    setForm({
      title: banner.title,
      image_url: banner.image_url,
      mobile_image_url:
        banner.mobile_image_url ?? "",
      link_url: banner.link_url ?? "",
      is_active: banner.is_active,
      sort_order:
        String(banner.sort_order ?? 1),
      start_at: banner.start_at
        ? formatDateTimeLocal(
            banner.start_at
          )
        : "",
      end_at: banner.end_at
        ? formatDateTimeLocal(
            banner.end_at
          )
        : "",
    });

    setDesktopFile(null);
    setMobileFile(null);

    setDesktopPreview(
      banner.image_url
    );

    setMobilePreview(
      banner.mobile_image_url ?? ""
    );

    setRemoveMobileImage(false);

    setShowForm(true);
  }

  // =========================================================
  // 日期格式
  // =========================================================

  function formatDateTimeLocal(
    value: string
  ) {
    const date = new Date(value);

    if (
      Number.isNaN(
        date.getTime()
      )
    ) {
      return "";
    }

    const year =
      date.getFullYear();

    const month = String(
      date.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      date.getDate()
    ).padStart(2, "0");

    const hours = String(
      date.getHours()
    ).padStart(2, "0");

    const minutes = String(
      date.getMinutes()
    ).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  function convertToISO(
    value: string
  ) {
    if (!value) {
      return null;
    }

    const date = new Date(value);

    if (
      Number.isNaN(
        date.getTime()
      )
    ) {
      return null;
    }

    return date.toISOString();
  }

  // =========================================================
  // 驗證圖片
  // =========================================================

  function validateImage(
    file: File
  ) {
    if (
      !ALLOWED_TYPES.includes(
        file.type
      )
    ) {
      return "只允許 JPG、PNG、WEBP、GIF 圖片。";
    }

    if (
      file.size >
      MAX_FILE_SIZE
    ) {
      return "圖片大小不能超過 10MB。";
    }

    return null;
  }

  // =========================================================
  // 圖片選擇
  // =========================================================

  function handleDesktopFileChange(
    file: File | null
  ) {
    clearMessages();

    if (!file) {
      return;
    }

    const error =
      validateImage(file);

    if (error) {
      setErrorMessage(error);
      return;
    }

    setDesktopFile(file);

    const previewUrl =
      URL.createObjectURL(file);

    setDesktopPreview(
      previewUrl
    );
  }

  function handleMobileFileChange(
    file: File | null
  ) {
    clearMessages();

    if (!file) {
      return;
    }

    const error =
      validateImage(file);

    if (error) {
      setErrorMessage(error);
      return;
    }

    setMobileFile(file);

    setRemoveMobileImage(false);

    const previewUrl =
      URL.createObjectURL(file);

    setMobilePreview(
      previewUrl
    );
  }

  // =========================================================
  // 上傳圖片
  // =========================================================

  async function uploadImage(
    file: File,
    type: BannerType,
    suffix = ""
  ) {
    const extension =
      file.name
        .split(".")
        .pop()
        ?.toLowerCase() ||
      "jpg";

    const fileName =
      `${Date.now()}-${crypto.randomUUID()}${suffix}.${extension}`;

    const filePath =
      `${type}/${fileName}`;

    const { error } =
      await supabase.storage
        .from(
          "homepage-banners"
        )
        .upload(
          filePath,
          file,
          {
            cacheControl:
              "31536000",
            upsert: false,
            contentType:
              file.type,
          }
        );

    if (error) {
      throw new Error(
        `圖片上傳失敗：${error.message}`
      );
    }

    const {
      data: publicUrlData,
    } =
      supabase.storage
        .from(
          "homepage-banners"
        )
        .getPublicUrl(
          filePath
        );

    return {
      path: filePath,
      url: publicUrlData.publicUrl,
    };
  }

  // =========================================================
  // 從 URL 找出 Storage path
  // =========================================================

  function getStoragePath(
    url: string | null
  ) {
    if (!url) {
      return null;
    }

    const marker =
      "/storage/v1/object/public/homepage-banners/";

    const index =
      url.indexOf(marker);

    if (index === -1) {
      return null;
    }

    return decodeURIComponent(
      url.substring(
        index + marker.length
      )
    );
  }

  // =========================================================
  // 刪除 Storage 圖片
  // =========================================================

  async function deleteStorageImage(
    url: string | null
  ) {
    const path =
      getStoragePath(url);

    if (!path) {
      return;
    }

    const { error } =
      await supabase.storage
        .from(
          "homepage-banners"
        )
        .remove([path]);

    if (error) {
      console.error(
        "刪除 Storage 圖片失敗:",
        error
      );
    }
  }

  // =========================================================
  // 儲存 Banner
  // =========================================================

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    clearMessages();

    if (!form.title.trim()) {
      setErrorMessage(
        "請輸入 Banner 名稱。"
      );
      return;
    }

    if (
      !editingId &&
      !desktopFile
    ) {
      setErrorMessage(
        "請選擇桌機 Banner 圖片。"
      );
      return;
    }

    if (
      form.start_at &&
      form.end_at
    ) {
      const start =
        new Date(
          form.start_at
        );

      const end =
        new Date(
          form.end_at
        );

      if (end < start) {
        setErrorMessage(
          "結束日期不能早於開始日期。"
        );
        return;
      }
    }

    const sortOrder =
      Number(
        form.sort_order
      );

    if (
      !Number.isFinite(
        sortOrder
      )
    ) {
      setErrorMessage(
        "排序必須是數字。"
      );
      return;
    }

    setSaving(true);

    let uploadedDesktop:
      | {
          path: string;
          url: string;
        }
      | null = null;

    let uploadedMobile:
      | {
          path: string;
          url: string;
        }
      | null = null;

    try {
      // -----------------------------------------------------
      // 取得舊資料
      // -----------------------------------------------------

      let oldBanner:
        | Banner
        | null = null;

      if (editingId) {
        const { data, error } =
          await supabase
            .from(
              "homepage_banners"
            )
            .select("*")
            .eq(
              "id",
              editingId
            )
            .single();

        if (error) {
          throw new Error(
            `讀取原 Banner 失敗：${error.message}`
          );
        }

        oldBanner =
          data as Banner;
      }

      // -----------------------------------------------------
      // 上傳桌機圖片
      // -----------------------------------------------------

      if (desktopFile) {
        uploadedDesktop =
          await uploadImage(
            desktopFile,
            activeTab,
            "-desktop"
          );
      }

      // -----------------------------------------------------
      // 上傳手機圖片
      // -----------------------------------------------------

      if (mobileFile) {
        uploadedMobile =
          await uploadImage(
            mobileFile,
            activeTab,
            "-mobile"
          );
      }

      // -----------------------------------------------------
      // 決定桌機圖片 URL
      // -----------------------------------------------------

      const desktopImageUrl =
        uploadedDesktop?.url ??
        form.image_url;

      // -----------------------------------------------------
      // 決定手機圖片 URL
      // -----------------------------------------------------

      let mobileImageUrl:
        | string
        | null =
        form.mobile_image_url.trim() ||
        null;

      if (uploadedMobile) {
        mobileImageUrl =
          uploadedMobile.url;
      }

      if (
        removeMobileImage &&
        !uploadedMobile
      ) {
        mobileImageUrl = null;
      }

      // -----------------------------------------------------
      // 寫入資料庫
      // -----------------------------------------------------

      const payload = {
        type: activeTab,
        title:
          form.title.trim(),
        image_url:
          desktopImageUrl,
        mobile_image_url:
          mobileImageUrl,
        link_url:
          form.link_url.trim() ||
          null,
        is_active:
          form.is_active,
        sort_order:
          sortOrder,
        start_at:
          convertToISO(
            form.start_at
          ),
        end_at:
          convertToISO(
            form.end_at
          ),
      };

      let error;

      if (editingId) {
        const result =
          await supabase
            .from(
              "homepage_banners"
            )
            .update(payload)
            .eq(
              "id",
              editingId
            );

        error =
          result.error;
      } else {
        const result =
          await supabase
            .from(
              "homepage_banners"
            )
            .insert(payload);

        error =
          result.error;
      }

      if (error) {
        throw new Error(
          `資料儲存失敗：${error.message}`
        );
      }

      // -----------------------------------------------------
      // 資料庫成功後，刪除舊圖片
      // -----------------------------------------------------

      if (
        oldBanner &&
        uploadedDesktop &&
        oldBanner.image_url
      ) {
        await deleteStorageImage(
          oldBanner.image_url
        );
      }

      if (
        oldBanner &&
        (
          uploadedMobile ||
          removeMobileImage
        ) &&
        oldBanner.mobile_image_url
      ) {
        await deleteStorageImage(
          oldBanner.mobile_image_url
        );
      }

      setMessage(
        editingId
          ? "Banner 已成功更新。"
          : "Banner 已成功新增。"
      );

      setShowForm(false);
      setEditingId(null);

      setForm(
        emptyForm
      );

      setDesktopFile(
        null
      );

      setMobileFile(
        null
      );

      setDesktopPreview(
        ""
      );

      setMobilePreview(
        ""
      );

      setRemoveMobileImage(
        false
      );

      await loadBanners();
    } catch (error) {
      console.error(
        "儲存 Banner 失敗:",
        error
      );

      // 如果資料庫失敗，
      // 把這次剛上傳的圖片刪掉
      if (uploadedDesktop) {
        await deleteStorageImage(
          uploadedDesktop.url
        );
      }

      if (uploadedMobile) {
        await deleteStorageImage(
          uploadedMobile.url
        );
      }

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "儲存 Banner 失敗。"
      );
    } finally {
      setSaving(false);
    }
  }

  // =========================================================
  // 啟用／停用
  // =========================================================

  async function toggleActive(
    banner: Banner
  ) {
    clearMessages();

    const { error } =
      await supabase
        .from(
          "homepage_banners"
        )
        .update({
          is_active:
            !banner.is_active,
        })
        .eq(
          "id",
          banner.id
        );

    if (error) {
      console.error(
        "更新啟用狀態失敗:",
        error
      );

      setErrorMessage(
        `更新失敗：${error.message}`
      );

      return;
    }

    setMessage(
      banner.is_active
        ? "Banner 已停用。"
        : "Banner 已啟用。"
    );

    await loadBanners();
  }

  // =========================================================
  // 刪除 Banner
  // =========================================================

  async function handleDelete(
    banner: Banner
  ) {
    clearMessages();

    const confirmed =
      window.confirm(
        `確定要刪除「${banner.title}」嗎？\n\n圖片檔案也會一起刪除，刪除後無法復原。`
      );

    if (!confirmed) {
      return;
    }

    const { error } =
      await supabase
        .from(
          "homepage_banners"
        )
        .delete()
        .eq(
          "id",
          banner.id
        );

    if (error) {
      console.error(
        "刪除 Banner 失敗:",
        error
      );

      setErrorMessage(
        `刪除失敗：${error.message}`
      );

      return;
    }

    // 資料庫刪除成功後，
    // 一起刪除 Storage 圖片
    await deleteStorageImage(
      banner.image_url
    );

    await deleteStorageImage(
      banner.mobile_image_url
    );

    setMessage(
      "Banner 與圖片已刪除。"
    );

    await loadBanners();
  }

  // =========================================================
  // 活動日期狀態
  // =========================================================

  function getDateStatus(
    banner: Banner
  ) {
    const now =
      new Date();

    if (banner.start_at) {
      const start =
        new Date(
          banner.start_at
        );

      if (now < start) {
        return {
          text: "尚未開始",
          className:
            "bg-yellow-100 text-yellow-700",
        };
      }
    }

    if (banner.end_at) {
      const end =
        new Date(
          banner.end_at
        );

      if (now > end) {
        return {
          text: "已結束",
          className:
            "bg-gray-100 text-gray-500",
        };
      }
    }

    return {
      text: "目前有效",
      className:
        "bg-green-100 text-green-700",
    };
  }

  // =========================================================
  // 日期顯示
  // =========================================================

  function formatDate(
    value: string | null
  ) {
    if (!value) {
      return "不限日期";
    }

    const date =
      new Date(value);

    if (
      Number.isNaN(
        date.getTime()
      )
    ) {
      return "-";
    }

    return date.toLocaleString(
      "zh-TW",
      {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }
    );
  }

  // =========================================================
  // 更新表單
  // =========================================================

  function updateForm<
    K extends keyof FormData
  >(
    key: K,
    value: FormData[K]
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  // =========================================================
  // JSX
  // =========================================================

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">

      {/* 標題 */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            首頁 Banner 管理
          </h1>
{authEmail && (
  <div className="text-xs text-gray-400">
    目前登入：{authEmail}
  </div>
)}
          <p className="text-sm text-gray-500 mt-1">
            管理首頁主 Banner、活動與會員福利圖片
          </p>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-lg font-medium transition"
        >
          ＋ 新增 Banner
        </button>

      </div>

      {/* 訊息 */}
      {message && (
        <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-3">
          {message}
        </div>
      )}

      {errorMessage && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3">
          {errorMessage}
        </div>
      )}

      {/* 分頁 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2 flex flex-wrap gap-2">

        {(
          [
            ["main", "主 Banner"],
            ["activity", "活動"],
            ["benefit", "福利"],
          ] as [BannerType, string][]
        ).map(
          ([type, label]) => (
            <button
              key={type}
              type="button"
              onClick={() => {
                clearMessages();
                setShowForm(false);
                setActiveTab(type);
              }}
              className={`px-5 py-2.5 rounded-lg font-medium transition ${
                activeTab === type
                  ? "bg-purple-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {label}
            </button>
          )
        )}

      </div>

      {/* =====================================================
          新增／編輯
      ===================================================== */}

      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 md:p-6">

          <div className="flex items-center justify-between mb-5">

            <div>
              <h2 className="text-lg font-bold text-gray-800">
                {editingId
                  ? "編輯 Banner"
                  : "新增 Banner"}
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                類型：{typeLabels[activeTab]}
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
              }}
              className="text-gray-500 hover:text-gray-700 text-xl"
            >
              ✕
            </button>

          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* Banner 名稱 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Banner 名稱
              </label>

              <input
                type="text"
                value={form.title}
                onChange={(e) =>
                  updateForm(
                    "title",
                    e.target.value
                  )
                }
                placeholder="例如：雙十國慶優惠"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* =================================================
                桌機圖片
            ================================================= */}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                桌機 Banner 圖片
              </label>

              <label className="flex flex-col items-center justify-center w-full min-h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-purple-50 hover:border-purple-400 transition">

                <div className="text-center p-6">

                  <div className="text-4xl mb-2">
                    🖼️
                  </div>

                  <p className="font-medium text-gray-700">
                    點擊選擇圖片
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    JPG、PNG、WEBP、GIF，最大 10MB
                  </p>

                  {desktopFile && (
                    <p className="text-sm text-purple-600 mt-2">
                      已選擇：
                      {desktopFile.name}
                    </p>
                  )}

                </div>

                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  className="hidden"
                  onChange={(e) =>
                    handleDesktopFileChange(
                      e.target.files?.[0] ??
                        null
                    )
                  }
                />

              </label>

              {/* 預覽 */}
              {desktopPreview && (
                <div className="mt-3">

                  <p className="text-xs text-gray-500 mb-2">
                    圖片預覽
                  </p>

                  <div className="border border-gray-200 rounded-xl overflow-hidden bg-gray-50">
                    <img
                      src={
                        desktopPreview
                      }
                      alt="桌機 Banner 預覽"
                      className="w-full max-h-80 object-contain"
                    />
                  </div>

                </div>
              )}

            </div>

            {/* =================================================
                手機圖片
            ================================================= */}

            {activeTab === "main" && (
              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  手機版 Banner 圖片
                  <span className="text-gray-400 font-normal ml-2">
                    （可不設定）
                  </span>
                </label>

                <label className="flex flex-col items-center justify-center w-full min-h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-purple-50 hover:border-purple-400 transition">

                  <div className="text-center p-6">

                    <div className="text-4xl mb-2">
                      📱
                    </div>

                    <p className="font-medium text-gray-700">
                      點擊選擇手機版圖片
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      如果沒有設定，手機會使用桌機圖片
                    </p>

                    {mobileFile && (
                      <p className="text-sm text-purple-600 mt-2">
                        已選擇：
                        {mobileFile.name}
                      </p>
                    )}

                  </div>

                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    className="hidden"
                    onChange={(e) =>
                      handleMobileFileChange(
                        e.target.files?.[0] ??
                          null
                      )
                    }
                  />

                </label>

                {/* 手機預覽 */}
                {mobilePreview && (
                  <div className="mt-3">

                    <p className="text-xs text-gray-500 mb-2">
                      手機圖片預覽
                    </p>

                    <div className="border border-gray-200 rounded-xl overflow-hidden bg-gray-50 max-w-md">
                      <img
                        src={
                          mobilePreview
                        }
                        alt="手機 Banner 預覽"
                        className="w-full max-h-80 object-contain"
                      />
                    </div>

                  </div>
                )}

                {/* 移除手機圖片 */}
                {editingId &&
                  form.mobile_image_url && (
                    <label className="flex items-center gap-2 mt-3 text-sm text-gray-600">

                      <input
                        type="checkbox"
                        checked={
                          removeMobileImage
                        }
                        onChange={(e) =>
                          setRemoveMobileImage(
                            e.target.checked
                          )
                        }
                        className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />

                      移除目前手機版圖片

                    </label>
                  )}

              </div>
            )}

            {/* =================================================
                連結
            ================================================= */}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                點擊連結
                <span className="text-gray-400 font-normal ml-2">
                  （可不填）
                </span>
              </label>

              <input
                type="text"
                value={form.link_url}
                onChange={(e) =>
                  updateForm(
                    "link_url",
                    e.target.value
                  )
                }
                placeholder="/products"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />

              <p className="text-xs text-gray-500 mt-1">
                例如：/products、/account/points/rules
              </p>
            </div>

            {/* =================================================
                排序
            ================================================= */}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                排序
              </label>

              <input
                type="number"
                min="0"
                value={form.sort_order}
                onChange={(e) =>
                  updateForm(
                    "sort_order",
                    e.target.value
                  )
                }
                className="w-full md:w-40 border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />

              <p className="text-xs text-gray-500 mt-1">
                數字越小越優先，例如 1、2、3。
              </p>
            </div>

            {/* =================================================
                活動日期
            ================================================= */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-3">
                活動日期
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    開始時間
                  </label>

                  <input
                    type="datetime-local"
                    value={
                      form.start_at
                    }
                    onChange={(e) =>
                      updateForm(
                        "start_at",
                        e.target.value
                      )
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    結束時間
                  </label>

                  <input
                    type="datetime-local"
                    value={
                      form.end_at
                    }
                    onChange={(e) =>
                      updateForm(
                        "end_at",
                        e.target.value
                      )
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

              </div>

              <p className="text-xs text-gray-500 mt-2">
                不填日期代表長期有效。
              </p>

            </div>

            {/* =================================================
                啟用
            ================================================= */}

            <div className="flex items-center gap-3">

              <input
                id="banner-active"
                type="checkbox"
                checked={
                  form.is_active
                }
                onChange={(e) =>
                  updateForm(
                    "is_active",
                    e.target.checked
                  )
                }
                className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />

              <label
                htmlFor="banner-active"
                className="text-sm font-medium text-gray-700"
              >
                啟用此 Banner
              </label>

            </div>

            {/* =================================================
                儲存按鈕
            ================================================= */}

            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">

              <button
                type="submit"
                disabled={saving}
                className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white px-6 py-2.5 rounded-lg font-medium transition"
              >
                {saving
                  ? "圖片上傳及儲存中..."
                  : editingId
                  ? "儲存修改"
                  : "上傳並新增 Banner"}
              </button>

              <button
                type="button"
                disabled={saving}
                onClick={() => {
                  setShowForm(
                    false
                  );
                  setEditingId(
                    null
                  );
                }}
                className="bg-gray-100 hover:bg-gray-200 disabled:opacity-50 text-gray-700 px-6 py-2.5 rounded-lg font-medium transition"
              >
                取消
              </button>

            </div>

          </form>
        </div>
      )}

      {/* =====================================================
          Banner 列表
      ===================================================== */}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

        <div className="px-5 py-4 border-b border-gray-200">

          <h2 className="font-bold text-gray-800">
            {typeLabels[activeTab]}
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            共 {banners.length} 個 Banner
          </p>

        </div>

        {loading ? (
          <div className="py-16 text-center text-gray-500">
            載入中...
          </div>
        ) : banners.length ===
          0 ? (
          <div className="py-16 text-center">

            <div className="text-5xl mb-4">
              🖼️
            </div>

            <p className="text-gray-500 mb-4">
              目前還沒有
              {typeLabels[activeTab]}
            </p>

            <button
              type="button"
              onClick={handleAdd}
              className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-lg font-medium transition"
            >
              ＋ 新增第一個 Banner
            </button>

          </div>
        ) : (
          <div className="divide-y divide-gray-200">

            {banners.map(
              (banner) => {
                const dateStatus =
                  getDateStatus(
                    banner
                  );

                return (
                  <div
                    key={
                      banner.id
                    }
                    className="p-5 hover:bg-gray-50 transition"
                  >

                    <div className="flex flex-col lg:flex-row gap-5">

                      {/* 圖片 */}
                      <div className="w-full lg:w-72 shrink-0">

                        <div className="relative rounded-xl overflow-hidden border border-gray-200 bg-gray-100">

                          <img
                            src={
                              banner.image_url
                            }
                            alt={
                              banner.title
                            }
                            className="w-full h-40 object-cover"
                          />

                          {!banner.is_active && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">

                              <span className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm">
                                已停用
                              </span>

                            </div>
                          )}

                        </div>

                        {banner.mobile_image_url && (
                          <div className="mt-2 text-xs text-gray-500">
                            📱 已設定手機版圖片
                          </div>
                        )}

                      </div>

                      {/* 資訊 */}
                      <div className="flex-1 min-w-0">

                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">

                          <div>

                            <h3 className="text-lg font-bold text-gray-800">
                              {
                                banner.title
                              }
                            </h3>

                            <div className="flex flex-wrap items-center gap-2 mt-2">

                              <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                                {
                                  typeLabels[
                                    banner.type
                                  ]
                                }
                              </span>

                              <span
                                className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                                  banner.is_active
                                    ? "bg-green-100 text-green-700"
                                    : "bg-gray-100 text-gray-500"
                                }`}
                              >
                                {banner.is_active
                                  ? "啟用中"
                                  : "已停用"}
                              </span>

                              <span
                                className={`px-2.5 py-1 rounded-full text-xs font-medium ${dateStatus.className}`}
                              >
                                {
                                  dateStatus.text
                                }
                              </span>

                            </div>

                          </div>

                          <div className="text-sm text-gray-500 shrink-0">
                            排序：
                            <span className="font-bold text-gray-800 ml-1">
                              {
                                banner.sort_order
                              }
                            </span>
                          </div>

                        </div>

                        {/* 日期 */}
                        <div className="mt-4 text-sm text-gray-600 space-y-1">

                          <div>
                            📅 開始：
                            <span className="ml-1">
                              {formatDate(
                                banner.start_at
                              )}
                            </span>
                          </div>

                          <div>
                            📅 結束：
                            <span className="ml-1">
                              {formatDate(
                                banner.end_at
                              )}
                            </span>
                          </div>

                        </div>

                        {/* 連結 */}
                        {banner.link_url && (
                          <div className="mt-3 text-sm">

                            🔗 連結：
                            <span className="ml-1 text-purple-600 break-all">
                              {
                                banner.link_url
                              }
                            </span>

                          </div>
                        )}

                        {/* 操作 */}
                        <div className="flex flex-wrap gap-2 mt-5">

                          <button
                            type="button"
                            onClick={() =>
                              toggleActive(
                                banner
                              )
                            }
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                              banner.is_active
                                ? "bg-gray-100 hover:bg-gray-200 text-gray-700"
                                : "bg-green-100 hover:bg-green-200 text-green-700"
                            }`}
                          >
                            {banner.is_active
                              ? "停用"
                              : "啟用"}
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleEdit(
                                banner
                              )
                            }
                            className="px-4 py-2 rounded-lg text-sm font-medium bg-blue-100 hover:bg-blue-200 text-blue-700 transition"
                          >
                            編輯
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(
                                banner
                              )
                            }
                            className="px-4 py-2 rounded-lg text-sm font-medium bg-red-100 hover:bg-red-200 text-red-700 transition"
                          >
                            刪除
                          </button>

                        </div>

                      </div>

                    </div>

                  </div>
                );
              }
            )}

          </div>
        )}

      </div>

    </div>
  );
}