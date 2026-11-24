# Audit Relasi dan Matriks Temuan RKG SPM Kesehatan — Versi 3

**Per 19 November 2026.** Laporan ini adalah pemeriksaan tekstual dan audit metodologis atas anotasi, **bukan** pendapat hukum oleh ahli independen.

## Ringkasan
- Audit terhadap 29 relasi: **7 E1, 16 E2, 6 E3**.
- Laporan menjaga 41 unit anotasi dan graf NetworkX V2 (131 node, 213 edge); **tidak** mengklaim penambahan graf baru atau pengujian Neo4j.
- Relasi E2 memiliki korespondensi/dukungan teks, tetapi bukan putusan hukum; E3 berupa hubungan interpretatif yang harus diuji pakar.
- Uji konektivitas berdasarkan tingkat bukti diulangi secara lokal menggunakan GraphML V2.

## Matriks temuan awal
- **T01** — SPM adalah instrumen pelaksanaan urusan pelayanan dasar di daerah (DIDUKUNG_TEKS). **Batas:** SPM telah terpenuhi atau efektivitas layanan terjamin
- **T02** — Jenis SPM Kesehatan berbeda menurut tingkat pemerintahan (DIDUKUNG_TEKS). **Batas:** Pusat atau provinsi sama sekali tidak berperan dalam layanan kabupaten/kota
- **T03** — Penerapan SPM dan pemenuhan mutu merupakan kewajiban yang dibedakan (DIDUKUNG_TEKS). **Batas:** Kewajiban pemenuhan mutu berarti capaian target sudah 100%
- **T04** — Penerapan SPM memerlukan pendataan, perencanaan, pelaksanaan dan pelaporan (DIDUKUNG_TEKS). **Batas:** Integrasi informasi di lapangan telah berjalan baik
- **T05** — Hubungan hak konstitusional dengan jenis pelayanan SPM merupakan penalaran hukum lintas tingkat (INTERPRETATIF_BUTUH_PAKAR). **Batas:** Ada delegasi langsung UUD ke jenis pelayanan atau konflik kewenangan
- **T06** — Pengelolaan kesehatan hingga desa tidak identik dengan kewajiban menerapkan SPM (DIDUKUNG_PERBANDINGAN_TEKSTUAL). **Batas:** Pemerintah desa diwajibkan Permenkes 6/2024 menerapkan SPM Kesehatan

## Bukti formal yang relatif kuat (pada level regulasi)
1. **F01:** UU 23/2014 Pasal 18 ayat (3) memberi dasar pengaturan SPM melalui PP; PP 2/2018 menyebutnya dalam bagian Menimbang.
2. **F02:** PP 2/2018 Pasal 6 ayat (6) menyerahkan standar teknis kesehatan ke peraturan menteri; Permenkes 6/2024 mengacu melalui konteks pembaruannya dalam Menimbang.
3. **F03:** PP 2/2018 Pasal 16 memberi dasar pengaturan penerapan SPM; Permendagri 59/2021 menjelaskan penggantian Permendagri sebelumnya dalam Menimbang dan memasukkan PP 2/2018 pada Mengingat.

**Penting:** bukti formal di atas tidak berarti hak konstitusional pada Pasal 28H telah secara langsung dijabarkan ke tiap jenis pelayanan SPM. Itu adalah rantai argumentasi berbeda yang memerlukan penilaian hukum.

