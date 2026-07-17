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

## Tahap berikutnya

Scene berikutnya adalah:

**Memory Shards**

Empat foto akan ditampilkan sebagai portal kristal. Setiap foto dapat dibuka,
diperbesar, digeser di ponsel, dan diberi caption personal.
