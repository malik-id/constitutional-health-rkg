/**
 * Pembuat Google Forms: Validasi Pakar Relasi E3 - RKG SPM Kesehatan
 * Dasar isi: Kuesioner_Validasi_Pakar_Relasi_E3.docx dan
 *            Form_Wawancara_SemiTerstruktur_Relasi_E3.docx
 *
 * Cara pakai:
 * 1. Buka https://script.google.com > New project.
 * 2. Tempel seluruh kode ini pada file Code.gs.
 * 3. Pilih fungsi buatDuaGoogleFormE3 lalu klik Run, beri izin.
 * 4. Buka Execution log untuk memperoleh tautan EDIT dan RESPONDEN.
 *
 * Google Forms diciptakan di akun Google yang menjalankan skrip.
 * Respons otomatis diarahkan ke dua Google Sheets yang juga dibuat.
 * Menjalankan lagi skrip yang sama menggunakan kembali formulir yang sudah
 * dibuat, selama User Properties proyek Apps Script tidak dihapus.
 */

const JUDUL_PENELITIAN =
  'Analisis Hubungan Norma Konstitusional dan Pembagian Kewenangan dalam ' +
  'Standar Pelayanan Minimal Kesehatan Berbasis Regulatory Knowledge Graph';

const TINGKAT_NILAI = [
  '1 = Tidak tepat/tidak didukung',
  '2 = Perlu revisi substansial',
  '3 = Cukup tepat dengan revisi',
  '4 = Tepat dengan dukungan memadai',
  'TD = Tidak dapat dinilai'
];

