'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { MapPin, Mail, MessageCircle, Send, CheckCircle } from 'lucide-react';

const SERVICES = [
  'Monthly Reels',
  'Monthly Content Posts',
  'The Brand Makeover',
  'Premium Product Packaging',
  'Your One-Page Website',
  'Catchy Social Media Posts',
  'Your WhatsApp Shop',
  'The Professional Look (Logo + Business Cards)',
  'Get Found on Google Maps',
  'Not sure yet — need guidance',
];

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@sirflocal.in',
    href: 'mailto:hello@sirflocal.in',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+91 90932 77919',
    href: 'https://wa.me/919093277919',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Mirik, Darjeeling, West Bengal',
    href: 'https://maps.google.com/?q=Mirik,Darjeeling',
  },
];

function InputField({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <label style={{ color: '#6B6B6B', fontSize: '11px', fontFamily: 'Fragment Mono, monospace', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
        {label}{required && <span style={{ color: '#780FF0', marginLeft: '3px' }}>*</span>}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        style={{
          background: '#1F1E1F',
          border: `1px solid ${focused ? '#780FF0' : '#525252'}`,
          borderRadius: '12px',
          padding: '12px 16px',
          color: '#FFFFFF',
          fontSize: '14px',
          outline: 'none',
          transition: 'border-color 0.2s',
          width: '100%',
          boxSizing: 'border-box',
        }}
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <label style={{ color: '#6B6B6B', fontSize: '11px', fontFamily: 'Fragment Mono, monospace', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          background: '#1F1E1F',
          border: `1px solid ${focused ? '#780FF0' : '#525252'}`,
          borderRadius: '12px',
          padding: '12px 16px',
          color: value ? '#FFFFFF' : '#6B6B6B',
          fontSize: '14px',
          outline: 'none',
          transition: 'border-color 0.2s',
          width: '100%',
          cursor: 'pointer',
          appearance: 'none',
        }}
      >
        <option value="" disabled>Select a service…</option>
        {SERVICES.map((s) => (
          <option key={s} value={s} style={{ background: '#383838', color: '#FFFFFF' }}>{s}</option>
        ))}
      </select>
    </div>
  );
}

function TextareaField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <label style={{ color: '#6B6B6B', fontSize: '11px', fontFamily: 'Fragment Mono, monospace', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
        {label}
      </label>
      <textarea
        rows={4}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        style={{
          background: '#1F1E1F',
          border: `1px solid ${focused ? '#780FF0' : '#525252'}`,
          borderRadius: '12px',
          padding: '12px 16px',
          color: '#FFFFFF',
          fontSize: '14px',
          outline: 'none',
          transition: 'border-color 0.2s',
          width: '100%',
          resize: 'none',
          boxSizing: 'border-box',
          fontFamily: 'Inter, sans-serif',
        }}
      />
    </div>
  );
}

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [form, setForm] = useState({ name: '', business: '', email: '', phone: '', service: '', message: '' });
  const [sent, setSent] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" style={{ background: '#1F1E1F', padding: '96px 0', borderTop: '1px solid #525252' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <div
          ref={ref}
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}
        >
          {/* LEFT — Text + Contact Info */}
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="section-tag"
              style={{ display: 'inline-block', marginBottom: '16px' }}
            >
              Get In Touch
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.7 }}
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: '#FFFFFF', lineHeight: 1.15, letterSpacing: '-0.5px', marginBottom: '20px' }}
            >
              Let&apos;s Build Something{' '}
              <span style={{ color: '#780FF0' }}>Together</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              style={{ color: '#858585', fontSize: '16px', lineHeight: 1.7, marginBottom: '40px', maxWidth: '460px' }}
            >
              Whether you have a homestay in the hills or a shop in the market,
              we&apos;re here to bring your story online. Reach out — let&apos;s start.
            </motion.p>

            {/* Contact info cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {contactInfo.map(({ icon: Icon, label, value, href }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.38 + i * 0.08 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '16px',
                    padding: '16px 20px',
                    background: '#1F1E1F',
                    border: '1px solid #525252',
                    borderRadius: '14px',
                    textDecoration: 'none',
                    transition: 'border-color 0.2s, background 0.2s',
                  }}
                  whileHover={{ borderColor: 'rgba(120,15,240,0.35)', backgroundColor: '#383838' }}
                >
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '10px',
                    background: 'rgba(120,15,240,0.08)', border: '1px solid rgba(120,15,240,0.18)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <Icon size={18} color="#780FF0" strokeWidth={1.8} />
                  </div>
                  <div>
                    <p style={{ color: '#6B6B6B', fontSize: '11px', fontFamily: 'Fragment Mono, monospace', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '2px' }}>
                      {label}
                    </p>
                    <p style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: 600 }}>{value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* RIGHT — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.7 }}
            style={{ background: '#1F1E1F', border: '1px solid #525252', borderRadius: '24px', padding: '36px' }}
          >
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '360px', gap: '16px', textAlign: 'center' }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}
                  >
                    <CheckCircle size={56} color="#A463EE" strokeWidth={1.5} />
                  </motion.div>
                  <h3 style={{ color: '#FFFFFF', fontSize: '22px', fontWeight: 900, marginTop: '8px' }}>Message Received!</h3>
                  <p style={{ color: '#858585', fontSize: '15px', lineHeight: 1.6, maxWidth: '280px' }}>
                    We&apos;ll get back to you within 24 hours. Check your WhatsApp too!
                  </p>
                  <button
                    onClick={() => { setSent(false); setForm({ name: '', business: '', email: '', phone: '', service: '', message: '' }); }}
                    style={{ marginTop: '8px', color: '#780FF0', fontSize: '13px', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
                >
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <InputField label="Your Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="Anjali Chettri" required />
                    <InputField label="Business Name" value={form.business} onChange={(v) => setForm({ ...form, business: v })} placeholder="Mirik Homestay" />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <InputField label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} placeholder="you@email.com" required />
                    <InputField label="Phone / WhatsApp" type="tel" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} placeholder="+91 98765 43210" />
                  </div>
                  <SelectField label="Interested Service" value={form.service} onChange={(v) => setForm({ ...form, service: v })} />
                  <TextareaField label="Tell Us About Your Business" value={form.message} onChange={(v) => setForm({ ...form, message: v })} placeholder="I run a homestay in Mirik and I want to..." />

                  <button
                    type="submit"
                    onMouseEnter={() => setBtnHovered(true)}
                    onMouseLeave={() => setBtnHovered(false)}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                      padding: '14px 28px', borderRadius: '999px',
                      background: btnHovered ? '#8E3AEE' : '#780FF0',
                      color: '#FFFFFF', fontWeight: 700, fontSize: '15px',
                      border: 'none', cursor: 'pointer',
                      transition: 'background 0.2s, transform 0.15s',
                      transform: btnHovered ? 'scale(1.02)' : 'scale(1)',
                    }}
                  >
                    <Send size={16} strokeWidth={2.5} />
                    Send Message
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
