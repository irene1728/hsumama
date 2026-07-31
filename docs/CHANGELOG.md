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