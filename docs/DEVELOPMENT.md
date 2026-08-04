# 開發規範

## Git 流程

每完成一個功能：

1. 功能測試
2. 更新 CHANGELOG
3. git add .
4. git commit
5. git push

---

## Commit 規範

Commit 使用：

完成XXXX功能

例如：

完成會員登入

完成商品圖片上傳

完成 Dashboard

---

## Git Tag

重要版本建立 Tag。

例如：

v0.6.0

v0.7.0

v0.8.0

v1.0.0

---

## 版本命名

採用 Semantic Version。

Major.Minor.Patch

例如：

v1.0.0

v1.1.0

v1.1.1


徐媽媽冰鑽滷味 開發原則 v1.0
① 一個版本，只做一個主題

例如：

v0.9.2 → 購物車永久保存
v0.9.3 → 金額計算
v0.9.4 → 結帳流程

不要同一版又改動畫、又改會員、又改 UI。
除非是修正 Bug，否則不在已經 Ready 的版本上加入新功能。

每完成一個版本，就花 2～3 分鐘回顧：「哪些地方做得順利？有沒有需要改進的流程？」
✅ 完整檔案比局部修改更適合目前的開發方式。


1.✅ 一個版本只做一件事（Single Responsibility per Version）
2.✅ 完成功能 → 測試 → Git → Vercel → CHANGELOG
3.✅ 修改超過 10 行，提供完整檔案
4.✅ Feature-First（功能模組自己管理自己的檔案）
5.✅ 只有跨功能共用程式才放根目錄
6.✅ Page 保持精簡（Thin Page）
7.✅ Refactor 與新功能分開版本
8.✅先設計架構，再開始寫程式（Architecture First）

⭐⭐⭐⭐⭐
## 《徐媽媽冰鑽滷味 開發規範 v1.0》
# 規範一：功能模組自己管理自己的檔案（Feature-First）
         每個功能擁有自己的資料夾，元件、Hook、Context、型別、工具都放在自己的 Feature 下。
# 規範二：只有真正跨功能使用的程式，才放到根目錄
# 規範三：Page 保持精簡（Thin Page）
         Page 負責：路由 Layout 組合元件
         不負責：商業邏輯  大量JSX  API 處理
# 規範四：Refactor 與新功能分開版本
         每個版本只做一種事情。    
# 規範五：新功能一律建立於 features/
         除了真正全站共用元件之外，   
# 規範六：資料流單向（Single Source of Truth）
        同一份資料，只允許有一個真正的來源（Single Source of Truth）。    
# 規範七：先規劃，再實作（Design Before Code） 
        不要直接寫程式。
# 規範八：功能必須符合實際營運流程（Business-Driven Development）
         所有功能都要先問：「這對徐媽媽冰鑽滷味每天的工作有幫助嗎？」       
# 規範九：先定義資料（Data），再建立介面（UI），最後串接功能（Logic）         
# 規範十：元件以 Props 溝通，不直接依賴父元件狀態。
         元件負責顯示資料。
         元件透過 onXXXChange 通知外部。
         元件不要直接知道 useState、useCart 或其他狀態來源。
# 規範十一:已有元件，以修改（Refactor）為主，不以重寫（Rewrite）為主。


📋 最終版規範（v1.0）
Feature-First（功能模組自己管理）
Shared Only（共用程式才放根目錄）
Thin Page（Page 保持精簡）
Refactor 與新功能分開版本
新功能一律建立於 features/
Single Source of Truth（單一資料來源）
Design Before Code（先設計後開發）
Business-Driven Development（功能符合實際營運）
Data → UI → Logic（先定義資料，再建立介面，最後串接功能）   

# 建議增加：資料夾架構
hsumama/

app/
features/
components/
lib/
hooks/
types/
public/
docs/

features/
    cart/
    checkout/
    product/
    order/
    admin/
    member/

