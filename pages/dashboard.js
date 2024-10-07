import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import styles from '../styles/Dashboard.module.css';

export default function Dashboard() {
  const [role, setRole] = useState('');
  const [laporan, setLaporan] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch laporan karyawan ketika komponen dimuat
  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    setRole(storedRole);

    // Ambil data laporan karyawan dari API
    const fetchLaporan = async () => {
      try {
        const response = await fetch('/api/laporan_karyawan');
        const data = await response.json();
        setLaporan(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching laporan karyawan:', error);
        setIsLoading(false);
      }
    };

    fetchLaporan();
  }, []);

  const renderAdminDashboard = () => (
    <div className={styles.dashboardContent}>
      {/* Laporan Karyawan */}
      <div className={styles.cardWrapper}>
        <div className={styles.card}>
          <h3>Laporan Karyawan</h3>
          {isLoading ? (
            <p>Memuat laporan...</p>
          ) : laporan.length > 0 ? (
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Nama Lengkap</th>
                    <th>Tanggal Laporan</th>
                    <th className={styles.mediumCol}>Jam Kerja</th>
                    <th>Progres Harian</th>
                    <th className={styles.statusCol}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {laporan.map((laporanItem, index) => (
                    <tr key={laporanItem.id}>
                      <td>{laporanItem.namaLengkap}</td>
                      <td>{new Date(laporanItem.tanggalLaporan).toLocaleDateString()}</td>
                      <td>{laporanItem.jamKerja || '08:00 - 17:00'}</td>
                      <td>{laporanItem.progressHarian}</td>
                      <td>{laporanItem.statusHarian}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>Tidak ada laporan yang ditemukan.</p>
          )}
        </div>
      </div>

      {/* Tambahkan Grid untuk menampilkan 3 card di satu baris */}
      <div className={styles.gridWrapper}>
        <div className={styles.card}>
          <h3>Jumlah Karyawan Aktif</h3>
          <p>{laporan.length > 0 ? `${laporan.length} Karyawan` : '0 Karyawan'}</p>
        </div>

        <div className={styles.card}>
          <h3>Jumlah Laporan Masuk</h3>
          <p>{laporan.length > 0 ? `${laporan.length} Laporan` : '0 Laporan'}</p>
        </div>

        <div className={styles.card}>
          <h3>Riwayat Aktivitas</h3>
          <p>Belum ada aktivitas terbaru.</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex">
      <Sidebar />
      <div className={styles.mainContent}>
        <Navbar />
        {renderAdminDashboard()}
      </div>
    </div>
  );
}