const RELASI_E3 = [
  {
    id: 'K01', judul: 'Prinsip otonomi daerah dan urusan kesehatan',
    asal: 'N01 - UUD NRI Tahun 1945 Pasal 18 ayat (2)',
    tujuan: 'N06 - UU No. 23 Tahun 2014 Pasal 12 ayat (1) huruf b',
    label: 'KERANGKA_OTONOMI',
    parafrasa: 'UUD mengatur otonomi; UU menggolongkan kesehatan sebagai urusan wajib pelayanan dasar.',
    batas: 'Tidak ada rujukan langsung dari pasal UUD kepada pasal UU yang diuji.',
    utama: 'Sejauh mana asas otonomi daerah pada Pasal 18 ayat (2) dapat menjadi kerangka penafsiran bagi pengaturan kesehatan sebagai urusan pemerintahan wajib yang berkaitan dengan pelayanan dasar?',
    pendalaman: [
      'Apakah relasi ini cukup disebut konteks konstitusional atau dapat dikategorikan sebagai penjabaran norma?',
      'Ketentuan lain apa yang perlu ditambahkan agar batas kewenangan pusat-daerah tidak disederhanakan?'
    ]
  },
  {
    id: 'K02', judul: 'Hubungan kewenangan pusat-daerah dan klasifikasi urusan kesehatan',
    asal: 'N02 - UUD NRI Tahun 1945 Pasal 18A ayat (1)',
    tujuan: 'N06 - UU No. 23 Tahun 2014 Pasal 12 ayat (1) huruf b',
    label: 'KONTEKS_PEMBAGIAN_KEWENANGAN',
    parafrasa: 'UUD mengatur hubungan kewenangan pusat-daerah; UU mengklasifikasikan kesehatan sebagai urusan wajib.',
    batas: 'Pasal 12 mengklasifikasikan urusan; belum secara mandiri merinci kewenangan SPM tiap tingkat pemerintahan.',
    utama: 'Apakah pengaturan kesehatan sebagai urusan wajib pelayanan dasar cukup merepresentasikan hubungan kewenangan pusat-daerah menurut Pasal 18A ayat (1)?',
    pendalaman: [
      'Perlukah menggunakan lampiran pembagian urusan pemerintahan dan ketentuan urusan konkuren sebagai penghubung?',
      'Bagaimana membedakan klasifikasi urusan dengan alokasi kewenangan konkret tiap tingkat pemerintahan?'
    ]
  },
  {
    id: 'K03', judul: 'Hak pelayanan kesehatan dan tanggung jawab penyelenggaraan upaya kesehatan',
    asal: 'N04 - UUD NRI Tahun 1945 Pasal 28H ayat (1)',
    tujuan: 'S07 - UU No. 17 Tahun 2023 Pasal 19 ayat (1)',
    label: 'HAK_DAN_TANGGUNG_JAWAB',
    parafrasa: 'UUD memuat hak memperoleh pelayanan kesehatan; UU memuat tanggung jawab penyelenggaraan upaya kesehatan.',
    batas: 'Bagian Mengingat UU mencantumkan pasal UUD, tetapi hubungan antarunit norma tetap membutuhkan argumentasi.',
    utama: 'Bagaimana hubungan antara hak konstitusional memperoleh pelayanan kesehatan dan tanggung jawab pemerintah menyelenggarakan upaya kesehatan perseorangan serta masyarakat?',
    pendalaman: [
      'Apakah relasi yang tepat berupa konteks hak konstitusional, pelaksanaan kewajiban negara, atau penjabaran normatif?',
      'Apakah hak atas pelayanan kesehatan dan seluruh upaya kesehatan merupakan objek hukum yang sama?',
      'Apakah dasar hukum pada bagian Mengingat UU cukup untuk membuat relasi substansial antarpasal?'
    ]
  },
  {
    id: 'K04', judul: 'Tanggung jawab negara atas fasilitas dan penyelenggaraan upaya kesehatan',
    asal: 'N05 - UUD NRI Tahun 1945 Pasal 34 ayat (3)',
    tujuan: 'S07 - UU No. 17 Tahun 2023 Pasal 19 ayat (1)',
    label: 'PRINSIP_TANGGUNG_JAWAB_NEGARA',
    parafrasa: 'UUD memuat tanggung jawab menyediakan fasilitas pelayanan kesehatan; UU memuat tanggung jawab penyelenggaraan upaya kesehatan.',
    batas: 'Objek fasilitas pelayanan dan upaya kesehatan tidak identik secara tekstual.',
    utama: 'Bagaimana hubungan tanggung jawab negara menyediakan fasilitas pelayanan kesehatan yang layak dengan tanggung jawab pemerintah menyelenggarakan upaya kesehatan?',
    pendalaman: [
      'Apakah penyediaan fasilitas dan penyelenggaraan upaya kesehatan perlu direpresentasikan sebagai dua norma berbeda?',
      'Jenis relasi apa yang tepat tanpa menyamakan fasilitas dengan seluruh kegiatan kesehatan?'
    ]
  },
  {
    id: 'K19', judul: 'Pengelolaan kesehatan dan kewajiban menerapkan SPM',
    asal: 'N11a - Perpres No. 13 Tahun 2026 Pasal 21 ayat (1)',
    tujuan: 'N18 - Permenkes No. 6 Tahun 2024 Pasal 2 ayat (1)',
    label: 'UMUM_KE_KHUSUS_SPM',
    parafrasa: 'Perpres memuat pengelolaan kesehatan pada beberapa tingkat pemerintahan termasuk desa; Permenkes mewajibkan penerapan SPM oleh provinsi serta kabupaten/kota.',
    batas: 'Penyebutan desa dalam pengelolaan kesehatan tidak otomatis memperluas subjek kewajiban SPM.',
    utama: 'Apakah tanggung jawab pengelolaan kesehatan pada sejumlah tingkat pemerintahan dapat dihubungkan secara normatif dengan kewajiban penerapan SPM Kesehatan oleh pemerintah provinsi dan kabupaten/kota?',
    pendalaman: [
      'Apakah hubungan lebih tepat disebut konteks terkait daripada hubungan umum-khusus?',
      'Bagaimana menghindari kesimpulan bahwa desa mempunyai kewajiban menerapkan SPM hanya dari Perpres tersebut?',
      'Apakah aspek perubahan waktu dan kedudukan peraturan memengaruhi label relasi?'
    ]
  },
  {
    id: 'X03', judul: 'Fungsi pengelolaan program kesehatan daerah dan penerapan SPM',
    asal: 'N10 - UU No. 17 Tahun 2023 Pasal 19 ayat (3) huruf b',
    tujuan: 'N18 - Permenkes No. 6 Tahun 2024 Pasal 2 ayat (1)',
    label: 'UMUM_KE_KHUSUS_SPM',
    parafrasa: 'UU mengatur fungsi program kesehatan daerah; Permenkes mewajibkan penerapan SPM.',
    batas: 'Hubungan ini tidak boleh langsung diberi label delegasi; memerlukan penalaran hukum lintas peraturan.',
    utama: 'Dapatkah kewenangan perencanaan, pengelolaan, pemantauan, supervisi, dan evaluasi program kesehatan daerah menjadi penghubung yang relevan dengan kewajiban penerapan SPM Kesehatan?',
    pendalaman: [
      'Apakah penerapan SPM merupakan implementasi khusus fungsi program daerah atau hanya hal yang berkaitan?',
      'Ketentuan PP No. 2 Tahun 2018 atau UU No. 23 Tahun 2014 apa yang sebaiknya menjadi perantara?',
      'Apakah arah panah N10 menuju N18 tepat atau perlu diubah?'
    ]
  }
];

