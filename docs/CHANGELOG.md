# CHANGELOG

徐媽媽冰鑽滷味網站所有重要更新都記錄在這裡。

版本號從 v0.6.0 開始，代表專案正式進入版本化開發階段。

---

# v0.6.0（2026-07-29）

## 🎉 新增

- 管理員登入
- 商品管理（CRUD）
- 訂單管理
- 管理員登出
- Git 導入
- GitHub Repository
- GitHub Push
- Vercel 同步

---

# v0.6.1（2026-07-29）

## 📝 文件與開發流程

- 建立 `WORKFLOW.md`
- 建立專案開發 SOP
- 完善 `docs` 文件架構

---

# v0.7.0（Route Groups 前台重構完成）

## 🚀 Changed

- 建立 Next.js Route Groups
- 首頁搬移至 `(shop)`
- 商品列表搬移至 `(shop)`
- 商品詳細頁搬移至 `(shop)`
- 購物車搬移至 `(shop)`
- Checkout 搬移至 `(shop)`
- Order Success 搬移至 `(shop)`
- 修正 Product Detail `AddToCartButton` import

## 🛠 Fixed

- 修正 `order-success` 部署錯誤
- 修正 Vercel 環境變數設定
- 重新建立 Vercel Project

---

# v0.8.0（Layout 分離）

## 🚀 Changed

- 建立 `(admin)` Route Group
- 將 `app/admin` 搬移至 `app/(admin)/admin`
- 保持 `/admin/*` 網址不變
- 為後續前後台 Layout 分離做好準備

---

# v0.8.1（Homepage Redesign & Premium Navbar）

## ✨ Added

- 建立 Premium Navbar
- Hero Banner 置頂
- Navbar 疊加 Hero Banner
- Navbar Scroll 視覺效果
- 新版購物車按鈕

## 🎨 Changed

- 首頁版面重新配置
- 人氣商品區移至品牌特色前
- Footer 樣式調整
- BrandFeatures 視覺優化
- Story 視覺優化
- OrderSteps 視覺優化

---

# v0.8.2（人氣推薦區重新設計）

## 🎨 Changed

- 人氣推薦區重新設計
- 標題與文案升級
- 上下留白優化
- 商品卡間距調整
- Hero 與商品區視覺銜接
- 新增「查看全部商品」按鈕

---

# v0.9.1（Product Detail & UI Refinement）

## ✨ Added

- Product image 可連結至商品詳細頁
- Product name 可連結至商品詳細頁

## 🎨 Changed

- ProductCard 按鈕重新設計
- ProductCard Hover interaction 優化
- BrandFeatures 內容調整
- Product Detail Page UI 優化

---

# v0.9.2（Shopping Cart Persistence）

## ✨ Added

- 使用 LocalStorage 保存購物車
- 頁面重新整理後恢復購物車內容

## 🔧 Changed

- Cart state 支援跨瀏覽器重新整理保存

---

# v0.9.3（Shopping Cart Refactor）

## ✨ Added

- 建立共用金額格式化工具 `formatPrice`
- 建立 `CartItem`
- 建立 `CartSummary`

## 🔧 Refactored

- 購物車 Page 改為 Thin Page
- Cart Components 改採 Feature-First 架構
- Cart Page 元件拆分完成
- UI 與購物車資料邏輯進一步分離

## ✅ Completed

- 購物車功能正常
- 元件拆分完成
- `page.tsx` 符合 Thin Page
- `CartItem.tsx` 負責商品列表
- `CartSummary.tsx` 負責購物車摘要
- 功能與重構前一致

---

# v0.9.4（Cart Pricing & Summary）

## ✨ Added

- 新增 `CartSummaryItem`
- 購物車摘要加入商品縮圖
- 顯示商品名稱
- 顯示數量 × 單價
- 顯示每項小計
- 摘要區支援捲動
- 顯示商品總數
- 顯示商品總金額

## 🎨 Changed

- `CartSummary` 改採 `CartSummaryItem` 組成
- 改善購物車摘要版面
- 提升購物車資訊詳細程度

---

# v0.9.5（Product Card UX）

## ✨ Completed

- 商品圖片可點擊
- 商品名稱可點擊
- 顯示商品價格
- 查看商品按鈕
- 加入購物車按鈕
- 導入 `lucide-react` 圖示
- Navbar 購物車數量即時更新
- 加入購物車後顯示「✓ 已加入」
- 商品圖片 Hover 放大
- 商品圖片點擊縮放
- 商品卡片 Hover 浮起
- 最終採用 `hover:-translate-y-2`
- 最終採用 `hover:shadow-xl`

---

# v0.9.6（Checkout Feature-First Refactor）

## ✨ Added

- 建立 `features/checkout/` Feature 模組
- 建立 Checkout 專屬 Data / UI / Logic 架構
- 新增 `checkout.ts`（Single Source of Truth）
- 新增 `useCheckout.ts`
- 新增 `validateCheckout.ts`
- 新增 `createOrder.ts`

