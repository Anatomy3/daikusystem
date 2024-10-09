// pages/form.js
import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import styles from '../styles/form.module.css';

const Form = () => {
  return (
    <div className={styles.pageContainer}>
      <Sidebar />
      <div className={styles.mainContent}>
        <Navbar />
        <div className={styles.contentContainer}>
          <div className={styles.card}>
            <div className={styles.iconContainer}>
              <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="6" width="20" height="8" rx="1" />
                <path d="M17 14v7" />
                <path d="M7 14v7" />
                <path d="M17 3v3" />
                <path d="M7 3v3" />
                <path d="M10 14 2.3 6.3" />
                <path d="m14 6 7.7 7.7" />
                <path d="m8 6 8 8" />
              </svg>
            </div>
            <h1 className={styles.title}>Halaman Sedang Dibangun</h1>
            <p className={styles.description}>
              Maaf atas ketidaknyamanannya. Kami sedang bekerja keras untuk memberikan pengalaman yang luar biasa untuk Anda!
            </p>
            <div className={styles.progressContainer}>
              <div className={styles.progressBar}></div>
            </div>
            <p className={styles.progressText}>Progress: 30%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;