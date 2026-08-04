generateOrderPdf()

        │
        ▼

registerFonts(doc)

        │
        ├── fetch Regular.ttf
        ├── addFileToVFS()
        ├── addFont()

        ├── fetch Bold.ttf
        ├── addFileToVFS()
        └── addFont()

        │
        ▼

drawHeader()

        ▼

drawCustomer()

        ▼

drawItems()