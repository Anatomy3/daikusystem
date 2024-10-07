import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import styles from '../styles/LaporanHarian.module.css';
import { ToastContainer, toast } from 'react-toastify';  // Import Toastify
import 'react-toastify/dist/ReactToastify.css';           // Import CSS untuk Toastify
import { useRouter } from 'next/router';                  // Import useRouter dari Next.js

export default function LaporanHarian() {
  const [currentDate, setCurrentDate] = useState('');
  const [progress, setProgress] = useState('');
  const [status, setStatus] = useState('Selesai');
  const [namaLengkap, setNamaLengkap] = useState('');
  const [dariJam, setDariJam] = useState('');
  const [hinggaJam, setHinggaJam] = useState('');

  const router = useRouter();  // Gunakan useRouter untuk navigasi

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];  // Format tanggal (YYYY-MM-DD)
    setCurrentDate(formattedDate);  // Tetapkan tanggal saat ini sebagai default
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const laporanData = {
      namaLengkap,
      tanggalLaporan: currentDate,  // Kirim tanggal laporan
      dariJam,
      hinggaJam,
      progressHarian: progress,
      statusHarian: status,
    };

    try {
      const response = await fetch('/api/laporan_harian', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(laporanData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Laporan berhasil disimpan!');  // Menampilkan notifikasi sukses
      } else {
        toast.error(`Error: ${data.error}`);          // Menampilkan notifikasi error
      }
    } catch (error) {
      console.error('Error submitting laporan:', error);
      toast.error('Terjadi kesalahan saat menyimpan laporan.');
    }
  };

  // Fungsi untuk menavigasi ke halaman Laporan Karyawan
  const handleGoToRiwayat = () => {
    router.push('/laporan_karyawan');  // Navigasi ke halaman laporan karyawan
  };

  return (
    <div className={styles.mainContainer}>
      <Navbar />
      <div className={styles.layout}>
        <Sidebar />
        <div className={styles.content}>
          <div className={styles.headerContainer}>
            <h1 className={styles.title}>Laporan Harian Karyawan</h1>
            <button 
              className={styles.riwayatButton} 
              onClick={handleGoToRiwayat}
            >
              Riwayat
            </button>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label>Nama Lengkap</label>
              <input
                type="text"
                placeholder="Nama Lengkap"
                className={styles.inputField}
                value={namaLengkap}
                onChange={(e) => setNamaLengkap(e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Tanggal Laporan</label>
              <input type="date" className={styles.inputField} value={currentDate} readOnly />
            </div>

            <div className={styles.timeGroup}>
              <div className={styles.formGroup}>
                <label>Dari</label>
                <input
                  type="time"
                  className={styles.inputField}
                  value={dariJam}
                  onChange={(e) => setDariJam(e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Hingga</label>
                <input
                  type="time"
                  className={styles.inputField}
                  value={hinggaJam}
                  onChange={(e) => setHinggaJam(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Progres Harian</label>
              <textarea
                placeholder="Masukkan progres harian Anda"
                className={styles.inputField}
                value={progress}
                onChange={(e) => setProgress(e.target.value)}
                rows="4"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Status Harian</label>
              <select
                className={styles.selectField}
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Selesai">Selesai</option>
                <option value="Belum Selesai">Belum Selesai</option>
                <option value="Tertunda">Tertunda</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <button type="submit" className={styles.uploadButton}>Unggah Laporan</button>
            </div>

            {/* Link footer */}
            <a
              href="https://daikuinterior.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.footerLink}
            >
              daikuinterior.com © 2024
            </a>
          </form>

          <ToastContainer />  {/* Tambahkan ini untuk menampilkan toast */}
        </div>
      </div>
    </div>
  );
}
