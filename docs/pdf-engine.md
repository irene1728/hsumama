## Purpose

## PDF Engine 是整個網站所有 PDF 文件的共用模組。

包含：

- Order Receipt
- Shipping Note
- Invoice
- Quotation
- Statement

所有 PDF 都必須遵守本規範。

以後 AI 也很好讀。例:
Codex：
請遵守 docs/pdf-engine.md 規範，
完成 drawFooter.ts。

##  PDF Engine v1.0 Architecture Guide（PDF 引擎架構規範）
📋 PDF 模組開發規範 v1.0（目前定稿）
1. 單一職責（Single Responsibility）
2. drawXXX 不得直接存取資源
3. 所有圖片集中管理
4. 所有圖片統一由 loader 載入
5. generateOrderPdf 只負責流程
6. drawXXX 不知道圖片來源
7. 不允許 Magic Number
8. 字型集中管理
9. drawXXX 不允許修改其他區塊
10. drawXXX 不允許 save()
11. drawXXX 必須是 Pure Function
12. 不允許重複程式（DRY）
13. 依賴方向固定（Dependency Rule）
14. 共用設定集中管理
15. 命名優先採用完整且具語意的名稱（Semantic Naming），避免使用不必要的縮寫。
16. 完成一個模組就立即驗證（Incremental Verification）
17. PDF 字型採用 TTF 直接載入（Official API）管理。
18. 所有原始字型統一存放於：public/fonts-source/
19. PDF Engine 透過 registerFonts() 使用fetch() → addFileToVFS() → addFont()完成字型註冊。
20. 所有 drawXXX.ts 不直接處理字型，僅呼叫 fonts.ts 提供的字型 API。
21. registerFonts() 於 generateOrderPdf() 僅呼叫一次。
22. 字型註冊集中於 fonts.ts，其他模組不得重複註冊字型。

## 這個 PDF 模組，我們遵守一個原則：
drawXXX.ts 永遠不能 fetch、不能讀檔、不能知道圖片在哪裡。
也就是說：
drawHeader.ts：只負責畫 Header。
drawFooter.ts：只負責畫 Footer。
loader.ts：唯一負責載入圖片。
assets.ts：唯一管理圖片路徑。
drawItems.ts:只畫商品表格
generateOrderPdf:只負責流程


## Future Refactoring (v1.1)

- PdfLayoutContext
- createPdf()
- Asset Cache
- Brand Text Config

# PDF Engine v1.0

> 徐媽媽冰鑽滷味 Website
>
> Module：
> PDF Engine
>
> Version：
> v1.0
>
> Last Update：
> 2026-08-04

## 未來下一個網站架購參考 PDF Engine v2.0（Library 化）
lib/
└── pdf-engine/
    ├── config/
    ├── fonts/
    ├── loader/
    ├── draw/
    ├── helpers/
    ├── createPdf.ts
    └── generatePdf.ts

features/
└── checkout/
    ├── mapper/
    │   └── orderToPdf.ts
    │
    └── pdf/
        └── pdfTheme.ts


PDF Header 想多放公司電話。
以前：
徐媽媽
BestLife
客戶A
客戶B如果有共用 Engine：
lib/pdf-engine/drawHeader.ts
改一次。
所有網站一起升級。

## 可以重複使用的網站元件庫的思維。
PDF Engine（共用 PDF 產生器）
Mapper Layer（不同資料來源轉成統一模型）
Config Layer（pdfConfig.ts、assets.ts、fontConfig.ts）
Loader Layer（圖片、字型集中載入）

## Make it work first. Make it reusable later.
先讓它能正常運作，再把它抽象成可重用的模組。


## JS Font Module 不是程式，而是由 TTF 轉換產生的「字型封裝檔」，
## 屬於 PDF Engine 的資源（Asset），不需要手動修改。

PDF Engine v1.0 路線（正式版 v1.1）
Phase 0：開發流程（Development Workflow）✅

所有新功能皆遵守以下流程：

Step 1  官方文件（Official Docs）
        ↓
Step 2  技術決策（ADR）
        ↓
Step 3  架構設計（Architecture）
        ↓
Step 4  開始實作（Implementation）
        ↓
Step 5  測試（Testing）
        ↓
Step 6  Git Commit
        ↓
Step 7  GitHub Push
        ↓
Step 8  Vercel Ready
        ↓
Step 9  CHANGELOG
Phase 1：核心架構（完成） ✅
✅ PDF Config
✅ Assets
✅ createPdf()
✅ drawHeader()
✅ generateOrderPdf()
✅ Order Mapper
✅ Download Order Button

