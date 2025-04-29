import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Ensure Tailwind is included (see below)
import { useNavigate } from 'react-router-dom'; // Optional for navigation

const colors = {
  primaryTeal: '#4A7A77',
  deepForest: '#1F4037',
  ochreGlow: '#E3A857',
  lilacHaze: '#B7A9D6',
  charcoalNight: '#1C2526',
  ivoryDawn: '#F8ECE4',
};

const NavBar = () => (
  <nav className="fixed top-0 w-full glassmorphism z-10 py-4">
    <div className="container mx-auto flex justify-between items-center px-4">
      <h1 className="text-2xl font-bold" style={{ color: colors.ochreGlow }}>
        Your Name
      </h1>
      <ul className="flex space-x-6">
        <li><a href="#home" className="hover:text-[--ochre-glow] transition-colors" style={{ color: colors.ivoryDawn }}>Home</a></li>
        <li><a href="#portfolio" className="hover:text-[--ochre-glow] transition-colors" style={{ color: colors.ivoryDawn }}>Portfolio</a></li>
        <li><a href="#about" className="hover:text-[--ochre-glow] transition-colors" style={{ color: colors.ivoryDawn }}>About</a></li>
        <li><a href="#contact" className="hover:text-[--ochre-glow] transition-colors" style={{ color: colors.ivoryDawn }}>Contact</a></li>
      </ul>
    </div>
  </nav>
);

const Hero = () => (
  <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[--deep-forest] to-[--primary-teal] px-4">
    <div className="text-center">
      <h1 className="text-5xl md:text-7xl font-extrabold mb-4" style={{ color: colors.ivoryDawn }}>
        Welcome to My World
      </h1>
      <p className="text-xl md:text-2xl mb-6" style={{ color: colors.lilacHaze }}>
        Crafting innovative solutions with passion and precision.
      </p>
      <a
        href="#portfolio"
        className="inline-block bg-[--ochre-glow] text-[--charcoal-night] px-6 py-3 rounded-full font-semibold hover-scale"
        style={{ backgroundColor: colors.ochreGlow, color: colors.charcoalNight }}
      >
        Explore My Work
      </a>
    </div>
  </section>
);

const Portfolio = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/projects/')
      .then(response => setProjects(response.data))
      .catch(error => console.error('Error fetching projects:', error));
  }, []);

  return (
    <section id="portfolio" className="py-16" style={{ backgroundColor: colors.charcoalNight }}>
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12" style={{ color: colors.ochreGlow }}>
          My Portfolio
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map(project => (
            <div key={project.id} className="glassmorphism rounded-lg p-6 hover-scale">
              <img
                src={project.image ? `http://localhost:8000${project.image}` : 'https://via.placeholder.com/600x400'}
                alt={project.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-2xl font-semibold mb-2" style={{ color: colors.ivoryDawn }}>
                {project.title}
              </h3>
              <p style={{ color: colors.lilacHaze }}>{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => (
  <section id="about" className="py-16" style={{ backgroundColor: colors.deepForest }}>
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-4xl font-bold mb-8" style={{ color: colors.ochreGlow }}>
        About Me
      </h2>
      <p className="text-lg max-w-2xl mx-auto" style={{ color: colors.ivoryDawn }}>
        I'm a passionate developer with expertise in Django, React, and modern UI/UX design. My mission is to create
        impactful solutions that resonate with users. When I'm not coding, you can find me exploring new tech trends or
        sipping coffee while brainstorming my next big idea.
      </p>
    </div>
  </section>
);

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/contact/', formData)
      .then(() => {
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      })
      .catch(error => setStatus('Error sending message: ' + error.message));
  };

  return (
    <section id="contact" className="py-16" style={{ backgroundColor: colors.charcoalNight }}>
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12" style={{ color: colors.ochreGlow }}>
          Get in Touch
        </h2>
        <div className="max-w-lg mx-auto glassmorphism p-8 rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full p-3 rounded-md bg-[--charcoal-night] text-[--ivory-dawn] border border-[--lilac-haze] focus:outline-none"
              style={{ backgroundColor: colors.charcoalNight, color: colors.ivoryDawn, borderColor: colors.lilacHaze }}
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full p-3 rounded-md bg-[--charcoal-night] text-[--ivory-dawn] border border-[--lilac-haze] focus:outline-none"
              style={{ backgroundColor: colors.charcoalNight, color: colors.ivoryDawn, borderColor: colors.lilacHaze }}
              required
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="4"
              className="w-full p-3 rounded-md bg-[--charcoal-night] text-[--ivory-dawn] border border-[--lilac-haze] focus:outline-none"
              style={{ backgroundColor: colors.charcoalNight, color: colors.ivoryDawn, borderColor: colors.lilacHaze }}
              required
            ></textarea>
            <button
              type="submit"
              className="w-full bg-[--ochre-glow] text-[--charcoal-night] p-3 rounded-md font-semibold hover-scale"
              style={{ backgroundColor: colors.ochreGlow, color: colors.charcoalNight }}
            >
              Send Message
            </button>
          </form>
          {status && <p className="mt-4 text-center" style={{ color: status.includes('Error') ? 'red' : colors.lilacHaze }}>{status}</p>}
        </div>
      </div>
    </section>
  );
};

const App = () => (
  <div>
    <NavBar />
    <Hero />
    <Portfolio />
    <About />
    <Contact />
  </div>
);

export default App;