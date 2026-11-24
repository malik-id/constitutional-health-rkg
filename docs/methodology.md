# Metode RKG dan klasifikasi relasi

**Jenis penelitian:** kajian normatif berbantuan pengolahan data/struktur graf. Dokumen hukum diolah menjadi unit pengamatan dan hubungan yang dapat ditelusuri. Model graf berfungsi untuk mendukung analisis, bukan sebagai mesin penetapan tafsir hukum.

## Alur data dan artefak

1. **Inventaris dokumen:** tujuh regulasi dicatat di `Korpus_Aktif_V2.csv`, beserta tautan sumber dan keterangan status.
2. **Anotasi unit norma:** sebanyak 41 unit klausul/konsep dikodekan; satu unit tidak selalu merupakan satu norma atom terkecil.
3. **Entitas graf:** Regulation, Provision, Norm, Actor, SPMLevel, HealthService; penghubung struktural dan relasi antarnorma dibedakan.
4. **Konstruksi graf lokal:** NetworkX membentuk 131 node dan 213 edge; hasil dipulihkan dalam `data/graph/rkg_spm_v2.graphml`.
5. **Audit kandidat relasi:** sebanyak 29 relasi antarunit diklasifikasikan ke tingkat bukti E1/E2/E3, dengan catatan pembatas dan sumber pasal.
6. **Ablasi keterhubungan:** periksa jalur pada graf terarah dengan filter E1, E1+E2, lalu E1+E2+E3 untuk tiga pasangan simpul yang ditentukan sebelum evaluasi.
7. **Matriks temuan:** simpulan sementara dan rekomendasi ditautkan ke sumber hukum, serta diklasifikasikan menurut kebutuhan konfirmasi ahli.

## Representasi graf

- `Regulation`: identitas dokumen dan sumber.
- `Provision`: lokasi ketentuan (pasal/ayat) yang dirujuk.
- `Norm`: parafrasa klausa dan klasifikasi deontik atau fungsional.
- `Actor`: negara, pemerintah pusat/daerah, pelaksana, pemegang hak; kategori aktor dibedakan.
- `SPMLevel`: provinsi dan kabupaten/kota.
- `HealthService`: kategori layanan SPM, bukan otomatis subjek kewajiban.

Hubungan seperti `HAS_PROVISION`, `STATES_NORM`, `APPLIES_TO`, `HAS_SERVICE` dan `CLASSIFIES_*` digunakan untuk pemodelan struktural. Kandidat hubungan normatif diberi prefiks `RELATED_NORM_` dan atribut `evidence_level`.

**Jangan menafsirkan semua edge berstatus E1 sebagai 7 relasi antarnorma E1.** Sebagian besar E1 pada GraphML adalah tautan struktural; hanya edge dengan relasi berawalan `RELATED_NORM_` termasuk 29 relasi yang diaudit.

## Kekuatan bukti

- **E1 — rujukan langsung:** ditemukan penautan eksplisit dalam naskah atau mekanisme dokumenter yang tercatat; tidak otomatis melahirkan kesimpulan mengenai dampak empiris.
- **E2 — hubungan antarunit yang didukung teks:** pola korespondensi, cakupan atau urutan kewajiban yang memerlukan pembacaan sistematis.
- **E3 — penalaran interpretatif:** penghubung lintas level seperti hak konstitusional menuju standar layanan; memerlukan penilaian pakar.

## Uji ulang dan batas inferensi

Jalankan `python scripts/ablation.py`. Metode menggunakan jalur terpendek pada subgraf terarah yang memiliki edge dengan `evidence_level` yang diizinkan. Keterhubungan hanya menunjukkan bahwa graph traversal dapat mencapai target; ia **bukan** validitas hukum atau uji kinerja pencarian berbasis pertanyaan alami.

Belum ada proses standar emas hasil review independen, data lapangan, maupun evaluasi statistik efektivitas kebijakan. Usulan rekomendasi belum diimplementasikan.