## Audit 29 relasi
| ID | E | Klasifikasi hasil audit | Batas dan tindakan |
|---|---|---|---|
| K01 | E3 | INTERPRETASI_KONSTITUSIONAL | Pertahankan hanya sebagai KONTEKS_KONSTITUSIONAL; minta validasi pakar. |
| K02 | E3 | INTERPRETASI_KONSTITUSIONAL | Tambahkan penghubung Lampiran UU 23/2014 sebelum menyimpulkan pembagian kewenangan. |
| K03 | E3 | INTERPRETASI_HAK_KEWAJIBAN | Nyatakan relasi KONTEKS_HAK, bukan delegasi langsung; minta pakar. |
| K04 | E3 | INTERPRETASI_TANGGUNG_JAWAB | Bedakan konsepsi fasilitas dari penyelenggaraan upaya; minta pakar. |
| K05 | E2 | DIDUKUNG_DUA_PASAL | Pertahankan sebagai SCOPE_MATCH; catat status pengaturan lebih lanjut. |
| K06 | E2 | DIDUKUNG_DUA_PASAL | Gunakan IMPLEMENTATION_CONTEXT, bukan EXPLICIT_REFERENCE. |
| K07 | E2 | DIDUKUNG_DELEGASI_SEKTOR | Tambahkan link formal dokumenter terpisah; jangan menaikkan E2 normatif menjadi E1. |
| K08 | E2 | PERLU_PEMBATASAN_KONSEP | Batasi sebagai KOORDINASI_STANDAR; hindari relasi SAME_AS. |
| K09 | E2 | PADANAN_KLASIFIKASI_TEKSTUAL | Pertahankan sebagai CORRESPONDS_TO dengan E2. |
| K10 | E2 | PADANAN_KLASIFIKASI_TEKSTUAL | Pertahankan sebagai CORRESPONDS_TO dengan E2; hindari klaim eksklusivitas. |
| K11 | E1 | RUJUKAN_TEKSTUAL | E1 dapat digunakan hanya sebagai rujukan intra-dokumen. |
| K12 | E1 | RUJUKAN_TEKSTUAL | E1 untuk mekanisme normatif, bukan implementasi empiris. |
| K13 | E1 | RUJUKAN_TEKSTUAL | E1 rujukan, buat indikator implementasi jika ada data lapangan. |
| K14 | E2 | DIDUKUNG_DUA_AYAT | Pertahankan 2 norma dan jenis relasi COMPLEMENTS. |
| K15 | E2 | DIDUKUNG_KLASIFIKASI | Relasi kombinasi kewajiban + lingkup SPM, bukan EXCLUSIVE_DUTY. |
| K16 | E2 | DIDUKUNG_KLASIFIKASI | Gunakan OBLIGATION_SCOPE dan catat penerapan menurut level. |
| K17 | E1 | RUJUKAN_TEKSTUAL | E1 rujukan; pisahkan aktor pelapor, penerima, sistem. |
| K18 | E1 | RUJUKAN_TEKSTUAL | E1; jangan menambahkan desa sebagai aktor Pasal 22. |
| K19 | E3 | INTERPRETASI_UMUM_KHUSUS | Batasi pada RELATED_CONTEXT; verifikasi konsekuensi hukum dengan pakar. |
| K20 | E2 | DIDUKUNG_DELEGASI_TEKNIS | Catat formal basis di tingkat dokumen (Menimbang) terpisah dari korespondensi E2. |
| K21 | E2 | DIDUKUNG_DELEGASI_PENERAPAN | Pisahkan relasi formal dokumen E1 dan relevansi substansi E2. |
| K22 | E2 | DIDUKUNG_KONTEKS | Gunakan COMPLEMENTS; bila klaim dampak gunakan data empiris. |
| K23 | E2 | DIDUKUNG_DUA_AYAT | Pertahankan E2 sebagai koherensi sistematik. |
| K24 | E2 | DIDUKUNG_KLASIFIKASI | Pertahankan E2, batas pada cakupan SPM. |
| X01 | E1 | RUJUKAN_TEKSTUAL | E1 untuk relasi ayat saja. |
| X02 | E1 | RUJUKAN_TEKSTUAL | E1 untuk rujukan ayat saja. |
| X03 | E3 | INTERPRETASI_UMUM_KHUSUS | Prioritas sangat tinggi untuk validasi ahli; jangan menyebutnya delegasi langsung. |
| X04 | E2 | DIDUKUNG_DUA_AYAT | Pertahankan E2 dan jelaskan konteks internal pasal. |
| X05 | E2 | DIDUKUNG_UMUM_KHUSUS | Gunakan IMPLEMENTATION_CONTEXT, status E2. |

## Uji sensitivitas keterhubungan
| Skenario | E1 | E1+E2 | E1+E2+E3 |
|---|---|---|---|
| A_HAK_IBU_HAMIL | Tidak | Tidak | Ya |
| B_HAK_KLB_PROV | Tidak | Tidak | Ya |
| C_OTONOMI_IBU_HAMIL | Tidak | Tidak | Ya |

Ketiga skenario masih memerlukan sedikitnya satu relasi E3 untuk terhubung dalam graf terarah V2. Ini adalah **ketergantungan pemodelan**, bukan indikator validitas hukum atau keberhasilan retrieval.

## Rekomendasi operasional bagi PPHN (usulan, bukan hasil implementasi)
- **P01**: Susun matriks SPM berkode jenis layanan, tingkat daerah, norma kewajiban, dan lokasi pasal. Indikator tindak lanjut: Matriks berkala tersedia dan setiap entri tertaut ke pasal berlaku.
- **P02**: Bangun katalog informasi norma dan tautan antarketentuan dengan status berlakunya. Indikator tindak lanjut: Provenance norma, perubahan, dan penanggung jawab terverifikasi.
- **P03**: Tetapkan protokol review ahli, tingkat bukti, dan audit jejak sumber untuk analisis RKG. Indikator tindak lanjut: Proporsi relasi E2/E3 yang ditinjau dan disetujui/ditolak pakar.
- **P04**: Kaitkan inventaris norma dengan indikator capaian SPM dan data resmi daerah yang terverifikasi. Indikator tindak lanjut: Ketersediaan data capaian per jenis layanan dan jejak pembaruan.

## Batasan dan tindakan yang masih dibutuhkan
- 22 relasi E2/E3 memerlukan penelaahan ahli; gunakan sheet Form_Review_Pakar dan catat keputusan serta argumentasinya.
- Belum ada pengujian precision, recall, F1, MRR, atau validasi ahli independen.
- Belum tersedia data capaian lapangan SPM untuk menilai implementasi atau efektivitas layanan.
- Klasifikasi jenis SPM provinsi/kabupaten tidak menunjukkan kewenangan eksklusif seluruh sektor kesehatan.
- Peraturan tahun 2026 berfungsi sebagai konteks terbaru; teks asli dan status perubahan harus diverifikasi lagi sebelum pengiriman naskah.

## Rujukan sumber hukum
- R01: https://jdih.dpr.go.id/index/uu1945
- R02: https://jdih.kemnaker.go.id/asset/data_puu/UU_23_TAHUN_2014.PDF
- R03: https://p2.kemkes.go.id/wp-content/uploads/2024/08/Undang-undang-Republik-Indonesia-Nomor-17-Tahun-2023-tentang-Kesehatan.pdf
- R04: https://www.peraturan.go.id/files/pp2-2018bt.pdf
- R05: https://www.peraturan.go.id/files/bn1419-2021.pdf
- R06: https://www.peraturan.go.id/files/permenkes-no-6-tahun-2024.pdf
- R07: https://jdih.kemkes.go.id/documents/peraturan-presiden-nomor-13-tahun-2026