import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import styles from '../styles/Profile.module.css';
import { FaPlus, FaEnvelope, FaWhatsapp } from 'react-icons/fa';

export default function Profile() {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [newEmployee, setNewEmployee] = useState({
    fullName: '',
    email: '',
    department: '',
    whatsapp: '',
  });

  useEffect(() => {
    const fetchEmployeeData = async () => {
      setLoading(true);
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          throw new Error('User ID tidak ditemukan');
        }
        const response = await fetch('/api/profile', {
          headers: {
            'user-id': userId
          }
        });
        if (!response.ok) {
          throw new Error('Gagal mengambil data karyawan');
        }
        const data = await response.json();
        setEmployee(data);
        setNewEmployee({
          fullName: data.fullName || '',
          email: data.email || '',
          department: data.department || '',
          whatsapp: data.whatsapp || '',
        });
        setPhotoPreview(data.photo || '/daiku/profile.png');
      } catch (error) {
        console.error('Error fetching employee data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setPhotoPreview(previewURL);
    }
  };

  const handleSaveEdit = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        throw new Error('User ID tidak ditemukan');
      }

      const formData = new FormData();
      Object.keys(newEmployee).forEach(key => {
        formData.append(key, newEmployee[key]);
      });
      if (photo) formData.append('photo', photo);

      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'user-id': userId
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Gagal memperbarui profil');
      }

      const updatedData = await response.json();
      setEmployee(updatedData);
      alert('Profil berhasil diperbarui.');
    } catch (error) {
      console.error('Error:', error);
      alert(error.message);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className={styles.mainContent}>
        <Navbar />
        {employee && (
          <>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <img
                  src={employee.photo || '/daiku/profile.png'}
                  alt={employee.fullName || 'Profile'}
                  className={styles.employeePhoto}
                />
                <div className={styles.employeeInfo}>
                  <h2 className={styles.employeeName}>{employee.fullName || 'Nama tidak tersedia'}</h2>
                  <p className={styles.department}>{employee.department || 'Departemen tidak tersedia'}</p>
                </div>
              </div>
              <div className={styles.contactInfo}>
                <p>
                  <FaEnvelope className={styles.icon} />
                  <span>{employee.email || '-'}</span>
                </p>
                <p>
                  <FaWhatsapp className={styles.icon} />
                  <span>{employee.whatsapp || '-'}</span>
                </p>
              </div>
            </div>

            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Edit Profile</h2>
              <div className={styles.formGroup}>
                <label>Nama Lengkap</label>
                <input
                  type="text"
                  name="fullName"
                  value={newEmployee.fullName}
                  onChange={handleInputChange}
                  className={styles.inputField}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Foto (Upload)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className={styles.inputField}
                />
                {photoPreview && (
                  <img
                    src={photoPreview}
                    alt="Preview"
                    className={styles.photoPreview}
                  />
                )}
              </div>
              <div className={styles.formGroup}>
                <label>Departemen</label>
                <input
                  type="text"
                  name="department"
                  value={newEmployee.department}
                  onChange={handleInputChange}
                  className={styles.inputField}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={newEmployee.email}
                  onChange={handleInputChange}
                  className={styles.inputField}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Nomor WhatsApp</label>
                <input
                  type="text"
                  name="whatsapp"
                  value={newEmployee.whatsapp}
                  onChange={handleInputChange}
                  className={styles.inputField}
                />
              </div>
              <button className={styles.saveButton} onClick={handleSaveEdit}>
                Simpan Perubahan
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}