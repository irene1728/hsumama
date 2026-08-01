# VERSION HISTORY

記錄每個版本的設計理念、重要決策與開發心得。

目的不是記錄功能，而是保留每一次架構演進的原因，
讓未來回顧時，可以了解當初的設計思路。

---
# v0.9.6 – Checkout Foundation

## 版本目標

完成 Checkout 基礎架構，建立可長期維護的開發模式。

---

## 本版本的重要改變

- Feature-First 正式落實
- Checkout 拆分為獨立功能模組
- 建立 Checkout Workflow
- 建立 checkout.ts
- 建立 useCheckout Hook
- 建立 validateCheckout()
- 建立 createOrder()
- Components 開始 Props 化

---

## 架構上的改變

由原本所有程式集中於 page.tsx：

CheckoutPage
├── UI
├── State
├── Validation
├── Supabase
└── Router

逐步拆分為：

CheckoutPage
├── Components
├── useCheckout
├── validateCheckout
└── createOrder

每個模組負責單一職責。

---

## 本版本建立的設計哲學

- Data → UI → Logic
- Feature-First
- Thin Page
- 預留擴充性，不預做功能
- 一個 Function，只做好一件事情
- 元件以 Props 溝通，不直接依賴父元件狀態
- Refactor in Small Steps

---

## 學到的事情

先完成可運作的功能，再逐步重構架構。

避免一次修改大量程式碼，採用小步重構，每完成一步就測試與 Commit。

這讓除錯更容易，也讓架構演進更加穩定。


## Architecture Milestone

本版本v0.9.6完成了專案第一套 Component Standards。

建立三種標準元件：

- Input Components
- Selection Components
- Display Components

之後所有新功能都依照此分類設計，
而不是每次重新思考元件架構。

這也是 Feature-First 開發模式第一次完整落地。


---

## 下一步

v0.9.7

Checkout Refactor

- Thin Page
- Props 化完成
- Component Composition
- 共用元件整理

## 給未來的自己

不要急著追求最漂亮的架構，先完成真正需要的功能，再透過小步重構慢慢改善。穩定的演進，比一次性的完美更重要。