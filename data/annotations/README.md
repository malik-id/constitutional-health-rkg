# Dataset anotasi terstruktur — V1, V2, V3

File CSV ini dipulihkan dari **representasi teks terindeks** tiga workbook dalam ChatGPT Library:

- V1: `Anotasi_RKG_SPM_Kesehatan_2026.xlsx` — 10 sheet.
- V2: `Anotasi_dan_Audit_RKG_SPM_Kesehatan_V2.xlsx` — 20 sheet.
- V3: `Anotasi_Audit_dan_Temuan_RKG_SPM_V3.xlsx` — 27 sheet.

**Penting:** CSV mempertahankan teks kolom, baris dan indeks yang tersedia dalam hasil ekstraksi, **bukan** salinan byte-untuk-byte workbook asli. Kolom `index` berasal dari layer ekspor teks. Header `Unnamed:*`, pemformatan, formula Excel, komentar, tipe sel, dan object workbook **tidak dipastikan identik dengan sumber**. Rujuk kembali workbook asli sebelum menjadikannya data final penelitian.

Sheet V3 yang paling relevan: `MULAI_V3.csv`, `Audit_29_Relasi.csv`, `Landasan_Formal_V3.csv`, `Matriks_Temuan_V3.csv`, `Rekomendasi_PPHN.csv`, `Ablasi_V3.csv`, dan `Form_Review_Pakar.csv`. V1/V2 disimpan sebagai jejak historis, dan bukan versi aktif yang boleh ditafsirkan sebagai final.

Periksa `EXTRACTION_MANIFEST.json` untuk jumlah baris per sheet dan distribusi jumlah kolom dari hasil konversi.
