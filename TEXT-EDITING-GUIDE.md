# AVINVERSE — Panduan Mengganti Semua Teks

Panduan ini menunjukkan lokasi setiap kelompok kata atau kalimat di dalam proyek.

> **Penting:** ubah isi teksnya saja. Jangan mengubah `id="..."`, `class="..."`, tanda kurung, koma JavaScript, atau nama file kecuali memang diperlukan.

## Cara paling mudah mengedit

1. Buka folder proyek di Visual Studio Code.
2. Tekan `Ctrl + Shift + F` di Windows atau `Command + Shift + F` di Mac.
3. Cari satu potongan kalimat yang ingin diganti.
4. Edit teksnya, simpan, lalu upload file yang berubah ke GitHub.

## Peta lokasi teks

| Bagian website | File | Kata kunci yang dicari |
|---|---|---|
| Nama lengkap, nama panggilan, gelar, tanggal, nama Ansa | `script.js` | `const siteConfig =` |
| Kalimat loading yang berganti otomatis | `script.js` | `function runLoadingSequence` atau `const messages =` |
| Judul AVINVERSE dan subtitle opening | `index.html` | `SCENE 1: LOADING / OPENING` |
| Portal opening | `index.html` | `SCENE 2: PORTAL` |
| Hero reveal, tagline, kutipan utama | `index.html` | `SCENE 3: HERO REVEAL` |
| Character Profile dan data kemampuan | `index.html` | `SCENE 4: CHARACTER PROFILE` |
| Pertanyaan, pilihan, dan respons kuis | `script.js` | `const quizData =` |
| Judul dan petunjuk statis kuis | `index.html` | `SCENE 5: AVIN COMPATIBILITY TEST` |
| Nama kartu, damage, dan respons Lord Deadline | `script.js` | `const battleRounds =` |
| Judul dan teks statis boss battle | `index.html` | `SCENE 6: DEFEAT LORD DEADLINE` |
| Judul dan teks statis Memory Shards | `index.html` | `SCENE 7: MEMORY SHARDS` |
| Judul, caption, dan nama empat foto | `memory.js` | `const memories =` |
| Judul dan teks statis konstelasi | `index.html` | `SCENE 8: CONSTELLATION OF EVERY SMILE` |
| Lima pesan bintang | `constellation.js` | `const starMessages =` |
| Pengantar dan teks tombol Secret Letter | `index.html` | `SCENE 9: SECRET LETTER` |
| Seluruh isi surat dari Ansa | `index.html` | `id="letterPaper"` |
| Semua kalimat finale | `index.html` | `SCENE 10: CINEMATIC GRADUATION FINALE` |
| Nama file foto utama | `index.html` | `assets/photos/hero.jpg` |
| Nama file empat foto galeri | `memory.js` dan `index.html` | `memory-1.jpg` |
| Nama file musik | `index.html` | `background-music.mp3` |

## 1. Data utama

Buka `script.js`, kemudian cari:

```javascript
const siteConfig = {
```

Bagian ini mengatur data utama:

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

Catatan: sebagian teks nama juga tertulis langsung di `index.html` untuk menjaga desain. Gunakan pencarian global `Avivien Aurandia Qanita`, `Avin`, atau `Ansa` jika ingin mengganti semuanya sekaligus.

## 2. Opening dan loading

### Kalimat loading bergantian

Buka `script.js`, cari:

```javascript
const messages = [
```

Contohnya:

```javascript
const messages = [
  "Preparing a universe for someone extraordinary...",
  "Collecting every dream, effort, and sleepless night...",
  "Calibrating the graduation portal...",
  "A new doctor is ready to arrive.",
];
```

### Judul dan teks awal

Buka `index.html`, cari:

```html
<!-- SCENE 1: LOADING / OPENING -->
```

Di bagian ini Anda dapat mengganti:

- Tanggal `18 · 07 · 2026`
- `Preparing a universe...`
- `AVINVERSE`
- `A graduation journey made with love.`
- `Enter the Avinverse`
- Petunjuk earphone

## 3. Portal, hero, dan profil

Semua teks statis berada di `index.html`:

```html
<!-- SCENE 2: PORTAL -->
<!-- SCENE 3: HERO REVEAL -->
<!-- SCENE 4: CHARACTER PROFILE -->
```

