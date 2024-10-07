import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Dashboard from './dashboard'; // Ambil dari folder pages
import LaporanKaryawan from './laporan_karyawan'; // Letakkan di folder pages

export default function Home() {
  const [page, setPage] = useState('dashboard'); // State untuk menentukan halaman yang ditampilkan

  const renderPageContent = () => {
    switch (page) {
      case 'laporan-karyawan':
        return <LaporanKaryawan />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="page-container">
      <Navbar />
      <div className="content-wrap flex">
        <Sidebar setPage={setPage} /> {/* Sidebar dengan fungsi setPage */}
        <main className="flex-1 ml-64 p-4 mt-16">
          {renderPageContent()} {/* Komponen halaman berubah sesuai dengan state */}
        </main>
      </div>
      <footer className="footer">
        © daikuinterior.com
      </footer>
    </div>
  );
}
