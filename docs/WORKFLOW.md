# 徐媽媽冰鑽滷味 開發流程（Workflow）

> 本文件為本專案唯一的開發流程標準（Single Source of Truth）。
>
> 每次功能開發、修正、版本發布皆依照本文件執行。
> 若流程有變更，請優先更新本文件。
以後新增或修改的程式，一律使用 @/ 路徑，不再新增 ../../ 相對路徑。
開發期間請保持 npm run dev 持續執行，不需要因搬移檔案或修改程式而停止；只有在安裝套件、伺服器異常或結束開發時才停止。

## 每次開始開發
1. git pull
2. npm run dev

---

## 開發完成

1. 本機測試
2. git status
3. git add .
4. git commit -m "功能名稱"
5. git push
6. 確認 Vercel 部署成功
7. 更新 docs/CHANGELOG.md

---

## 大版本發布

建立 Tag

git tag -a v0.x.x -m "版本說明"

git push origin v0.x.x

---

## 發布前確認

□ 首頁正常
□ 商品頁正常
□ 商品圖片正常
□ 購物車正常
□ 結帳正常
□ 後台正常
□ 手機版正常
□ Vercel Ready
□ CHANGELOG 更新
□ Tag 建立（重要版本）


# WORKFLOW

本文件記錄各功能模組的工作流程（Workflow）。

開發新功能時，先規劃 Workflow，再進入 Data → UI → Logic。

---

# Checkout Workflow

```text
購物車（Cart）

        │

        ▼

Checkout

        │

        ├── 收件資訊（CheckoutForm）

        ├── 配送方式（DeliveryMethod）

        ├── 付款方式（PaymentMethod）

        ├── 訂單摘要（OrderSummary）

        │

        ▼

確認送出訂單

        │

        ▼

資料驗證

        │

        ▼

建立訂單（createOrder）

        │

        ▼

Supabase

        ├── orders

        └── order_items

        │

        ▼

清空購物車（clearCart）

        │

        ▼

導向訂單完成頁（Order Success）

        │

        ▼

未來功能（預留）

        ├── Email 通知客戶
        ├── Email 通知出貨
        ├── PDF 出貨單
        ├── QR Code
        ├── LINE Notify
        └── 後台待出貨
```

---

## 設計理念

- Data → UI → Logic
- Feature-First
- Single Responsibility
- Business-Driven Development
- 預留擴充性，不預做功能
