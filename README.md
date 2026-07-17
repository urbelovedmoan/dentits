# AVINVERSE — Starter Project

Fondasi website ucapan wisuda interaktif untuk:

**drg. Avivien Aurandia Qanita**  
Wisuda: **Sabtu, 18 Juli 2026**  
Dibuat oleh: **Ansa**

Versi ini sudah berisi:

- Loading screen
- Portal opening
- Hero reveal
- Character profile
- The Avin Compatibility Test
- Crystal of Determination reward
- Defeat Lord Deadline mini-game
- Crystal of Courage reward
- Journey Shards milestone gallery
- Crystal of Journey reward
- Constellation of Every Smile
- Crystal of Kindness reward
- Secret Letter from Ansa
- Animated crystal seal and envelope
- Cinematic Graduation Finale
- Confetti, stars, and sakura animation
- Navigasi antarscene
- Tombol musik
- Mode animasi ringan
- Dukungan keyboard dan swipe
- Tampilan responsif untuk laptop, Android, dan iPhone

## 1. Cara menjalankan

Tidak perlu instalasi.

1. Ekstrak folder proyek.
2. Klik dua kali `index.html`.
3. Website akan terbuka di browser.

Untuk hasil terbaik saat menguji audio, jalankan dengan server lokal. Di Visual Studio Code, Anda dapat memakai ekstensi **Live Server**.

## 2. Memasang foto utama

Masukkan foto terbaik Avin ke:

```text
assets/photos/hero.jpg
```

Nama file harus tepat `hero.jpg`.

Foto portrait paling ideal. Website memakai:

```css
object-fit: cover;
object-position: center 25%;
```

Posisi wajah dapat diatur di `style.css` pada bagian `.hero-portrait img`.

Contoh:

```css
object-position: center 15%;
```

Semakin kecil angka kedua, posisi foto semakin bergeser ke atas.

## 3. Memasang musik

Masukkan musik ke:

```text
assets/music/background-music.mp3
```

Nama file harus tepat `background-music.mp3`.

Musik mulai setelah tombol **Enter the Avinverse** ditekan. Ini diperlukan agar audio bekerja pada Chrome, Safari, Android, dan iPhone.

Volume awal dapat diubah di `script.js`:

```javascript
audio: {
  volume: 0.34,
},
```

Gunakan angka `0` sampai `1`.

## 4. Mengubah data utama

Buka `script.js`, lalu edit bagian paling atas:

```javascript
const siteConfig = {
  graduate: {
    fullName: "Avivien Aurandia Qanita",
    nickname: "Avin",
    title: "drg.",
    graduationDateDisplay: "Saturday, 18 July 2026",
  },
  sender: {
    name: "Ansa",
  },
};
```

## 5. Menjalankan dengan Live Server

1. Instal Visual Studio Code.
2. Buka folder `avinverse-starter`.
3. Instal ekstensi **Live Server**.
4. Klik kanan `index.html`.
5. Pilih **Open with Live Server**.

## 6. Deploy ke GitHub Pages

1. Buat repository baru di GitHub, misalnya `avinverse`.
2. Upload semua isi folder ini ke repository tersebut.
3. Buka **Settings** repository.
4. Pilih **Pages**.
5. Pada **Build and deployment**, pilih:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/ (root)`
6. Klik **Save**.
7. GitHub akan memberikan alamat website.

Contoh alamat:

```text
https://username.github.io/avinverse/
```

## 7. Catatan penggunaan foto dan musik

Sebelum website dibagikan:

- Kompres foto agar setiap file idealnya di bawah 1 MB.
- Gunakan JPG atau WebP.
- Hindari nama file dengan spasi.
- Pastikan musik yang digunakan boleh dibagikan secara daring.
- Uji website menggunakan mode incognito/private browser.

## 8. Struktur proyek

```text
avinverse-starter/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    ├── photos/
    │   └── hero.jpg
    ├── music/
    │   └── background-music.mp3
    └── sounds/
