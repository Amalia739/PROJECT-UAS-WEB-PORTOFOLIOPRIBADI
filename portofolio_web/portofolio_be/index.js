const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Dummy data project
let projects = [
  { id: 1, title: 'Toko Online', description: 'React + Firebase' },
  { id: 2, title: 'Catatan App', description: 'React + localStorage' },
];

// Ambil semua project
app.get('/api/projects', (req, res) => {
  res.json(projects);
});

// Simpan pesan kontak
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  console.log('Pesan masuk:', { name, email, message });
  res.status(200).json({ success: true, message: 'Pesan diterima!' });
});

// (Bonus) Tambah project
app.post('/api/projects', (req, res) => {
  const newProject = { id: Date.now(), ...req.body };
  projects.push(newProject);
  res.status(201).json(newProject);
});

// (Bonus) Hapus project
app.delete('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  projects = projects.filter(p => p.id !== parseInt(id));
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
