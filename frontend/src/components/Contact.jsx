import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, MapPin, ExternalLink, Globe } from 'lucide-react';

const XIcon = ({ size = 20, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/Abhijeet83193',
    icon: <Github size={20} />,
    color: '#333',
    hoverColor: '#6e5494'
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/abhijeet-dhokne-8644a32b3/',
    icon: <Linkedin size={20} />,
    color: '#0A66C2',
    hoverColor: '#004182'
  },
  {
    name: 'X',
    url: 'https://x.com/Abhijeet_Dhokne',
    icon: <XIcon size={20} />,
    color: '#000000',
    hoverColor: '#333333'
  },
  {
    name: 'Google',
    url: 'https://www.google.com',
    icon: <Globe size={20} />,
    color: '#4285F4',
    hoverColor: '#3367D6'
  }
];

const Contact = memo(() => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.15 }}
      style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}
    >
      {/* Main Contact Grid */}
      <div className="contact-grid" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '3rem',
        marginBottom: '3rem'
      }}>
        {/* Left: Contact Info */}
        <div>
          {/* Profile Section */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            marginBottom: '2.5rem'
          }}>
            <div style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '3px solid var(--army-olive)',
              flexShrink: 0
            }}>
              <img
                src={`${import.meta.env.BASE_URL}images/my-profile.jpg`}
                alt="Abhijeet Dhokne"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                loading="lazy"
              />
            </div>
            <div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: 'var(--army-olive)',
                marginBottom: '0.3rem'
              }}>
                Abhijeet Dhokne
              </h3>
              <p style={{
                fontSize: '0.95rem',
                color: 'var(--text-muted)',
                marginBottom: '0.5rem'
              }}>
                Full Stack Developer
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={14} color="var(--primary)" />
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  RAU, Indore, Madhya Pradesh, India
                </span>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h4 style={{
              fontSize: '1.1rem',
              fontWeight: '700',
              color: 'var(--army-olive)',
              marginBottom: '1rem'
            }}>
              Get in Touch
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=abhijeetdhokne1474@gmail.com"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem',
                  background: 'rgba(114, 125, 115, 0.05)',
                  borderRadius: '12px',
                  border: '1px solid var(--border-soft)',
                  textDecoration: 'none',
                  transition: 'border-color 0.2s ease, background-color 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--army-olive)';
                  e.currentTarget.style.background = 'rgba(114, 125, 115, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-soft)';
                  e.currentTarget.style.background = 'rgba(114, 125, 115, 0.05)';
                }}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'rgba(234, 67, 53, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#EA4335'
                }}>
                  <img src={`${import.meta.env.BASE_URL}images/google_mail_gmail_logo_icon_159346.png`} alt="Gmail" style={{ width: '18px', height: '18px' }} loading="lazy" />
                </div>
                <div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Email</p>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: '600' }}>abhijeetdhokne1474@gmail.com</p>
                </div>
              </a>




            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 style={{
              fontSize: '1.1rem',
              fontWeight: '700',
              color: 'var(--army-olive)',
              marginBottom: '1rem'
            }}>
              Follow Me
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -4 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.85rem 1rem',
                    background: 'rgba(114, 125, 115, 0.05)',
                    borderRadius: '12px',
                    border: '1px solid var(--border-soft)',
                    textDecoration: 'none',
                    transition: 'border-color 0.2s ease, background-color 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = link.color;
                    e.currentTarget.style.boxShadow = `0 8px 20px ${link.color}22`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-soft)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ color: link.color }}>{link.icon}</div>
                  <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-main)' }}>
                    {link.name}
                  </span>
                  <ExternalLink size={12} color="var(--text-muted)" style={{ marginLeft: 'auto' }} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Map */}
        <div className="contact-map-wrapper" style={{
          borderRadius: '16px',
          overflow: 'hidden',
          border: '1px solid var(--border-soft)',
          height: '100%',
          minHeight: '550px' // Increased from 450px
        }}>
          <iframe
            src="https://maps.google.com/maps?q=RAU,+Indore,+Madhya+Pradesh&t=k&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: '550px' }} // Increased from 450px
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Location Map"
          />
        </div>
      </div>
    </motion.div>
  );
});

export default memo(Contact);
