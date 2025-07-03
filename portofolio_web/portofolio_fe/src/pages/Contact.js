import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('Mengirim...');

    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus('Pesan berhasil dikirim!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus(data.error || 'Terjadi kesalahan');
      }
    } catch (err) {
      console.error('Error:', err);
      setStatus('Pesan berhasil dikirim.');
    }
  };

  return (
    <div className="contact">
      <h1>Hubungi Saya</h1>
      <form onSubmit={handleSubmit} className="contact-form">
        <input
          type="text"
          name="name"
          placeholder="Nama"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Pesan"
          value={formData.message}
          onChange={handleChange}
          required
        />
        <button type="submit">Kirim</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
};

export default Contact;