const LINTASAN = [
  {
    id: 'L1', judul: 'Hak atas kesehatan menuju SPM ibu hamil kabupaten/kota',
    jalur: 'N04 -> S07 -> N10 -> N18 -> N20 -> L03'
  },
  {
    id: 'L2', judul: 'Hak atas kesehatan menuju SPM KLB provinsi',
    jalur: 'N04 -> S07 -> N10 -> N18 -> N19 -> L02'
  },
  {
    id: 'L3', judul: 'Otonomi daerah menuju SPM ibu hamil',
    jalur: 'N01 -> N06 -> N07a -> N07b -> N13 -> N18 -> N20 -> L03'
  }
];

// Jalankan fungsi ini untuk membuat kedua formulir sekaligus.
function buatDuaGoogleFormE3() {
  buatKuesionerValidasiE3();
  buatFormWawancaraE3();
  Logger.log('Selesai. Gunakan tautan EDIT pada log untuk memeriksa formulir sebelum dibagikan.');
}

// Boleh dijalankan sendiri jika hanya membutuhkan kuesioner.
function buatKuesionerValidasiE3() {
  const props = PropertiesService.getUserProperties();
  let form;
  const existing = props.getProperty('FORM_KUESIONER_E3');
  if (existing) {
    form = FormApp.openById(existing);
    catatTautan_('KUESIONER (sudah dibuat)', form);
    return;
  }

  form = FormApp.create('Validasi Pakar RKG SPM Kesehatan - Kuesioner Relasi E3', true);
  setelanUmum_(form,
    'Instrumen penilaian independen oleh pakar.\n' +
    'Penelitian: ' + JUDUL_PENELITIAN + '\n\n' +
    'Enam relasi interpretatif E3 dinilai berdasarkan ketepatan hukum, makna norma, ' +
    'kecukupan dasar hukum, dan ketepatan representasi graf. ' +
    'Parafrasa bukan kutipan verbatim; periksa pasal resmi pada dokumen hukum yang dibagikan peneliti. ' +
    'Tidak ada jawaban yang diharapkan; relasi dapat diterima, diubah, ditolak, atau dinyatakan belum cukup bukti.'
  );
  tambahkanPersetujuan_(form);
  tambahProfil_(form);

  form.addSectionHeaderItem()
    .setTitle('Petunjuk skor')
    .setHelpText(TINGKAT_NILAI.join('\n') +
      '\nK1 = relevansi hukum; K2 = ketepatan makna dan aktor; ' +
      'K3 = kecukupan dasar hukum; K4 = ketepatan label dan arah relasi.');

  RELASI_E3.forEach(function (r, indeks) {
    form.addPageBreakItem()
      .setTitle('Bagian ' + (indeks + 2) + ' - Relasi ' + r.id)
      .setHelpText(r.judul);
    tambahDossier_(form, r);
    form.addParagraphTextItem()
      .setTitle('[' + r.id + '] Pandangan awal Anda mengenai pertanyaan pokok')
      .setHelpText(r.utama)
      .setRequired(false);

    form.addGridItem()
      .setTitle('[' + r.id + '] Penilaian empat kriteria')
      .setHelpText(TINGKAT_NILAI.join(' | '))
      .setRows([
        'K1 - Relevansi hubungan menurut hukum',
        'K2 - Ketepatan makna norma dan subjek hukum',
        'K3 - Kecukupan dasar hukum dan argumentasi',
        'K4 - Ketepatan label/arah relasi dalam RKG'
      ])
      .setColumns(['1', '2', '3', '4', 'TD'])
      .setRequired(true);

    form.addMultipleChoiceItem()
      .setTitle('[' + r.id + '] Jenis hubungan yang paling tepat')
      .setChoiceValues([
        'Konteks konstitusional',
        'Penjabaran normatif',
        'Hubungan umum-khusus',
        'Hubungan tematik saja',
        'Tidak ada hubungan yang cukup kuat'
      ])
      .showOtherOption(true)
      .setRequired(true);

    form.addMultipleChoiceItem()
      .setTitle('[' + r.id + '] Keputusan atas relasi')
      .setChoiceValues(['Terima', 'Revisi', 'Tolak', 'Bukti belum memadai'])
      .setRequired(true);

    form.addParagraphTextItem()
      .setTitle('[' + r.id + '] Argumentasi hukum dan pasal/ayat pendukung atau pengoreksi')
      .setRequired(true);

    form.addParagraphTextItem()
      .setTitle('[' + r.id + '] Usulan label relasi, arah panah, atau norma perantara')
      .setHelpText('Boleh dibiarkan kosong jika tidak diperlukan perubahan.')
      .setRequired(false);
  });

  form.addPageBreakItem().setTitle('Bagian akhir - Validasi tiga lintasan RKG');
  form.addSectionHeaderItem()
    .setTitle('Lintasan kandidat; bukan hubungan hukum langsung')
    .setHelpText('Nilai argumentasi hukum pada setiap lintasan sebagai satu rangkaian.');
  LINTASAN.forEach(function (l) {
    form.addMultipleChoiceItem()
      .setTitle(l.id + ' - ' + l.judul)
      .setHelpText(l.jalur)
      .setChoiceValues([
        'Argumentasi memadai',
        'Perlu node/relasi perantara',
        'Tidak memadai',
        'Tidak dapat dinilai'
      ])
      .setRequired(true);
    form.addParagraphTextItem()
      .setTitle(l.id + ' - Alasan / koreksi / norma perantara yang hilang')
      .setRequired(false);
  });

  form.addParagraphTextItem()
    .setTitle('Catatan umum tentang batas interpretasi, potensi bias, atau implikasi kebijakan')
    .setRequired(false);
  form.addMultipleChoiceItem()
    .setTitle('Apakah Anda bersedia dihubungi untuk klarifikasi lanjutan?')
    .setChoiceValues(['Ya', 'Tidak'])
    .setRequired(false);

  const hasil = SpreadsheetApp.create('Respons - Kuesioner Validasi E3 RKG SPM');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, hasil.getId());
  props.setProperty('FORM_KUESIONER_E3', form.getId());
  catatTautan_('KUESIONER', form, hasil.getUrl());
}

