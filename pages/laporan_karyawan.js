import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import styles from '../styles/LaporanKaryawan.module.css';

export default function LaporanKaryawan() {
  const [laporan, setLaporan] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterVisible, setFilterVisible] = useState(false);
  const [filterStatus, setFilterStatus] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const fetchLaporan = async () => {
      try {
        const response = await fetch('/api/laporan_karyawan');
        const data = await response.json();
        if (Array.isArray(data)) {
          setLaporan(data);
        } else {
          setLaporan([]);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching laporan:', error);
        setLaporan([]);
        setIsLoading(false);
      }
    };
    fetchLaporan();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterToggle = () => {
    setFilterVisible(!filterVisible);
  };

  const handleFilterStatusChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const filteredLaporan = laporan
    .filter((laporan) =>
      laporan.namaLengkap.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((laporan) =>
      filterStatus ? laporan.statusHarian === filterStatus : true
    );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={styles.mainContainer}>
      <Navbar />
      <div className={styles.layout}>
        <Sidebar />
        <div
          className={`${styles.content} ${isMobile ? styles.mobileContent : ''}`}
        >
          <div className={styles.header}>
            <h1 className={styles.title}>Laporan Harian Karyawan</h1>
            <button className={styles.filterButton} onClick={handleFilterToggle}>
              Filter
            </button>
          </div>

          {filterVisible && (
            <div className={styles.filterOptions}>
              <label>Status Laporan</label>
              <select
                className={styles.filterSelect}
                value={filterStatus}
                onChange={handleFilterStatusChange}
              >
                <option value="">Semua</option>
                <option value="Selesai">Selesai</option>
                <option value="Belum Selesai">Belum Selesai</option>
                <option value="Tertunda">Tertunda</option>
              </select>
            </div>
          )}

          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Cari karyawan..."
              className={styles.searchInput}
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          <div className={styles.laporanTable}>
            {isLoading ? (
              <p>Memuat laporan...</p>
            ) : filteredLaporan.length > 0 ? (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Nama Lengkap</th>
                    <th>Tanggal Laporan</th>
                    <th>Jam Kerja</th>
                    <th>Progres Harian</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLaporan.map((laporan) => (
                    <tr key={laporan.id}>
                      <td>{laporan.namaLengkap}</td>
                      <td>{new Date(laporan.tanggalLaporan).toLocaleDateString()}</td>
                      <td>{laporan.dariJam} - {laporan.hinggaJam}</td>
                      <td>{laporan.progressHarian}</td>
                      <td>{laporan.statusHarian}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Tidak ada laporan yang ditemukan.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
