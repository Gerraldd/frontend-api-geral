
# Projek API Pemesanan Tiket Pesawat 🛫

Sebuah project sederhana untuk **Front-End - Integrasi API** yang menampilkan dan mengelola data pemesanan tiket pesawat menggunakan **API dan PostgreSQL**.

---

## ✨ Fitur Utama

- Menampilkan daftar pemesan tiket pesawat
- Menambahkan data pemesan baru
- Mengupdate data pemesan
- Menghapus data pemesan
- Menghubungkan API ke database **PostgreSQL**

---

## 🛠️ Teknologi yang Digunakan

- **HTML5**
- **CSS3**
- **Bootstrap 5** (untuk styling)
- **JavaScript**
- **Node.js**
- **Express.js**
- **PostgreSQL**

---

## 📂 Struktur Folder

```plaintext
/Projek_API_Geral
├── api.js                # File utama untuk route API
├── connection.js         # Koneksi ke database PostgreSQL
├── public/               # Static assets (CSS & JS)
│   ├── css/
│   └── js/
├── views/                # Tampilan halaman HTML
│   ├── main.html         # Halaman utama (daftar pemesan)
│   ├── tambahPemesan.html # Form tambah data
│   ├── updatePemesan.html # Form update data
│   └── hapusPemesan.html  # Form hapus data
├── package.json          # Konfigurasi project Node.js
├── .gitignore            # File gitignore
```

---

## 🗄️ Database Structure

### Database: `pemesanan_tiket_pesawat`

### Table: `pemesan`

| Field           | Type         | Description               |
|-----------------|--------------|---------------------------|
| id_pemesanan    | SERIAL       | Primary key               |
| nama            | VARCHAR(100) | Nama pemesan              |
| email           | VARCHAR(100) | Email pemesan             |
| nomor_telepon   | VARCHAR(20)  | Nomor telepon pemesan     |

---

## 📜 SQL to Create Table

```sql
-- Database: pemesanan_tiket_pesawat

CREATE TABLE pemesan (
    id_pemesanan SERIAL PRIMARY KEY,
    nama VARCHAR(100),
    email VARCHAR(100),
    nomor_telepon VARCHAR(20)
);
```

---

## 🚀 Cara Menjalankan Project

1. Clone repository:
   ```bash
   git clone https://github.com/Gerraldd/frontend-api-geral.git
   cd frontend-api-geral
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Pastikan kamu sudah mengatur koneksi PostgreSQL di `connection.js`.

4. Jalankan project:
   ```bash
   node api.js
   ```

5. Buka browser dan akses:
   ```
   http://localhost:3000/main.html
   ```

---

## 📸 Screenshot Tampilan

> ![Tampilan Website](/public/image/preview.png)

---

## 👨‍💻 About Developer

**Nama :** Muhammad Geral Herpavy <br>
**Username :** Gerraldd<br>
**Kelas :** XI - Front-End Developer SMK  

---

## ⚠️ Catatan

- Project ini hanya untuk latihan dan pengembangan skill integrasi API.
- Pastikan PostgreSQL berjalan sebelum menjalankan project.

---

## 📝 Lisensi

Project ini dibuat untuk keperluan pembelajaran. 🚀
