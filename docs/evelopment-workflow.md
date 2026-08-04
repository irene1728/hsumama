PDF Engine
後台管理
金流
LINE Login
AI 客服
Supabase

全部遵守同一套流程。

以後每碰到新技術：

例如：

Stripe
LINE Login
Google OAuth
PDF
AI SDK

全部都先做：

docs/
    stripe.md
    line-login.md
    pdf-font.md

每份文件只有一件事：

記錄最終技術決策。


## 以後只要新增一個「新技術」，例如：

PDF
Stripe
LINE Login
Google OAuth
AI SDK

都先建立一份：

docs/xxx.md

然後依固定格式：

官方文件
可選方案
優缺點
最終決策
專案規範

只有這五點全部完成，才開始寫程式。

專案規範（我認為非常值得）

以後每個新模組都遵守三份文件：

docs/
    xxx.md                 ← 技術決策（ADR）
    xxx-architecture.md    ← 架構圖
    xxx-flow.md            ← 流程圖（可選）

例如：

pdf-font.md
pdf-font-architecture.md

或：

payment.md
payment-architecture.md

這樣你的專案會變成：

先有設計，再有程式。