// Boleh dijalankan sendiri jika hanya membutuhkan formulir wawancara.
function buatFormWawancaraE3() {
  const props = PropertiesService.getUserProperties();
  let form;
  const existing = props.getProperty('FORM_WAWANCARA_E3');
  if (existing) {
    form = FormApp.openById(existing);
    catatTautan_('WAWANCARA (sudah dibuat)', form);
    return;
  }

  form = FormApp.create('Validasi Pakar RKG SPM Kesehatan - Catatan Wawancara E3', true);
  setelanUmum_(form,
    'Formulir pencatatan wawancara semi-terstruktur untuk peneliti/pewawancara.\n' +
    'Penelitian: ' + JUDUL_PENELITIAN + '\n\n' +
    'Enam relasi E3 ditanyakan kepada narasumber untuk memperoleh argumentasi dan revisi normatif. ' +
    'Isian dapat dilengkapi pewawancara berdasarkan persetujuan narasumber. ' +
    'Lampirkan dan baca dokumen hukum resmi sebelum wawancara.'
  );
  tambahkanPersetujuanWawancara_(form);
  form.addTextItem().setTitle('Kode pakar/narasumber (mis. P01)').setRequired(true);
  form.addTextItem().setTitle('Nama pewawancara').setRequired(true);
  form.addTextItem().setTitle('Bidang keahlian narasumber').setRequired(true);
  form.addTextItem().setTitle('Afiliasi/jabatan narasumber').setRequired(false);
  form.addDateItem().setTitle('Tanggal wawancara').setRequired(true);
  form.addMultipleChoiceItem()
    .setTitle('Apakah narasumber menyetujui perekaman audio?')
    .setChoiceValues(['Ya', 'Tidak', 'Tidak dilakukan perekaman'])
    .setRequired(true);

  RELASI_E3.forEach(function (r, indeks) {
    form.addPageBreakItem()
      .setTitle('Wawancara relasi ' + (indeks + 1) + '/6 - ' + r.id)
      .setHelpText(r.judul);
    tambahDossier_(form, r);
    form.addParagraphTextItem()
      .setTitle('[' + r.id + '] Jawaban dan argumentasi atas pertanyaan utama')
      .setHelpText(r.utama)
      .setRequired(false);
    r.pendalaman.forEach(function (q, i) {
      form.addParagraphTextItem()
        .setTitle('[' + r.id + '] Pendalaman ' + (i + 1))
        .setHelpText(q)
        .setRequired(false);
    });
    form.addParagraphTextItem()
      .setTitle('[' + r.id + '] Pasal/ayat dan literatur yang disebut narasumber')
      .setRequired(false);
    form.addMultipleChoiceItem()
      .setTitle('[' + r.id + '] Keputusan sementara narasumber')
      .setChoiceValues(['Terima', 'Revisi', 'Tolak', 'Bukti belum memadai'])
      .setRequired(false);
    form.addParagraphTextItem()
      .setTitle('[' + r.id + '] Usulan label, arah relasi, atau norma perantara')
      .setRequired(false);
  });

  form.addPageBreakItem().setTitle('Penilaian keseluruhan lintasan dan penutup');
  LINTASAN.forEach(function (l) {
    form.addParagraphTextItem()
      .setTitle(l.id + ' - Argumentasi dan koreksi lintasan ' + l.judul)
      .setHelpText(l.jalur + '\nLintasan merupakan hipotesis komputasional.')
      .setRequired(false);
  });
  form.addParagraphTextItem()
    .setTitle('Apakah ada hubungan normatif lain yang lebih relevan dari enam relasi yang diuji?')
    .setRequired(false);
  form.addParagraphTextItem()
    .setTitle('Bagaimana sebaiknya graf membedakan kewenangan, kewajiban SPM, dan tanggung jawab pelayanan?')
    .setRequired(false);
  form.addParagraphTextItem()
    .setTitle('Keterbatasan penting yang perlu dinyatakan dalam makalah dan rekomendasi kebijakan')
    .setRequired(false);
  form.addParagraphTextItem()
    .setTitle('Catatan tindak lanjut dan konfirmasi hasil wawancara')
    .setRequired(false);

  const hasil = SpreadsheetApp.create('Respons - Wawancara Pakar E3 RKG SPM');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, hasil.getId());
  props.setProperty('FORM_WAWANCARA_E3', form.getId());
  catatTautan_('WAWANCARA', form, hasil.getUrl());
}