完成內容：

PDF 基本架構完成
Header 繪製完成
PDF 建立流程完成
Order Mapper 完成
Download Button 完成
Phase 2：PDF 字型（進行中） 🟡
技術決策（完成）
✅ 官方文件確認
✅ 技術方案（ADR-001）
✅ pdf-font.md
✅ pdf-engine.md 更新
字型實作
⬜ registerFonts()
⬜ generateOrderPdf() 整合 registerFonts()
⬜ Regular.ttf 載入成功
⬜ Bold.ttf 載入成功
⬜ 中文正常顯示
⬜ Regular / Bold 切換驗證
字型架構
public/fonts-source/
        │
        ▼
fetch(ttf)
        │
        ▼
addFileToVFS()
        │
        ▼
addFont()
        │
        ▼
registerFonts()
        │
        ▼
drawHeader()
Phase 3：PDF 內容（待開始）
⬜ drawCustomer.ts
⬜ drawItems.ts
⬜ drawPayment.ts
⬜ drawShipping.ts
⬜ drawFooter.ts

完成後 PDF 將具備完整訂單內容。

Phase 4：整合測試
⬜ 真實訂單測試
⬜ Logo 顯示
⬜ QR Code 顯示
⬜ 中文字型測試
⬜ AutoTable 整合
⬜ 自動分頁
⬜ PDF 檔名
⬜ Chrome 測試
⬜ Edge 測試
⬜ 手機下載測試
Phase 5：正式版 Release
⬜ CHANGELOG 更新
⬜ Git Commit
⬜ GitHub Push
⬜ Vercel Ready
⬜ PDF Engine v1.0 Release
PDF Engine 最終架構
generateOrderPdf()

        │
        ▼

createPdf()

        │
        ▼

registerFonts()

        │
        ▼

drawHeader()

        │
        ▼

drawCustomer()

        │
        ▼

drawItems()

        │
        ▼

drawPayment()

        │
        ▼

drawShipping()

        │
        ▼

drawFooter()

        │
        ▼

save()
Task 管理（建議）
Task-001：PDF Font Register 🟡
狀態：
🟡 In Progress

完成條件：

⬜ registerFonts()

⬜ generateOrderPdf()
    成功呼叫 registerFonts()

⬜ drawHeader()
    中文正常

⬜ Regular.ttf
    載入成功

⬜ Bold.ttf
    載入成功

⬜ Regular / Bold
    可正常切換

⬜ 無亂碼
Task-002：Customer Block
⬜ drawCustomer.ts
Task-003：Items Block
⬜ drawItems.ts
Task-004：Payment Block
⬜ drawPayment.ts
Task-005：Shipping Block
⬜ drawShipping.ts
Task-006：Footer Block
⬜ drawFooter.ts

## PDF Engine v1.0 開發原則
1. 官方文件優先。
2. 先完成 ADR（技術決策）。
3. 再設計架構。
4. 最後開始實作。
5. 單一職責（Single Responsibility）。
6. 所有 PDF 字型統一由 fonts.ts 管理。
7. registerFonts() 僅於 generateOrderPdf() 呼叫一次。
8. drawXXX.ts 不直接處理字型註冊。
9. 每完成一個 Task 即更新 CHANGELOG、Git Commit、GitHub Push、Vercel 部署。
10. 所有座標、尺寸、間距集中於 pdfConfig.ts，禁止在 drawXXX.ts 使用 Magic Number。
11. KISS（Keep It Simple, Stupid）— 能簡單完成，就不要複雜化。
12. YAGNI（You Aren't Gonna Need It）— 不為未來可能需求預留過度架構

等 PDF Engine v1.0 完成後，我們可以把 docs 再整理成：

docs/
│
├── pdf-engine.md          ⭐ 總規格書
├── pdf-font.md            ⭐ 字型 ADR
├── pdf-api.md             ⭐ API 規格
├── pdf-layout.md          ⭐ 版面設計
├── pdf-tasks.md           ⭐ Task 管理
└── CHANGELOG.md

## features/checkout/utils/pdf/fonts.ts
我建議就當成 v1.0 的基底，不要再為了每一步調整註解或架構而重寫。

接下來如果要加入真正的字型載入，我們只修改 registerFonts() 函式本體：

export async function registerFonts(doc: jsPDF): Promise<void> {
  // 這裡逐步加入：
  // 1. fetch()
  // 2. addFileToVFS()
  // 3. addFont()
}

其餘的：
PDF_FONT
setTitleFont()
setHeadingFont()
setBodyFont()
setSmallFont()
都不要再改。