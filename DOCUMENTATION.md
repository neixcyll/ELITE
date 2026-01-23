# Dokumentasi Website Robotic Elite

Dokumentasi ini menjelaskan struktur halaman, komponen utama, serta interaksi JavaScript yang tersedia pada website Robotic Elite tanpa mengubah isi aplikasi.

## Ringkasan Struktur Halaman
Website tersusun sebagai single-page dengan navigasi anchor menuju beberapa section utama berikut:

- **Beranda (Hero)**: Menampilkan video latar, perkenalan komunitas, CTA gabung, statistik singkat, dan visual utama kegiatan. Section ini memuat video latar `Galeri/demo-ekskul.mp4` dan gambar `Galeri/demo.png`.【F:index.html†L17-L87】
- **Profil Organisasi**: Berisi visi, misi, dan deskripsi singkat ELITE sebagai ekstrakurikuler robotika SMK Negeri 2 Surabaya.【F:index.html†L89-L128】
- **Sejarah**: Timeline perjalanan ELITE dari 2010 hingga 2026 dengan penjelasan per periode.【F:index.html†L130-L198】
- **Struktur Organisasi**: Menampilkan kartu interaktif untuk pengurus inti dan divisi riset, dengan detail dinamis yang dimunculkan saat kartu diklik.【F:index.html†L200-L232】
- **Dokumentasi & Keterangan**: Slider galeri kegiatan dengan kontrol sebelumnya/berikutnya dan navigasi dot indicator.【F:index.html†L234-L318】
- **Prestasi**: Carousel horizontal kartu prestasi, lengkap dengan highlight juara, detail lomba, dan kontrol scroll pada perangkat mobile.【F:index.html†L320-L505】
- **Kontak**: Informasi alamat, email, dan sosial media yang dapat dihubungi.【F:index.html†L507-L531】
- **Footer**: Menyediakan identitas organisasi serta hak cipta tahun 2026.【F:index.html†L535-L546】

## Navigasi & Header
- **Navbar** menampilkan logo, nama organisasi, tautan anchor ke tiap section, tombol burger untuk mobile, serta CTA gabung anggota.【F:index.html†L10-L32】
- **Navigasi aktif** ditandai otomatis sesuai posisi scroll halaman melalui JavaScript yang membandingkan `window.scrollY` dengan posisi section.【F:script2.js†L8-L30】

## Interaksi JavaScript
Semua perilaku interaktif dikendalikan oleh `script2.js` (dan file `script.js` berisi salinan logika yang sama). Berikut modul utamanya:

### 1. Toggle Menu Mobile
Tombol burger (`.nav-toggle`) menambah/menghapus class `open` pada `.nav-links` untuk membuka/menutup menu pada layar kecil.【F:script2.js†L1-L6】

### 2. Highlight Navigasi Aktif
`setActiveLink` menetapkan class `active` pada tautan yang sesuai dengan section aktif saat scroll, sehingga pengguna tahu posisi mereka di halaman.【F:script2.js†L8-L30】

### 3. Efek Reveal On Scroll
Elemen dengan class `.reveal` diobservasi menggunakan `IntersectionObserver`, lalu diberi class `visible` saat masuk viewport untuk animasi muncul.【F:script2.js†L32-L50】

### 4. Slider Dokumentasi
Slider pada section dokumentasi memiliki fitur:
- Navigasi tombol prev/next.
- Dot indikator.
- Autoplay setiap 3 detik.
- Pause autoplay saat hover, fokus, atau tab tidak aktif.
- Scroll otomatis ke slide aktif untuk mendukung layout horizontal.
【F:script2.js†L52-L118】

### 5. Struktur Organisasi (Kartu Interaktif)
Bagian struktur organisasi menggunakan dua kartu (`pengurus` dan `divisi`) yang otomatis berganti posisi (swap) setiap 3 detik. Ketika diklik, kartu menampilkan konten detail (struktur pengurus atau daftar divisi) secara dinamis melalui `cardData` dan tombol kembali untuk reset tampilan.【F:script2.js†L120-L263】

### 6. Carousel Prestasi (Auto Scroll)
Carousel prestasi melakukan auto scroll horizontal tiap 3 detik. Interaksi manual (klik tombol kiri/kanan atau hover) akan menghentikan sementara lalu melanjutkan auto scroll setelah delay tertentu.【F:script2.js†L265-L334】

### 7. Modal Prestasi
Klik kartu prestasi membuka modal dengan gambar, judul, dan deskripsi yang diambil dari `data-*` pada kartu. Modal dapat ditutup melalui tombol close atau klik area overlay, sekaligus membuka kembali scroll halaman.【F:script2.js†L336-L396】

## Struktur Data Dinamis
- **Data struktur pengurus dan divisi** disimpan dalam objek `cardData`, lalu disuntikkan ke `detailContent` saat pengguna menekan kartu terkait.【F:script2.js†L128-L258】
- **Data kartu prestasi** berada di markup HTML melalui atribut `data-img`, `data-title`, dan `data-desc`, yang kemudian dibaca untuk mengisi modal prestasi.【F:index.html†L336-L467】【F:script2.js†L336-L382】

## Aset dan Direktori
- **Galeri/** menyimpan seluruh aset gambar dan video, seperti logo, dokumentasi kegiatan, prestasi, dan media hero. Referensi file aset dapat ditemukan di `index.html` pada elemen `<img>` dan `<video>`.【F:index.html†L14-L469】
- **style.css** mengatur seluruh tampilan (layout, warna, animasi, responsif) dan merupakan sumber utama gaya visual aplikasi.【F:index.html†L6-L8】

## Cara Menjalankan
Website dapat dijalankan secara statis dengan membuka `index.html` di browser karena seluruh dependensi bersifat client-side dan tidak memerlukan backend.【F:index.html†L1-L566】
