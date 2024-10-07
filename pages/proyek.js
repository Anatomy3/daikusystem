import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import styles from '../styles/Projects.module.css';

export default function Proyek() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState(null); // Mengelola baris tugas baru

  // Fetch tasks on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('/api/proyek');
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedTasks = [...tasks];
    updatedTasks[index][name] = value;
    setTasks(updatedTasks);
  };

  const handleNewTaskChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const addTask = () => {
    // Menginisialisasi baris baru yang bisa diisi
    setNewTask({
      item: '',
      pic: '',
      input: '',
      output: '',
    });
  };

  const saveNewTask = async () => {
    try {
      const response = await fetch('/api/proyek', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask), // Menyimpan tugas baru ke database
      });

      if (response.ok) {
        const savedTask = await response.json();
        setTasks([...tasks, savedTask]); // Tambahkan tugas baru ke daftar tugas
        setNewTask(null); // Reset baris tugas baru setelah disimpan
      } else {
        const error = await response.json();
        console.error('Failed to save task:', error);
      }
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const editTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].status = 'editing'; // Mengatur status menjadi "editing"
    setTasks(updatedTasks);
  };

  const deleteTask = async (id) => {
    try {
      const response = await fetch('/api/proyek', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        setTasks(tasks.filter(task => task.id !== id));
      } else {
        console.error('Failed to delete task');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className={styles.mainContent}>
        <Navbar />

        <div className={styles.header}>
          <h1 className={styles.title}>Proyek</h1>
        </div>

        {/* Tabel Proyek */}
        <div className={styles.tableContainer}>
          <table className={styles.taskTable}>
            <thead>
              <tr>
                <th>No</th>
                <th>Item</th>
                <th>PIC</th>
                <th>Input</th>
                <th>Output</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={task.id}>
                  <td>{index + 1}</td>
                  <td>{task.item}</td>
                  <td>{task.pic}</td>
                  <td>{task.input}</td>
                  <td>{task.output}</td>
                  <td>
                    <button className={styles.editButton} onClick={() => editTask(index)}>Edit</button>
                    <button className={styles.deleteButton} onClick={() => deleteTask(task.id)}>Hapus</button>
                  </td>
                </tr>
              ))}

              {/* Baris baru untuk tugas yang sedang ditambahkan */}
              {newTask && (
                <tr>
                  <td>{tasks.length + 1}</td>
                  <td>
                    <input
                      type="text"
                      name="item"
                      value={newTask.item}
                      onChange={handleNewTaskChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="pic"
                      value={newTask.pic}
                      onChange={handleNewTaskChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="input"
                      value={newTask.input}
                      onChange={handleNewTaskChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="output"
                      value={newTask.output}
                      onChange={handleNewTaskChange}
                    />
                  </td>
                  <td>
                    <button className={styles.saveButton} onClick={saveNewTask}>Simpan</button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Tombol Tambah Tugas */}
          <button className={styles.addButton} onClick={addTask}>+ Tambah Tugas</button>
        </div>
      </div>
    </div>
  );
}
