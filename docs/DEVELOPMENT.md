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