# Status pekerjaan penelitian — 24 November 2026

## Telah ada dalam penelitian per 19 November 2026

1. Workbook anotasi awal V1, kemudian audit dan pengembangan menjadi V2/V3.
2. Korpus tujuh dokumen; identifikasi 41 unit klausul/konsep norma; 14 jenis layanan SPM.
3. Graf terarah dibangun secara lokal di NetworkX, dengan 131 node dan 213 edge.
4. Audit terhadap 29 relasi kandidat: 7 E1, 16 E2, 6 E3.
5. Enam temuan awal normatif dan empat rekomendasi operasional untuk PPHN.
6. Tiga uji konektivitas terarah dan ablasi bukti E1, E1+E2, E1+E2+E3; semua jalur memerlukan E3.
7. Instrumen kuesioner validasi pakar E3 dan kode generator Google Forms telah disiapkan, **bukan bukti pengisian pakar**.

## Belum ada / tidak boleh diklaim

- Validasi oleh pakar hukum independen, keputusan review E2/E3, atau konsensus ahli.
- Penetapan definitif konflik, tumpang tindih, ketidaksinkronan, atau disharmoni kewenangan.
- Uji eksekusi di Neo4j atau replikasi pipeline lengkap berbasis dokumen asli.
- Uji precision, recall, F1, MRR, kualitas retriever, atau evaluasi hasil LLM.
- Data empiris capaian SPM pemerintah daerah; keberhasilan penerapan layanan.
- Naskah DOCX final siap submit.

## Status pemulihan arsip

- **Tersedia sebagai teks/CSV:** laporan V2 & V3, GraphML V2 (XML utuh hasil penyambungan), file Cypher awal, seluruh sheet workbook V1/V2/V3 dalam CSV, teks kuesioner, dan Apps Script.
- **Belum tersalin dalam format aslinya:** workbook `.xlsx`, kuesioner `.docx`, paket `.zip`, dan `seed_neo4j_v2.cypher` yang hanya disebut di dalam paket yang tidak dapat diakses sebagai ZIP.
- File GraphML telah **diperiksa secara programatis** (bukan sekadar menyalin angka dari laporan). CSV berasal dari tampilan teks terindeks Library, sehingga data harus dicocokkan kembali jika format workbook asli menjadi sumber otoritatif.

## Prioritas menuju submission

1. Cek perubahan/status regulasi dan akurasi kutipan pasal/ayat pada naskah primer.
2. Lakukan review pakar terhadap 22 relasi E2/E3 bila akan membuat klaim normatif dari lintasan-lintasan tersebut.
3. Bedakan bukti normatif, temuan empiris dan usulan PPHN.
4. Susun makalah anonim 3.000–5.000 kata sesuai pedoman KONAS.
5. Pastikan hasil penelitian tidak dipublikasikan lebih dahulu dengan membuka repo kepada publik.
