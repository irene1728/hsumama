## ADR-001（更新版）
## PDF Font 技術決策（正式版）最終採用方案

✅ 方案：直接載入 TTF

流程：

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
選擇理由
① 不依賴 Converter

不用：

TTF
↓
Converter
↓
JS Font Module

少一個步驟。

② 原始字型就是唯一來源（Single Source of Truth）

專案永遠只有：

public/
└── fonts-source/
    ├── NotoSansTC-Regular.ttf
    ├── NotoSansTC-Bold.ttf
    ├── Roboto-Regular.ttf
    └── Roboto-Bold.ttf

不用維護：

NotoSansTC-Regular.js

這類衍生檔。

③ PDF Engine 更乾淨
fonts.ts
    │
    ├── registerFonts()
    ├── setTitleFont()
    ├── setHeadingFont()
    ├── setBodyFont()
    └── setSmallFont()

所有字型都集中管理。

④ 新網站零轉換

例如：

BestLife

只要：

複製：

public/fonts-source/

即可。

不用重新跑任何 Converter。

⑤ 符合我們的開發理念

簡單、乾淨、容易維護。