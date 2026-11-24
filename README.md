# Constitutional Health SPM — Regulatory Knowledge Graph

> **Repositori penelitian privat (pra-submisi).** Konten ini tidak dimaksudkan sebagai opini hukum final atau bukti bahwa terjadi konflik kewenangan.

**Judul penelitian:**  
**Analisis Hubungan Norma Konstitusional dan Pembagian Kewenangan dalam Standar Pelayanan Minimal Kesehatan Berbasis Regulatory Knowledge Graph**

**Konteks:** Call for Papers Konferensi Nasional Konstitusi MPR RI 2026, subtema *Desentralisasi, Otonomi Daerah, Pemerintahan Daerah, dan Desa*.  
**Snapshot pekerjaan penelitian:** 19 November 2026. **Penyiapan repositori:** 24 November 2026.  
**Status:** audit tekstual V3 tersedia; validasi ahli hukum dan pengujian implementasi Neo4j **belum** dilakukan.

## Gambaran penelitian

Penelitian menggunakan pendekatan **Regulatory Knowledge Graph (RKG)** untuk memodelkan hubungan antarketentuan konstitusi, pengaturan pembagian urusan pemerintahan, dan Standar Pelayanan Minimal (SPM) kesehatan. Graf digunakan untuk membantu pemeriksaan hubungan norma yang memiliki bukti rujukan tekstual maupun hubungan interpretatif **yang masih memerlukan validasi**.

Cakupan kajian terdiri dari UUD NRI Tahun 1945, UU 23/2014, UU 17/2023, PP 2/2018, Permendagri 59/2021, Permenkes 6/2024, dan Perpres 13/2026 sebagai konteks pendukung. Periksa kembali versi, perubahan, dan status hukum naskah primer sebelum finalisasi makalah. Daftar URL di `data/annotations/v3/Korpus_Aktif_V2.csv` berasal dari snapshot penelitian, bukan hasil pemeriksaan langsung pada hari unggah.

## Status hasil yang terverifikasi dari artefak

| Artefak / pengukuran | Status |
|---|---|
| Korpus regulasi | 7 dokumen (6 inti, 1 pendukung) |
| Unit klausul/konsep norma yang dianotasi | 41 |
| Jenis pelayanan SPM dalam model | 14 (2 provinsi; 12 kabupaten/kota) |
| Graf NetworkX V2 | **131 node, 213 edge**, terverifikasi dari GraphML |
| Relasi antarnorma kandidat yang diaudit | **29** (E1=7, E2=16, E3=6) |
| Temuan normatif awal dalam V3 | 6 temuan; bukan hasil pembuktian implementasi lapangan |
| Usulan rekomendasi operasional PPHN | 4 rekomendasi |
| Ablasi konektivitas 3 kasus | E1: 0/3; E1+E2: 0/3; E1+E2+E3: 3/3 |
| Validasi independen oleh pakar hukum | **Belum dilakukan** |
| Uji pada instance Neo4j | **Belum dilakukan** |
| Benchmark kualitas retrieval/LLM atau data capaian SPM | **Belum dilakukan** |

**Peringatan interpretasi:** Skor 3/3 di atas hanya menyatakan **keterhubungan tiga pasangan simpul dalam graf terarah ketika relasi interpretatif E3 diizinkan**. Ini **bukan accuracy, precision, recall, ukuran kesesuaian hukum, atau bukti disharmoni kewenangan**.

## Susunan repositori

```text
constitutional-health-rkg/
├── data/
│   ├── graph/rkg_spm_v2.graphml       # Graf terarah V2 hasil pemulihan teks
│   └── annotations/{v1,v2,v3}/       # 57 sheet CSV hasil ekstraksi dari workbook
├── scripts/
│   ├── inspect_graph.py              # Statistik graf dan klasifikasi bukti
│   ├── ablation.py                   # Uji ulang 3 skenario keterhubungan
│   └── export_neo4j_csv.py           # Utilitas baru, belum diuji di Neo4j
├── cypher/load_graphml_csv.cypher    # Contoh import generik, belum dijalankan
├── tests/test_graph.py               # Pengujian struktur dan ablasi
├── reports/                          # Laporan V2 & audit normatif V3
├── validation/                       # Instrumen E3 dan Apps Script Forms
├── archive/v1/                       # Skrip Cypher awal (historis, tidak untuk V2)
├── docs/                             # Metode, temuan, batasan, panduan submission
├── references/                       # TOR & sistematika KONAS MPR RI 2026
├── results/graph_summary.json        # Ringkasan hasil audit struktur graf
└── PROVENANCE.json                    # Jejak pemulihan sumber & batas akses
```

## Menjalankan verifikasi lokal

```bash
python -m venv .venv
# Aktifkan virtual environment sesuai OS, lalu:
python -m pip install -r requirements.txt
python scripts/inspect_graph.py
python scripts/ablation.py
python -m unittest discover -s tests -v
```

Untuk menyiapkan CSV graf bagi Neo4j (opsional, **belum teruji secara end-to-end**):

```bash
python scripts/export_neo4j_csv.py --output exports/neo4j
```

## Tingkat bukti relasi

- **E1:** rujukan tekstual/dokumenter langsung yang tercatat; tetap perlu pemeriksaan ketepatan kutipan dan status hukum.
- **E2:** korespondensi atau hubungan antarunit yang didukung perbandingan teks; bukan putusan konflik hukum.
- **E3:** hubungan interpretatif antarnorma; wajib ditinjau pakar sebelum dipakai sebagai simpulan normatif.

**Ke-22 hubungan E2/E3 masih kandidat untuk penelaahan ahli.** Instrumen review tersedia di `data/annotations/v3/Form_Review_Pakar.csv` dan `validation/`. Data respon pakar yang berisi identitas atau informasi pribadi **tidak boleh di-commit**.

## Provenance dan kelengkapan

Arsip penelitian sebelumnya tersedia di Library, tetapi dalam sesi penyiapan ini berkas biner XLSX/DOCX/ZIP lama tidak dapat diakses langsung. Data tabular dalam repositori adalah **ekstraksi teks per sheet menjadi CSV**; format workbook, formula dan gaya visual asli tidak otomatis ikut terbawa. File GraphML dipulihkan dari empat bagian teks dan telah lolos pemeriksaan parser NetworkX serta ukuran graf. Laporan dan skrip teks berasal dari materi penelitian lama; utilitas Python di `scripts/` dibuat untuk audit ulang saat penyiapan repositori.

Lihat `PROVENANCE.json`, `docs/research-status.md`, dan `data/annotations/EXTRACTION_MANIFEST.json` sebelum mengutip angka atau mengolah workbook. Tidak ada file bernama `seed_neo4j_v2.cypher` yang berhasil dipulihkan dari paket biner lama; `archive/v1/seed_rkg_spm.cypher` adalah versi historis, **jangan digunakan untuk mengklaim pengujian V2 pada Neo4j**.

## Catatan publikasi dan kerahasiaan

Repositori ditujukan untuk **private** sampai aturan konferensi/publikasi dan kerahasiaan instrumen dipastikan. Dokumen resmi KONAS dalam `references/` adalah bahan persyaratan, bukan regulasi sampel RKG. Makalah anonim untuk *blind review* harus disiapkan terpisah dalam format DOCX dengan identitas penulis di berkas tersendiri. Periksa tenggat dan ketentuan akhir pada kanal resmi.

**Penting:** Isi analisis hukum dan relevansi PPHN tetap memerlukan penilaian ilmiah serta verifikasi primer sebelum diajukan.
