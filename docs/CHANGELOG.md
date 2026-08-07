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

- 已建立 `useOrderSummary.ts` Hook 架構。
- 商品展開／收合功能將於 v0.9.7 完成。


## v0.9.7 – Checkout UX Optimization

## ✨ 新增 ✨

- OrderSummary 新增商品展開／收合功能。
- 新增 `useOrderSummary` Hook 管理展開狀態。

## 🎨 UI

- OrderSummary 預設顯示前 5 項商品。
- 超過 5 項時顯示「▼ 查看其餘 X 項商品」。
- 展開後可切換為「▲ 收合商品」。
- 手機與桌機採用一致的顯示策略。

## 🏗️ Architecture

- 新增 `features/checkout/hooks/useOrderSummary.ts`。
- OrderSummary 採用 Hook 管理 UI 狀態。

## 🔧 Refactor

- 商品列表改為依 `expanded` 狀態切換顯示。
- 使用 `hiddenCount` 動態計算未顯示商品數量。

## 📝 Notes

- OrderSummary UX 已完成第一版。
- 後續可視需求加入展開／收合動畫。

## v0.9.8 – PDF Engine 持續開發

### Added

- 新增 PDF Customer（客戶資訊）區塊
- 新增 PDF 商品明細（AutoTable）
- 新增 PDF Customer / Items 繪圖模組
- 新增 PDF Order Mapper（orderToPdf）

### Changed

- PDF 採用 jsPDF-AutoTable 作為商品明細表格
- Customer 改為單欄式資訊排版
- PDF Customer 資料改由 Mapper 提供
- orders 查詢新增 phone、email、address 欄位

### Fixed

- 修正 PDF 中文字型載入問題
- 修正 Customer 電話、Email、地址未顯示問題
- 修正 PDF 與 OrderRow 資料對應

### Notes

- PDF 字型正式採用 NotoSansTC。
- 不採用 Font Module。
- 採用 fetch() + addFileToVFS() + addFont()。
- 商品明細採用 jsPDF-AutoTable。
- Customer 改為「標籤：內容」單欄式設計。
- PDF Engine 採用 Mapper 分離資料來源。


# Changelog

## v0.9.8 – Order Receipt PDF 正式版

### ✨ Added
- 新增 PDF Engine v1.0 架構
- 新增訂單收據 PDF（Order Receipt）
- 新增 Header（Logo、品牌名稱、訂單資訊）
- 新增客戶資訊區塊
- 新增商品明細（AutoTable）
- 新增商品小計／運費／總金額（Summary）
- 新增付款資訊
- 新增配送資訊
- 新增 Footer
- 新增 LINE 官方帳號 QR Code
- 新增官方網站 QR Code
- 新增自動換頁（Auto Page Break）
- 新增第二頁商品表頭自動重複顯示

### ♻️ Changed
- 採用 Dynamic Layout Flow，改為依區塊自動排版
- 商品明細、客戶資訊、付款資訊、配送資訊重新調整版面
- Receipt Compact Layout，降低留白、提升版面利用率
- Footer 改為動態位置，不再使用固定座標
- QR Code 改由 Footer 統一管理

### 🛠 Refactored
- 建立 PDF Config 集中管理版面設定
- 建立 PDF Font 集中管理字型與字級
- 建立 PDF Assets 集中管理圖片資源
- 建立 Loader 統一載入圖片素材
- drawXXX 模組全面採用 Single Responsibility
- 移除大部分 Magic Number
- 全面採用共用設定（Spacing、Height、Font、QR Size）

### 📋 Architecture
- 完成 PDF Engine v1.0
- 完成 Dynamic Layout System
- 完成 Auto Page Break System
- 完成 Footer QR Layout
- 建立 PDF Engine 開發規範（24 條）

### 🎉 Milestone

- 完成 PDF Engine v1.0（Production Ready）
- 可作為後續出貨單、報價單、付款通知等 PDF 的共用引擎。