# Audit dan Uji Struktur Regulatory Knowledge Graph SPM Kesehatan (V2)

**Judul penelitian:** Analisis Hubungan Norma Konstitusional dan Pembagian Kewenangan dalam Standar Pelayanan Minimal Kesehatan Berbasis Regulatory Knowledge Graph.

Snapshot sumber: 19 November 2026. Pemeriksaan sumber resmi dan anotasi manual; **tidak termasuk validasi ahli hukum**.

## Cakupan dan hasil pemrosesan lokal
- Dokumen regulasi: **7** (6 inti, 1 pendukung Perpres No. 13 Tahun 2026).
- Unit klausul/konsep norma yang dianotasi: **41** (berasal dari 23 ID awal yang dipecah dan 12 norma pendukung). Sebagian masih menggabungkan beberapa tindakan; tidak seluruhnya atom terkecil.
- Kategori jenis pelayanan SPM: **14** (provinsi 2, kabupaten/kota 12).
- Hubungan antarnorma kandidat: **29**; rincian bukti {'E3': 6, 'E2': 16, 'E1': 7}.
- Graf *benar-benar dibentuk di NetworkX secara lokal*: **131 node** dan **213 edge**. **Belum dijalankan pada Neo4j**.
- Jumlah node menurut jenis: {'Regulation': 7, 'Actor': 16, 'SPMLevel': 2, 'HealthService': 14, 'Norm': 41, 'Provision': 51}.

## Pembaruan audit terhadap anotasi lama
1. Klasifikasi jenis SPM (N14, N15, N19, N20) tidak diberi relasi kewajiban APPLIES_TO. Aktor asli disimpan untuk jejak audit. Pengelompokan layanan diganti dengan `SPMLevel`.
2. N06 diklasifikasikan sebagai penetapan urusan kesehatan, bukan kewajiban aktor tertentu.
3. N07a dan N07b dibedakan dari kategori pemerintah daerah biasa karena Pasal 18 UU 23/2014 menyebut 'Penyelenggara Pemerintahan Daerah'.
4. N03 dilengkapi konteks hubungan keuangan, pelayanan umum, serta pemanfaatan sumber daya.
5. Perbaikan URL konstitusi dan UU 23/2014 ke sumber resmi yang dapat dibaca.
6. Relasi D04 dan D05 diperjelas: di bagian Menimbang ada konteks penggantian regulasi sebelumnya; jangan menganggap penyebutan itu sebagai tautan penjabaran materi norma otomatis.
7. Semua E2/E3 ditandai sebagai hubungan kandidat; hubungan semantik **bukan bukti konflik norma**.

## Lintasan studi kasus (candidate reasoning paths)
- **A_HAK_IBU_HAMIL**: N04 -> S07 -> N10 -> N18 -> N20 -> L03. Bukti: E3 / E1 / E3 / E2 / E1. **Status: demonstrasi jalur, belum tervalidasi ahli hukum.**
- **B_HAK_KLB_PROV**: N04 -> S07 -> N10 -> N18 -> N19 -> L02. Bukti: E3 / E1 / E3 / E2 / E1. **Status: demonstrasi jalur, belum tervalidasi ahli hukum.**
- **C_OTONOMI_IBU_HAMIL**: N01 -> N06 -> N07a -> N07b -> N13 -> N18 -> N20 -> L03. Bukti: E3 / E2 / E2 / E2 / E2 / E2 / E1. **Status: demonstrasi jalur, belum tervalidasi ahli hukum.**

**Interpretasi:** Setiap jalur memuat sedikitnya satu relasi E2/E3. Karena itu tidak boleh dinyatakan sebagai rantai penjabaran yang telah diputuskan secara hukum. Jalur ini hanya menunjukkan kemampuan graf memunculkan kandidat argumentasi yang dapat dilacak sumbernya.

## Hal yang belum diuji
- Tidak ada pengukuran precision, recall, F1, MRR atau tingkat keberhasilan retrieval: tidak ada prediksi otomatis berpasangan dengan gold standard anotasi independen.
- Belum ada penilaian ahli hukum terhadap E2/E3.
- Belum ada bukti konflik, disharmoni, atau tumpang tindih kewenangan yang sah secara yuridis.
- Belum ada deployment Neo4j; skrip `.cypher` untuk diimpor pada instance Neo4j.

## Sumber resmi (tautan langsung)
- R01 — UUD NRI Tahun 1945 dalam satu naskah: https://jdih.dpr.go.id/index/uu1945
- R02 — UU No. 23 Tahun 2014 tentang Pemerintahan Daerah: https://jdih.pkp.go.id/produk-hukum/file/uu-nomor-23-tahun-2014.pdf
- R03 — UU No. 17 Tahun 2023 tentang Kesehatan: https://p2.kemkes.go.id/wp-content/uploads/2024/08/Undang-undang-Republik-Indonesia-Nomor-17-Tahun-2023-tentang-Kesehatan.pdf
- R04 — PP No. 2 Tahun 2018 tentang Standar Pelayanan Minimal: https://www.peraturan.go.id/files/pp2-2018bt.pdf
- R05 — Permendagri No. 59 Tahun 2021 tentang Penerapan SPM: https://peraturan.go.id/files/bn1419-2021.pdf
- R06 — Permenkes No. 6 Tahun 2024 tentang Standar Teknis Pemenuhan SPM Kesehatan: https://www.peraturan.go.id/files/permenkes-no-6-tahun-2024.pdf
- R07 — Perpres No. 13 Tahun 2026 tentang Pengelolaan Kesehatan: https://jdih.kemkes.go.id/storage/documents/pdfs/2026perpres013.pdf

## Penggunaan dataset
1. Buka workbook sheet `MULAI_V2`, `Audit_V2`, `Norma_Aktif_V2` dan `Relasi_Uji_V2`.
2. Review klasifikasi aktor / modalitas, lalu validasi E2/E3 bersama ahli hukum.
3. Untuk Neo4j 5+, jalankan `seed_neo4j_v2.cypher` pada basis data kosong (jangan menjalankan skrip versi awal bersamaan).
4. Untuk analisis lokal, buka `rkg_spm_v2.graphml` dengan Gephi atau networkx.
5. Hasil dalam `metrics.json` hanya metriks struktur, bukan kinerja retrieval maupun keabsahan hukum.

## Ablasi keterhubungan menurut tingkat bukti
Pengujian tiga pertanyaan terarah berikut dijalankan secara nyata pada graf lokal. Hasilnya: **0 dari 3 jalur** ditemukan pada E1 saja, **0 dari 3** ditemukan pada E1+E2, dan **3 dari 3** ditemukan ketika E3 diizinkan. Karena E3 bersifat interpretatif, hasil keterhubungan **bukan bukti kebenaran hukum**.

| Kasus | E1 | E1+E2 | E1+E2+E3 |
|---|---|---|---|
| A_HAK_IBU_HAMIL | TIDAK | TIDAK | YA |
| B_HAK_KLB_PROV | TIDAK | TIDAK | YA |
| C_OTONOMI_IBU_HAMIL | TIDAK | TIDAK | YA |

**Implikasi untuk naskah:** Wajib dibedakan antara (a) kewajiban SPM yang dapat dikutip secara langsung dari peraturan, dan (b) rantai argumentasi dari UUD ke ketentuan teknis yang memerlukan penafsiran. Jangan melaporkan 3/3 sebagai akurasi ataupun nilai recall.