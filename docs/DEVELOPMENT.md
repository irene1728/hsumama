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

## 「功能模組自己管理自己的檔案」的原則
規範一:功能模組自己管理自己的檔案（Feature-First）
規範二:只有真正跨功能使用的程式，才放到根目錄（components、lib、hooks、types）
規範三：Page 保持精簡（Thin Page）
規範四：Refactor 與新功能分開版本

page.tsx 的責任只有：

取得資料
組合元件
控制頁面流程
不要把商業邏輯和大量 UI 都塞在 page.tsx。


1.✅ 一個版本只做一件事（Single Responsibility per Version）
2.✅ 完成功能 → 測試 → Git → Vercel → CHANGELOG
3.✅ 修改超過 10 行，提供完整檔案
4.✅ Feature-First（功能模組自己管理自己的檔案）
5.✅ 只有跨功能共用程式才放根目錄
6.✅ Page 保持精簡（Thin Page）
7.✅ Refactor 與新功能分開版本
8.✅先設計架構，再開始寫程式（Architecture First）