// server.js (Express)
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // Izinkan frontend mengakses backend
app.use(express.json()); // Untuk parsing body JSON

// Contoh data dummy proyek
const projects = [
  { id: 1, title: 'Aplikasi ToDo', description: 'Aplikasi manajemen tugas harian.' },
  { id: 2, title: 'Portofolio Web', description: 'Website pribadi menggunakan React.' },
];

app.get('/api/projects', (req, res) => {
  res.json(projects);
});

app.post('/api/projects', (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: 'Title dan description wajib diisi' });
  }

  const newProject = {
    id: Date.now(), // ID unik
    title,
    description
  };

  projects.push(newProject);
  res.status(201).json(newProject);
});

app.put('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  const project = projects.find(p => p.id === parseInt(id));
  if (!project) {
    return res.status(404).json({ error: 'Project tidak ditemukan' });
  }

  if (title) project.title = title;
  if (description) project.description = description;

  res.json(project);
});

app.delete('/api/projects/:id', (req, res) => {
  const { id } = req.params;

  const index = projects.findIndex(p => p.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ error: 'Project tidak ditemukan' });
  }

  const deleted = projects.splice(index, 1);
  res.json({ message: 'Project berhasil dihapus', deleted });
});

// Endpoint GET untuk mengambil data proyek
app.get('/api/projects', (req, res) => {
  res.json(projects);
});

// Simpan pesan kontak (sementara di memori)
const messages = [];

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Semua field wajib diisi' });
  }

  messages.push({ name, email, message });
  console.log('Pesan masuk:', { name, email, message });

  res.status(200).json({ message: 'Pesan berhasil dikirim' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