## 🧩 Components

建立 Checkout 專屬元件：

- `CheckoutForm`
- `DeliveryMethod`
- `PaymentMethod`
- `OrderSummary`

全部改為 Props 化（Controlled Components）。

## 🏗️ Architecture

完成 Checkout Feature-First 架構：

```text
Data
  ↓
UI
  ↓
Logic
  ↓
Composition（Thin Page）

CheckoutPage 不再直接管理 UI，
改由 Feature Components 組裝完成。

🎨 UI
收件資訊改為獨立元件
配送方式改為獨立元件
付款方式改為獨立元件
訂單摘要改為獨立元件
付款方式改回簡潔版 Radio UI
修正手機版滾動時元件互相遮蓋問題
取消 Sticky Checkout 元件
🔧 Refactor
State 全部移至 useCheckout
UI 與 Business Logic 分離
建立 Checkout Component Standards
Input Components
Selection Components
Display Components
📝 Notes

本版本以架構重構為主，不新增主要 UX 功能。

OrderSummary 商品展開／收合功能規劃於下一版本。

已建立 useOrderSummary.ts Hook 架構
商品展開／收合功能於 v0.9.7 完成
v0.9.7（Checkout UX Optimization）
✨ Added
OrderSummary 新增商品展開／收合功能
新增 useOrderSummary Hook 管理展開狀態
🎨 UI
OrderSummary 預設顯示前 5 項商品
超過 5 項時顯示「▼ 查看其餘 X 項商品」
展開後可切換為「▲ 收合商品」
手機與桌機採用一致的顯示策略
🏗️ Architecture
新增 features/checkout/hooks/useOrderSummary.ts
OrderSummary 採用 Hook 管理 UI 狀態
🔧 Refactor
商品列表依 expanded 狀態切換顯示
使用 hiddenCount 動態計算未顯示商品數量
📝 Notes
OrderSummary UX 第一版完成
後續可視需求加入展開／收合動畫
v0.9.8（Order Receipt PDF）
✨ Added
新增 PDF Engine v1.0 架構
新增訂單收據 PDF（Order Receipt）
新增 Header
Logo
品牌名稱
訂單資訊
新增客戶資訊區塊
新增商品明細
新增商品小計
新增運費
新增總金額
新增付款資訊
新增配送資訊
新增 Footer
新增 LINE 官方帳號 QR Code
新增官方網站 QR Code
新增自動換頁
新增第二頁商品表頭自動重複顯示
🔄 Changed
採用 Dynamic Layout Flow
商品明細、客戶資訊、付款資訊、配送資訊重新調整版面
Receipt Compact Layout
降低留白並提升版面利用率
Footer 改為動態位置
QR Code 改由 Footer 統一管理
🔧 Refactored
建立 PDF Config 集中管理版面設定
建立 PDF Font 集中管理字型與字級
建立 PDF Assets 集中管理圖片資源
建立 Loader 統一載入圖片素材
drawXXX 模組採 Single Responsibility
移除大部分 Magic Number
全面採用共用設定
Spacing
Height
Font
QR Size
🏗️ Architecture
完成 PDF Engine v1.0
完成 Dynamic Layout System
完成 Auto Page Break System
完成 Footer QR Layout
建立 PDF Engine 開發規範
🎉 Milestone
PDF Engine v1.0 Production Ready
可作為後續出貨單、報價單、付款通知等 PDF 的基礎
v0.9.9（Product Type 統一重構）
🔧 Refactored
統一 Product Type 定義
整理商品資料型別
修正不同元件間 Product Type 不一致問題
統一商品資料在前台、購物車與 Checkout 的使用方式
降低 TypeScript 型別衝突
為後續商品管理與訂單資料擴充建立基礎
v0.10（網站架構與訂單系統持續開發）
🔧 Development
持續整理網站 Feature-First 架構
持續完善 Checkout 與 Order 資料流程
持續整理 PDF Engine 與訂單資料 Mapper
強化前台下單與後台訂單管理之間的資料串接
📝 Notes

本版本主要延續 v0.9.x 的架構整理與功能整合，
為後續訂單、PDF、後台管理及商業營運功能做準備。

v0.11（Order Flow 訂單流程開發）
✨ Added
完善訂單建立流程
建立訂單與訂單商品資料的完整保存流程
強化訂單資料與 order_items 的關聯
後台訂單管理持續完善
完善訂單成功頁面資料顯示
強化顧客訂單 PDF 與訂單資料的串接
🔧 Changed
訂單建立流程持續重構
訂單商品資料採 Snapshot 概念保存
歷史訂單資料不依賴後續商品資料修改
📝 Notes

本版本開始確立：

orders
  ↓
order_items

作為網站訂單資料的核心結構，
為後續出貨、對帳及營運功能建立基礎。

v0.12（訂單與 PDF 系統整合）
🔧 Changed
持續完善訂單資料結構
強化訂單 PDF 與資料 Mapper 分離
整理 PDF Engine 共用工具
強化 PDF 字型、素材與版面管理
持續改善後台訂單管理
為出貨單與對帳單 PDF 建立架構基礎
📝 Notes

本版本主要作為 v0.11 訂單流程與 v0.13 商業營運功能之間的整合階段。

v0.13（批發價、出貨單與對帳單）
Step 2-1｜商品批發價管理
✨ Added
products 新增 wholesale_price
後台商品新增／編輯支援批發價
商品管理列表支援顯示批發價
完成目前可上架商品的批發價設定
Step 2-2｜訂單批發價快照
✨ Added
order_items 新增 wholesale_price
order_items 新增 wholesale_subtotal
下單時保存商品當下的批發價
下單時保存商品當下的批發小計
🔐 Data Integrity

歷史訂單對帳使用：

order_items.wholesale_price
order_items.wholesale_subtotal

不重新查詢：

products.wholesale_price

確保未來商品批發價修改後，
歷史訂單仍維持原本的批發價格。

Step 2-3A｜出貨單 PDF
✨ Added
建立獨立 Shipping PDF Engine
建立出貨單專用 PDF Config
建立出貨單 Header
建立出貨單 Customer
建立出貨單 Items
建立出貨單 Summary
建立出貨單 Footer
後台訂單管理新增出貨單 PDF 下載功能
🎨 Layout
使用目前網站 Logo
客戶資訊使用框線
商品明細使用顧客市價
數量、單價、小計靠右對齊
商品資料字體縮小
商品明細標題下方加入分隔線
金額摘要使用顧客實際售價
📝 Footer
徐媽媽冰鑽滷味
出貨單｜供出貨與配送使用
🔧 Notes
出貨單 PDF 與原本顧客訂單 PDF 完全分離
不修改原本顧客訂單 PDF Engine
npm run build 通過
後台可正常下載出貨單 PDF
Step 2-3B｜對帳單 PDF
✨ Added

建立獨立 Reconciliation PDF Engine：

features/checkout/utils/pdf/reconciliation/

包含：

reconciliationPdfConfig.ts
generateReconciliationPdf.ts
drawReconciliationHeader.ts
drawReconciliationCustomer.ts
drawReconciliationItems.ts
drawReconciliationSummary.ts
drawReconciliationFooter.ts
📄 對帳單內容
Logo
品牌名稱
對帳單標題
訂單編號
訂購日期
客戶資訊
商品明細
批發價
批發小計
批發商品金額
運費
批發應付金額
Footer
💰 對帳規則

對帳單商品金額使用：

order_items.wholesale_price
order_items.wholesale_subtotal

批發商品金額：

Σ order_items.wholesale_subtotal

運費：

orders.shipping_fee

批發應付金額：

批發商品金額 + orders.shipping_fee
🚚 免運規則

免運資格仍以顧客下單時的「顧客市價」判斷。

顧客市價滿 NT$3,000
→ shipping_fee = 0


顧客市價未滿 NT$3,000
→ shipping_fee = NT$160

對帳時直接使用訂單當時保存的 shipping_fee。

不以批發商品金額重新判斷免運。

🔐 Historical Snapshot

對帳單不重新查詢：

products.wholesale_price

而是使用下單時保存於：

order_items.wholesale_price
order_items.wholesale_subtotal

確保歷史訂單價格不受未來商品批發價變更影響。

🎨 Layout
實際視覺尺寸與出貨單保持一致
字體大小與出貨單保持一致
Logo 位置與出貨單保持一致
商品明細排版與出貨單保持一致
數量、批發價、批發小計靠右對齊
金額區樣式與出貨單保持一致
Footer 與出貨單保持一致的視覺規格
🧪 Testing
npm run build 通過
TypeScript 編譯通過
對帳單實機 PDF 測試通過
訂單 #1
顧客市價：NT$3,180
運費：NT$0
批發商品金額：NT$2,520
批發應付金額：NT$2,520
訂單 #2
顧客市價：NT$2,470
運費：NT$160
批發商品金額：NT$1,990
批發應付金額：NT$2,150

兩種運費情境皆驗證正確。

🎯 Current Status
v0.13
Step 2-1｜商品批發價管理 ✅
Step 2-2｜訂單批發價快照 ✅
Step 2-3A｜出貨單 PDF ✅
Step 2-3B｜對帳單 PDF ✅
PDF 系統目前包含
顧客訂單 PDF
    ↓
出貨單 PDF
    ↓
對帳單 PDF

三套 PDF Engine 各自獨立。

🚀 Next Milestone
v1.0.0｜正式上線

目標：

2026-09-01 正式上線徐媽媽冰鑽滷味網站。

v0.13 後續以正式上線前的：

核心功能完成
金流／付款流程
配送流程
後台營運
會員功能
網站穩定性
SEO
手機版
正式環境測試

為主要開發方向。

達成正式上線條件後，
將由 v0.x 開發版本進入：

v1.0.0 Production Release