function setelanUmum_(form, deskripsi) {
  form.setDescription(deskripsi);
  form.setProgressBar(true);
  form.setShowLinkToRespondAgain(false);
  form.setConfirmationMessage('Terima kasih. Data akan digunakan untuk analisis akademik sesuai persetujuan yang diberikan.');
}

function tambahkanPersetujuan_(form) {
  form.addSectionHeaderItem()
    .setTitle('Persetujuan partisipasi')
    .setHelpText('Partisipasi bersifat sukarela. Pendapat dipakai dalam analisis dengan kode pakar. ' +
      'Penyebutan nama memerlukan izin tersendiri. Memilih Tidak akan mengakhiri formulir.');
  const persetujuan = form.addMultipleChoiceItem()
    .setTitle('Apakah Anda bersedia mengikuti penilaian dan mengizinkan penggunaan jawaban secara anonim?')
    .setRequired(true);
  const halamanProfil = form.addPageBreakItem().setTitle('Bagian 1 - Profil pakar');
  persetujuan.setChoices([
    persetujuan.createChoice('Ya, saya bersedia', halamanProfil),
    persetujuan.createChoice('Tidak bersedia', FormApp.PageNavigationType.SUBMIT)
  ]);
}

function tambahkanPersetujuanWawancara_(form) {
  form.addSectionHeaderItem()
    .setTitle('Persetujuan wawancara')
    .setHelpText('Pastikan persetujuan narasumber telah diperoleh sebelum pencatatan. ' +
      'Jika belum, formulir akan berakhir tanpa data wawancara.');
  const consent = form.addMultipleChoiceItem()
    .setTitle('Apakah narasumber sudah menyetujui wawancara dan penggunaan pendapat untuk penelitian?')
    .setRequired(true);
  const next = form.addPageBreakItem().setTitle('Identitas wawancara dan konteks');
  consent.setChoices([
    consent.createChoice('Ya, persetujuan sudah diperoleh', next),
    consent.createChoice('Belum memperoleh persetujuan', FormApp.PageNavigationType.SUBMIT)
  ]);
}