🔄 建議增加：開發流程 ##工作流程（Workflow）
需求討論
↓
流程規劃
↓
資料(Data)
↓
介面(UI)
↓
功能(Logic)
↓
測試
↓
Git Commit
↓
Push
↓
Vercel
↓
CHANGELOG    

先把地基打好，再蓋房子。
先讓架構正確，再追求功能完整。
現在用不到，就不要先做；有需求時，再擴充。
功能可以慢慢增加，但架構要一開始就正確。

# DEVELOPMENT

## 一、開發規範（Rules）

...

## 二、設計哲學（Design Philosophy）
   1.建立一個標準，再重複使用，不要每個元件都重新發明做法。
...

## 三、開發流程（Workflow）

Business
↓
Workflow
↓
Data
↓
UI
↓
Logic
↓
Test
↓
Git
↓
Vercel

# 新元件開發流程

Design
↓
UI
↓
Props
↓
Controlled Component
↓
Logic
↓
Page
↓
Test

# Component Design Standard
Input Components
↓
Selection Components
↓
Display Components

以後任何元件：
先分類。
再開始寫。


### CHANGELOG 撰寫規範

每個版本固定使用以下結構：

# Version

例如：

# v0.9.6 – Checkout Feature 重構

---

## ✨ 新增（New）

本版本新增的功能、元件或模組。

---

## 🎨 UI（User Interface）

介面調整、版面修改、RWD、UX 改善。

---

## 🏗️ Architecture（Architecture）

資料夾結構、Feature-First、Component Composition、
Hook、Data Flow、整體架構調整。

---

## 🔧 Refactor（Refactor）

程式碼重構、Props 化、Logic 分離、
命名調整、效能改善。

---

## 📝 Notes（Notes）

版本備註、已知事項、下一版本規劃。

例如：

- 下一版預計加入 OrderSummary 展開／收合
- 手機預設收合，桌機預設展開
- 後續規劃 PDF 訂單


官方資源開發流程 v1.0（正式版）
Step 1
官方文件（Official Docs）
        │
        ▼
Step 2
確認技術方案（Best Practice）
        │
        ▼
Step 3
設計架構（Architecture）
        │
        ▼
Step 4
開始實作（Implementation）
        │
        ▼
Step 5
測試（Testing）
        │
        ▼
Step 6
Git Commit
        │
        ▼
Step 7
GitHub Push
        │
        ▼
Step 8
Vercel Ready
        │
        ▼
Step 9
更新 CHANGELOG
## 查官方文件
確認最佳實作（Best Practice）
提出架構設計

##  字型專案標準：
原始字型
## public/fonts-source/
唯一來源。
字體名稱-Weight.ttf
例如：
NotoSansTC-Regular.ttf
NotoSansTC-Bold.ttf
Roboto-Regular.ttf
Roboto-Bold.ttf

❌❌不建立
NotoSansTC-Regular.js
NotoSansTC-Bold.js
Roboto-Regular.js
Roboto-Bold.js
❌❌不建立
convert-font.js

🟡registerFonts()
唯一負責：
載入字型
註冊字型
設定預設字型

# ### CHANGELOG 原則

1. 每個版本都有明確主題。

2. 一個版本只完成一種主要目標。

3. Refactor 與新功能盡量分開版本。

4. CHANGELOG 只記錄「本版本實際完成」的內容。

5. 未完成或下一步規劃，統一寫在 Notes。

## TypeScript / React Coding Style

### 排版規範

- import 與程式主體之間保留 1 個空白行。
- Function 開頭不要保留多餘空白行。
- State 集中放在 Function 最前面。
- Function 放在 State 後面。
- return 前保留 1 個空白行。
- 區塊之間最多保留 1 個空白行。
- 不要連續出現 2 個以上空白行。
- 檔案結尾保留 1 個空白行。

### 範例

```ts
"use client";

import { useState } from "react";

export function useOrderSummary() {
  const [expanded, setExpanded] = useState(false);

  function toggleExpanded() {
    setExpanded((prev) => !prev);
  }

  return {
    expanded,
    toggleExpanded,
  };
}


