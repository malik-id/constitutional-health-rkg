# Pembuatan repositori GitHub private

Akun GitHub yang terhubung dalam percakapan: `malik-id`. Pada sesi penyiapan ini konektor dapat membuat/menyunting file di repositori yang telah ada, tetapi tidak dapat membuat repositori baru.

## Cara yang disarankan

1. Masuk ke https://github.com/new menggunakan akun yang benar.
2. **Owner:** `malik-id`. **Repository name:** `constitutional-health-rkg`.
3. **Visibility:** `Private` (jangan `Public`).
4. **Centang Add a README file** agar branch `main` tersedia untuk proses unggah melalui konektor; jangan pilih `.gitignore` atau `license` bawaan. README awal akan diganti dengan README penelitian dari paket ini.
5. Tekan **Create repository**.
6. Kembali ke percakapan dan kirim URL `https://github.com/malik-id/constitutional-health-rkg`. Setelah repositori ada, berkas dapat diunggah menggunakan konektor GitHub dengan hak akses yang sesuai.

## Cara manual melalui Git jika diperlukan

Sesudah repositori ber-README dibuat, **clone** repositorinya terlebih dahulu, salin semua isi paket (termasuk `README.md`) ke dalam folder clone, kemudian dari folder clone jalankan:

```bash
git add .
git commit -m "Import private research archive: MPR 2026 RKG SPM kesehatan"
git push origin main
```

Jika belum punya salinan lokal, perintah awalnya:

```bash
git clone https://github.com/malik-id/constitutional-health-rkg.git
```

Jangan kirim **personal access token**, kata sandi, atau respons kuesioner beridentitas ke dalam repositori/percakapan.

## Pemeriksaan setelah unggah

- Tanda **Private** muncul di header repo.
- `README.md` ter-render dan folder `data`, `reports`, `docs` terlihat.
- Periksa bahwa tidak ada data pakar/identitas orang yang tidak diizinkan.
- Hindari menjadikan repositori publik sebelum ketentuan publikasi jelas.
