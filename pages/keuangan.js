import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import styles from '../styles/Keuangan.module.css';

export default function Keuangan() {
  const [financialData] = useState([
    { id: 1, project: 'Proyek Renovasi Gedung', budget: 5000000, spent: 3500000, remaining: 1500000 },
    { id: 2, project: 'Pembangunan Jembatan', budget: 8000000, spent: 7000000, remaining: 1000000 },
    { id: 3, project: 'Interior Kantor', budget: 3000000, spent: 2500000, remaining: 500000 },
  ]);

  return (
    <div className="flex">
      <Sidebar />
      <div className={styles.mainContent}>
        <Navbar />
        <div className={styles.header}>
          <h1 className={styles.title}>Keuangan Proyek</h1>
        </div>

        {/* Tabel kosong, karena kolom dihapus */}
        <div className={styles.tableContainer}>
          <table className={styles.financeTable}>
            <thead>
              <tr>
                {/* Hapus header tabel */}
              </tr>
            </thead>
            <tbody>
              {financialData.map((item) => (
                <tr key={item.id}>
                  {/* Hapus data baris */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
