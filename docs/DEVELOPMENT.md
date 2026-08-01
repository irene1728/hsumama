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