function tambahProfil_(form) {
  form.addTextItem().setTitle('Kode pakar (contoh P01)').setRequired(true);
  form.addTextItem().setTitle('Nama lengkap (opsional)').setRequired(false);
  form.addTextItem().setTitle('Afiliasi / jabatan').setRequired(true);
  form.addTextItem().setTitle('Bidang keahlian').setRequired(true);
  form.addTextItem().setTitle('Kontak untuk klarifikasi (opsional)').setRequired(false);
  form.addMultipleChoiceItem()
    .setTitle('Izin mencantumkan nama dalam publikasi')
    .setChoiceValues(['Ya', 'Tidak'])
    .setRequired(true);
  form.addMultipleChoiceItem()
    .setTitle('Pernyataan konflik kepentingan')
    .setChoiceValues(['Tidak ada', 'Ada'])
    .setRequired(true);
  form.addParagraphTextItem()
    .setTitle('Jika ada, jelaskan konflik kepentingan (opsional)')
    .setRequired(false);
}

function tambahDossier_(form, r) {
  form.addSectionHeaderItem()
    .setTitle(r.id + ' - ' + r.judul)
    .setHelpText('Norma asal: ' + r.asal + '\nNorma tujuan: ' + r.tujuan +
      '\nLabel kandidat: ' + r.label + '\nParafrasa: ' + r.parafrasa +
      '\nBatas interpretasi: ' + r.batas +
      '\nTINGKAT BUKTI: E3 - hubungan interpretatif yang belum divalidasi pakar.');
}

function catatTautan_(jenis, form, tautanSpreadsheet) {
  Logger.log('===== ' + jenis + ' =====');
  Logger.log('EDIT: ' + form.getEditUrl());
  Logger.log('RESPONDEN: ' + form.getPublishedUrl());
  if (tautanSpreadsheet) Logger.log('GOOGLE SHEETS RESPONS: ' + tautanSpreadsheet);
}