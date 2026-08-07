《徐媽媽冰鑽滷味 開發規範 v1.0》
規範一：功能模組自己管理自己的檔案（Feature-First）

每個功能擁有自己的 Feature。

元件（Components）、Hooks、Context、型別（Types）、工具（Utils）、Constants 等，都放在自己的 Feature 資料夾內管理。

規範二：只有真正跨功能使用的程式，才放到根目錄

只有真正全站共用的程式才放到：

components/
hooks/
lib/
types/
utils/

避免 Feature 與全站共用程式混在一起。

規範三：Page 保持精簡（Thin Page）

Page 只負責：

路由（Routing）
Layout
組合 Components

Page 不負責：

商業邏輯（Business Logic）
大量 JSX
API 處理
資料轉換
規範四：Refactor 與新功能分開版本

一個版本只做一件事情。

例如：

Refactor
新功能
Bug Fix

不要混在同一個版本。

規範五：新功能一律建立於 features/

除了真正全站共用功能之外，

所有新功能皆建立於：

features/

依功能分類管理。

規範六：資料單一來源（Single Source of Truth）

同一份資料，只允許有一個真正的來源。

所有：

狀態（Status）
常數（Constants）
付款方式
配送方式
訂單狀態
付款狀態
共用文字
設定值

統一由：

constants/
config/

集中管理。

禁止於不同頁面重複定義或寫死文字。

規範七：先規劃，再實作（Design Before Code）

不要直接開始寫程式。

流程必須為：

需求分析
技術決策（ADR）
架構設計
資料設計
UI 設計
開始實作
規範八：功能必須符合實際營運流程（Business-Driven Development）

所有功能都必須先思考：

「這對徐媽媽冰鑽滷味每天的工作有幫助嗎？」

避免為了技術而增加沒有實際價值的功能。

規範九：先定義資料（Data），再建立介面（UI），最後串接功能（Logic）

開發順序固定：

Data
   ↓
UI
   ↓
Logic

避免 UI 與資料互相依賴。

規範十：元件以 Props 溝通

元件只負責：

顯示資料
接收 Props

元件透過：

onXXXChange()

通知外部。

元件不得直接依賴：

useState
useCart
useContext
Store
API

降低耦合。

規範十一：已有元件，以 Refactor 為主，不以 Rewrite 為主

已有功能：

優先修改（Refactor）。

不要因為想重新設計而全部重寫（Rewrite）。

降低風險並保留既有測試成果。

規範十二：官方文件優先（Official Documentation First）

使用新的：

Framework
Library
API
第三方套件

必須先閱讀：

官方文件
官方範例

確認最佳實作後，再開始設計。

規範十三：保持簡單（KISS）

能簡單完成，

就不要採用複雜設計。

優先選擇：

容易閱讀
容易維護
容易理解

的方案。

規範十四：避免過度設計（YAGNI）

不要為了未來可能發生的需求，

預留過度架構。

真正需要時，再進行擴充。

規範十五：模組單一職責（Single Responsibility）

每個模組只負責一件事情。

例如：

generateOrderPdf()
    ↓
負責流程控制

drawHeader.ts
    ↓
負責 Header

drawCustomer.ts
    ↓
負責 Customer

drawItems.ts
    ↓
負責 Items

drawPayment.ts
    ↓
負責 Payment

drawShipping.ts
    ↓
負責 Shipping

drawFooter.ts
    ↓
負責 Footer

fonts.ts
    ↓
負責字型管理

loader.ts
    ↓
負責圖片素材

orderToPdf.ts
    ↓
負責資料轉換

禁止一個模組同時負責多種職責。

規範十六：每完成一個 Task 必須完成完整開發流程

每完成一個 Task：

更新 CHANGELOG.md
Git Commit
GitHub Push
Vercel 部署
確認 🟢 Ready 後，才能開始下一個 Task。
開發流程（Workflow）

所有功能皆遵循以下流程：

需求分析
    ↓
官方文件
    ↓
ADR（技術決策）
    ↓
Architecture（架構設計）
    ↓
Data（資料設計）
    ↓
UI（介面設計）
    ↓
Implementation（實作）
    ↓
Test（測試）
    ↓
CHANGELOG
    ↓
Git Commit
    ↓
GitHub Push
    ↓
Vercel Ready


# 訂單建立後，所有交易資料必須保存成交當下的快照（Snapshot），不得依賴目前商品資料。

包括：

商品名稱
成交單價
數量
小計
（未來還可以包含商品規格、口味、備註等）