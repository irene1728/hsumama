# CHANGELOG

所有重要更新都會記錄在這裡。

---

## v0.6.0（2026-07-29）

### 🎉 新增

- 管理員登入
- 商品管理（CRUD）
- 訂單管理
- 管理員登出
- Git 導入
- GitHub Repository
- GitHub Push
- Vercel 同步

## v0.6.1 (2026-07-29)

### 新增

- 建立 WORKFLOW.md
- 建立專案開發 SOP
- 完善 docs 文件架構

## v0.7.0（Route Groups 前台重構完成）

### 🚀 調整
- 建立 Next.js Route Groups
- 首頁搬移至 (shop)
- 商品列表搬移至 (shop)
- 商品詳細頁搬移至 (shop)
- 修正 Product Detail AddToCartButton import
- 購物車搬移至 (shop)
- Checkout 搬移至 (shop)
- Order Success 搬移至 (shop)


### 🛠 修正
- 修正 order-success 部署錯誤
- 修正 Vercel 環境變數設定
- 重新建立 Vercel Project

## v0.7.0（Route Groups 前台重構完成）

## v0.8.0 - Layout 分離

### Changed
- 建立 `(admin)` Route Group
- 將 `app/admin` 搬移至 `app/(admin)/admin`
- 保持 `/admin/*` 網址不變
- 為後續前後台 Layout 分離做好準備

## v0.8.1 - Homepage Redesign & Premium Navbar

### Added
- 建立 Premium Navbar
- Hero Banner 置頂
- Navbar 疊加 Hero Banner
- Navbar Scroll 視覺效果
- 新版購物車按鈕

### Changed
- 首頁版面重新配置
- 人氣商品區移至品牌特色前
- Footer 樣式調整
- BrandFeatures、Story、OrderSteps 視覺優化

✅ v0.8.2
人氣推薦區重新設計
標題與文案升級
上下留白優化
商品卡間距調整
Hero 與商品區視覺銜接
查看全部商品按鈕

## v0.9.1 - Product Detail & UI Refinement 
## ProductCard 升級

### Added
- Product image links to product detail page
- Product name links to product detail page

### Changed
- ProductCard button redesigned
- ProductCard hover interaction improved
- BrandFeatures content refined
- Product detail page UI improvements


## v0.9.2 - Shopping Cart Persistence 購物車永久保存

### Added
- Save shopping cart to LocalStorage
- Restore shopping cart on page refresh

### Changed
- Cart state is now persisted across browser refreshes


## v0.9.3 - Cart Components Refactor 建立共用金額格式化工具（formatPrice）

### Changed
- Refactored cart page into reusable components.
- Added CartItem component.
- Added CartSummary component.
- Simplified cart page to follow Thin Page architecture.
- Adopted Feature-First project structure for cart module.

0.9.3 完成項目
✅ 購物車功能正常
✅ 元件拆分完成
✅ page.tsx 符合 Thin Page
✅ CartItem.tsx 負責商品列表
✅ CartSummary.tsx 負責購物車摘要
✅ 功能與重構前一致


## v0.9.4（Cart Pricing & Summary）

### Added
- 新增 CartSummaryItem 元件
- 購物車摘要加入商品縮圖
- 顯示商品名稱
- 顯示數量 × 單價
- 顯示每項小計
- 摘要區支援捲動
- 顯示商品總數
- 顯示商品總金額

### Changed
- CartSummary 改採 CartSummaryItem 組成
- 改善購物車摘要版面與資訊詳細層級


## v0.9.5 – Product Card UX 完成

完成項目：

✅ 商品圖片可點擊
✅ 商品名稱可點擊
✅ 顯示商品價格
✅ 查看商品按鈕
✅ 加入購物車按鈕
✅ lucide-react 圖示
✅ Navbar 購物車數量即時更新
✅ 加入後顯示「✓ 已加入」
✅ 商品圖片 Hover 放大
✅ 商品圖片點擊縮放
✅ 商品卡片 Hover 浮起（最終採用：hover:-translate-y-2 + hover:shadow-xl）

## v0.9.6 – Checkout Feature 重構（Feature-First）

## ✨ 新增

- 建立 `features/checkout/` Feature 模組。
- 建立 Checkout 專屬 Data、UI、Logic 架構。
- 新增 `checkout.ts`（Single Source of Truth）。
- 新增 `useCheckout.ts`（Checkout 狀態管理）。
- 新增 `validateCheckout.ts`（結帳資料驗證）。
- 新增 `createOrder.ts`（建立訂單流程）。

## 🧩 Component

建立 Checkout 專屬元件：

- `CheckoutForm`
- `DeliveryMethod`
- `PaymentMethod`
- `OrderSummary`

全部改為 Props 化（Controlled Components）。

## 🏗️ Architecture

完成 Checkout Feature-First 架構：

Data
→ UI
→ Logic
→ Composition（Thin Page）

CheckoutPage 不再直接管理 UI，
改由 Feature Components 組裝完成。

## 🎨 UI

- 收件資訊改為獨立元件。
- 配送方式改為獨立元件。
- 付款方式改為獨立元件。
- 訂單摘要改為獨立元件。
- 付款方式改回簡潔版 Radio UI。
- 修正手機版滾動時元件互相遮蓋問題（取消 sticky）。

## 🔧 Refactor

- State 全部移至 `useCheckout`。
- UI 與 Business Logic 分離。
- 建立 Checkout Component Standards：
  - Input Components
  - Selection Components
  - Display Components

## 📝 Notes

本版本以「架構重構」為主，
不新增 UX 功能。

OrderSummary 商品展開／收合功能，
規劃於下一版本（v0.9.7）。