Gunakan komentar tersebut sebagai penanda awal setiap bagian.

## 4. Compatibility Test

### Pertanyaan, jawaban, dan respons

Buka `script.js`, cari:

```javascript
const quizData = [
```

Strukturnya:

```javascript
{
  category: "Core abilities",
  question: "What is Avin’s greatest superpower?",
  answers: [
    {
      label: "Her intelligence",
      response: "Absolutely...",
      harmony: 1,
    },
  ],
},
```

Yang aman diganti:

- `category`
- `question`
- `label`
- `response`

Sebaiknya jangan mengubah `harmony` kecuali ingin mengubah logika internal.

## 5. Lord Deadline

Buka `script.js`, cari:

```javascript
const battleRounds = [
```

Anda dapat mengganti:

- `title`
- `bossLine`
- `hint`
- `name`
- `description`
- `feedback`

Sebaiknya jangan mengubah `damage`, `icon`, atau `color` sebelum seluruh game selesai diuji kembali.

## 6. Memory Shards

Buka `memory.js`, cari:

```javascript
const memories = [
```

Setiap foto memiliki:

```javascript
{
  src: "assets/photos/memory-1.jpg",
  file: "memory-1.jpg",
  kicker: "The Beginning",
  title: "A beautiful story was already unfolding.",
  caption: "Maybe this photo...",
  alt: "A memory of Avin...",
},
```

Yang paling sering diganti:

- `kicker`
- `title`
- `caption`
- `alt`

`src` dan `file` hanya perlu diganti bila nama file fotonya berubah.

## 7. Constellation of Every Smile

Buka `constellation.js`, cari:

```javascript
const starMessages = [
```

Setiap bintang memiliki:

```javascript
{
  kicker: "For every difficult morning",
  title: "You still chose to begin again.",
  text: "Untuk semua pagi...",
},
```

Ketiganya boleh diganti bebas tanpa mengubah animasi.

## 8. Secret Letter

Buka `index.html`, cari:

```html
<div id="letterPaper"
```

Seluruh paragraf setelah elemen tersebut adalah isi surat. Teks berada di dalam tag:

```html
<p class="letter-reveal">
  Isi paragraf...
</p>
```

Kata yang ingin ditebalkan memakai:

```html
<strong>teks tebal</strong>
```

Kata yang ingin dimiringkan memakai:

```html
<em>teks miring</em>
```

Jangan menghapus class `letter-reveal`, karena class itu dipakai untuk animasi paragraf.

## 9. Cinematic Finale

Buka `index.html`, cari:

```html
<!-- SCENE 10: CINEMATIC GRADUATION FINALE -->
```

Di sini Anda dapat mengganti:

- `The Final Chapter Is Ready.`
- Empat kalimat cinematic story
- Nama lengkap dan gelar
- `The Guardian of Every Smile`
- Kutipan `In every universe...`
- `Ansa is incredibly proud of you.`
- Kalimat penutup
- Nama tombol dan judul chapter

Jangan mengubah atribut seperti `data-finale-line="0"` karena dipakai untuk urutan animasi.

## 10. Teks tombol dan status kecil

Teks tombol dan status biasanya berada langsung di `index.html`. Cara tercepat adalah memakai pencarian global berdasarkan tulisan tombol yang tampil, misalnya:

```text
Enter the Avinverse
Open the Portal
Collect Crystal of Memories
Connect the Stars
Keep This Message
Start the Celebration
```

Sebagian status yang berubah setelah interaksi berada di file JavaScript. Cari kalimat persisnya memakai pencarian global.

## 11. Setelah mengedit

1. Simpan file.
2. Buka `index.html` menggunakan Live Server.
3. Jalankan bagian yang diedit.
4. Pastikan tanda kutip dan koma JavaScript tidak hilang.
5. Upload hanya file yang berubah ke root repository GitHub.
6. Lakukan hard refresh:
   - Windows: `Ctrl + F5`
   - Mac: `Command + Shift + R`

## File yang tidak berisi teks utama

File berikut mayoritas mengatur desain dan animasi:

```text
style.css
memory.css
constellation.css
letter.css
finale.css
layout-fixes.css
```

Jangan mengedit file CSS hanya untuk mengganti kalimat.
