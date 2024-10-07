import React, { useState } from 'react';
import { FaBell, FaHeadset } from 'react-icons/fa';
import styles from '../styles/Navbar.module.css';
import { useRouter } from 'next/router';

export default function Navbar() {
  const router = useRouter();
  const [isCustomerServiceOpen, setIsCustomerServiceOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const pageTitles = {
    '/dashboard': 'Dashboard',
    '/laporan_karyawan': 'Laporan Karyawan',
    '/kelola_karyawan': 'Kelola Karyawan',
    '/proyek': 'Proyek',
    '/laporan_harian': 'Laporan Harian',
  };

  const currentPage = pageTitles[router.pathname] || 'Halaman';

  const toggleCustomerService = () => {
    setIsCustomerServiceOpen(!isCustomerServiceOpen);
    setIsNotificationOpen(false);
  };

  const toggleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen);
    setIsCustomerServiceOpen(false);
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.pageInfo}>
        <h1 className={styles.pageTitle}>{currentPage}</h1>
      </div>

      <div className={styles.iconContainer}>
        <div className={styles.customerServiceIcon} onClick={toggleCustomerService}>
          <FaHeadset />
        </div>

        <div className={styles.notificationIcon} onClick={toggleNotification}>
          <FaBell />
        </div>
      </div>

      {isCustomerServiceOpen && (
        <div className={styles.customerServicePanel}>
          <h3>Bantuan Customer Service</h3>
          <p>Hubungi kami di: support@example.com</p>
          <p>Telepon: 021-1234567</p>
          <form>
            <input type="text" placeholder="Nama Anda" className={styles.inputField} />
            <textarea placeholder="Pesan Anda" className={styles.inputField}></textarea>
            <button className={styles.submitButton}>Kirim Pesan</button>
          </form>
        </div>
      )}

      {isNotificationOpen && (
        <div className={styles.notificationPanel}>
          <h3>Notifikasi Terbaru</h3>
          <ul>
            <li>Anda memiliki tugas baru: Laporan Mingguan</li>
            <li>Deadline proyek A dalam 3 hari</li>
            <li>5 komentar baru pada proyek B</li>
            <li>Meeting tim dijadwalkan untuk besok</li>
          </ul>
        </div>
      )}
    </header>
  );
}