```

## Tahap terbaru

Scene **The Avin Compatibility Test** telah ditambahkan.

Fitur kuis:

- Empat pertanyaan personal
- Respons berbeda untuk setiap pilihan
- Progress pertanyaan
- Tidak ada jawaban yang membuat pengguna gagal
- Hadiah **Crystal of Determination**
- Tombol mengulang kuis
- Mendukung klik, keyboard umum, dan layar sentuh

## Tahap terbaru

Scene **Defeat Lord Deadline** telah ditambahkan.

Fitur mini-game:

- Tiga ronde singkat
- Tidak ada kemungkinan kalah
- Sembilan kartu kekuatan unik
- Health bar dan animasi serangan
- Respons berbeda untuk setiap kekuatan
- Tombol skip battle
- Tombol replay
- Hadiah **Crystal of Courage**
- Mendukung mouse dan layar sentuh

## Tahap terbaru

Scene **Journey Shards** telah ditambahkan.

Fitur galeri:

- Empat portal foto
- Placeholder otomatis ketika foto belum tersedia
- Tampilan foto layar besar
- Caption personal Indonesia dan Inggris
- Navigasi tombol, keyboard, dan swipe
- Progress arsip 0–100%
- Status foto yang sudah dibuka
- Tombol reset archive
- Hadiah **Crystal of Journey**

## Memasang empat milestone perjalanan

Simpan foto dengan nama berikut:

```text
assets/photos/Journey Shard 1
assets/photos/Journey Shard 2
assets/photos/Journey Shard 3
assets/photos/Journey Shard 4
```

Journey Shards tidak membutuhkan file foto tambahan.

## Mengubah teks Journey Shards

Buka `memory.js`, lalu edit bagian:

```javascript
const memories = [
```

## Tahap terbaru

Scene **Constellation of Every Smile** telah ditambahkan.

Fitur konstelasi:

- Lima bintang interaktif
- Lima pesan personal untuk Avin
- Bintang dapat dibuka dalam urutan apa pun
- Garis konstelasi muncul secara bertahap
- Bentuk gigi bercahaya setelah seluruh bintang terbuka
- Progress koneksi 0–100%
- Tombol reset stars
- Hadiah **Crystal of Kindness**
- Tombol langsung dari Journey Shards menuju konstelasi

## Mengubah pesan bintang

Buka `constellation.js`, lalu edit bagian:

```javascript
const starMessages = [
```

## Tahap terbaru

Scene **Secret Letter** telah ditambahkan.

Fitur surat:

- Empat kristal berkumpul menjadi segel
- Animasi pecahnya crystal seal
- Amplop digital dengan wax seal
- Animasi amplop terbuka
- Surat campuran bahasa Indonesia dan Inggris
- Isi surat muncul bertahap per paragraf
- Surat dapat di-scroll di laptop dan ponsel
- Tombol replay letter
- Tombol menyimpan pesan ke Avinverse
- Tombol langsung dari konstelasi menuju surat

## Mengubah isi surat

Buka `index.html`, lalu cari:

```html
<div id="letterPaper"
```

Seluruh isi surat berada di dalam elemen tersebut.

## Tahap terbaru

Tahap terakhir, **Cinematic Graduation Finale**, telah ditambahkan.

Fitur finale:

- Empat kristal berkumpul sebelum perayaan
- Empat kalimat pembuka sinematik
- Hero reveal menggunakan `assets/photos/hero.jpg`
- Gelar lengkap `drg. Avivien Aurandia Qanita`
- Judul `The Guardian of Every Smile`
- Confetti, kelopak sakura, dan partikel bintang
- Pesan penutup dari Ansa
- Tombol replay finale
- Tombol copy website link
- Tombol restart seluruh perjalanan
- Tampilan responsif untuk laptop dan ponsel

## Status proyek

Seluruh alur utama AVINVERSE telah selesai:

```text
Loading
→ Portal Opening
→ Hero Reveal
→ Character Profile
→ Compatibility Test
→ Defeat Lord Deadline
→ Journey Shards
→ Constellation of Every Smile
→ Secret Letter
→ Cinematic Graduation Finale
```

## Pemeriksaan akhir yang disarankan

Sebelum dibagikan:

1. Pastikan `hero.jpg` dan empat journey shards sudah tampil.
2. Pastikan `background-music.mp3` dapat diputar.
3. Uji seluruh alur menggunakan laptop.
4. Uji lagi menggunakan ponsel dalam mode portrait.
5. Coba tombol musik, swipe galeri, scroll surat, dan finale.
6. Buka GitHub Pages melalui mode incognito untuk memastikan file terbaru dimuat.

## Responsive layout patch

File `layout-fixes.css` ditambahkan untuk:

- Memberi jarak aman antara finale dan kontrol musik di bagian atas.
- Mencegah finale keluar layar pada laptop dan ponsel.
- Menyesuaikan tampilan finale untuk layar landscape yang pendek.
- Merapikan opening pada Android ketika memakai mode desktop.
- Mengaktifkan scroll sebagai cadangan pada finale tanpa meminta pengguna melakukan zoom out.

## Panduan mengganti teks

Lihat file:

```text
TEXT-EDITING-GUIDE.md
```

Panduan tersebut menjelaskan lokasi teks opening, portal, profil, kuis, game,
galeri, konstelasi, surat, dan finale.


## Update terbaru

Perubahan tambahan:

- Scene **Journey Shards** diganti menjadi **Journey Shards**
- Tidak membutuhkan foto lagi pada scene tersebut
- Setiap shard sekarang berisi milestone perjalanan Avin
- Animasi opening constellation sekarang membentuk **Taurus**

## File teks yang perlu Anda edit untuk bagian ini

- Ubah isi empat Journey Shards di `memory.js`
- Ubah bentuk dan label Taurus opening di `index.html` dan `style.css`


## Revisi audit terbaru

Perbaikan yang sudah diterapkan:

- Menghapus baris HTML rusak di Journey Shards
- Mencegah judul AVINVERSE melebar keluar layar ponsel
- Menjaga animasi Taurus tetap tampil pada Android desktop mode
- Membuat pola Taurus lebih mudah dikenali
- Mengecilkan judul modal Journey Shards pada ponsel
- Menambah ruang aman di atas navigasi bawah
- Mengganti label aksesibilitas “foto” menjadi “journey fragment”
- Membersihkan instruksi lama mengenai empat foto memory


## Desktop scroll and performance revision

This revision adds:

- A dedicated scroll area for Journey Shards text on desktop.
- Short-screen desktop rules for Firefox and Android desktop mode.
- Automatic performance mode for Firefox and lower-resource devices.
- Lower background particle counts and canvas resolution in performance mode.
- Reduced blur/backdrop effects while retaining the overall design.
- Lower finale particle counts on lower-resource devices.

The clipping problem was a CSS layout issue, not a RAM failure. RAM and browser
choice mainly affect animation smoothness.
