"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";

function GoogleMapsIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 92.3 132.3"
      width={size}
      height={size}
      style={{ display: "block" }}
    >
      <path
        fill="#1a73e8"
        d="M60.2 2.2C55.8.8 51 0 46.1 0 32 0 19.3 6.4 10.8 16.5l21.8 18.3L60.2 2.2z"
      />
      <path
        fill="#ea4335"
        d="M10.8 16.5C4.1 24.5 0 34.9 0 46.1c0 8.7 1.7 15.7 4.6 22l28-33.3-21.8-18.3z"
      />
      <path
        fill="#4285f4"
        d="M46.2 28.5c9.8 0 17.7 7.9 17.7 17.7 0 4.3-1.6 8.3-4.2 11.4 0 0 13.9-16.6 27.5-32.7-5.6-10.8-15.3-19-27-22.7L32.6 34.8c3.3-3.8 8.1-6.3 13.6-6.3"
      />
      <path
        fill="#fbbc04"
        d="M46.2 63.8c-9.8 0-17.7-7.9-17.7-17.7 0-4.3 1.5-8.3 4.1-11.3l-28 33.3c4.8 10.6 12.8 19.2 21 29.9l34.1-40.5c-3.3 3.9-8.1 6.3-13.5 6.3"
      />
      <path
        fill="#34a853"
        d="M59.1 109.2c15.4-24.1 33.3-35 33.3-63 0-7.7-1.9-14.9-5.2-21.3L25.6 98c2.6 3.4 5.3 7.3 7.9 11.3 9.4 14.5 6.8 23.1 12.8 23.1s3.4-8.7 12.8-23.2"
      />
    </svg>
  );
}

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 360 362"
      width={size}
      height={size}
      style={{ display: "block" }}
    >
      <path
        fill="#25D366"
        fillRule="evenodd"
        d="M307.546 52.566C273.709 18.684 228.706.017 180.756 0 81.951 0 1.538 80.404 1.504 179.235c-.017 31.594 8.242 62.432 23.928 89.609L0 361.736l95.024-24.925c26.179 14.285 55.659 21.805 85.655 21.814h.077c98.788 0 179.21-80.413 179.244-179.244.017-47.898-18.608-92.926-52.454-126.807v-.008Zm-126.79 275.788h-.06c-26.73-.008-52.952-7.194-75.831-20.765l-5.44-3.231-56.391 14.791 15.05-54.981-3.542-5.638c-14.912-23.721-22.793-51.139-22.776-79.286.035-82.14 66.867-148.973 149.051-148.973 39.793.017 77.198 15.53 105.328 43.695 28.131 28.157 43.61 65.596 43.593 105.398-.035 82.149-66.867 148.982-148.982 148.982v.008Zm81.719-111.577c-4.478-2.243-26.497-13.073-30.606-14.568-4.108-1.496-7.09-2.243-10.073 2.243-2.982 4.487-11.568 14.577-14.181 17.559-2.613 2.991-5.226 3.361-9.704 1.117-4.477-2.243-18.908-6.97-36.02-22.226-13.313-11.878-22.304-26.54-24.916-31.027-2.613-4.486-.275-6.91 1.959-9.136 2.011-2.011 4.478-5.234 6.721-7.847 2.244-2.613 2.983-4.486 4.478-7.469 1.496-2.991.748-5.603-.369-7.847-1.118-2.243-10.073-24.289-13.812-33.253-3.636-8.732-7.331-7.546-10.073-7.692-2.613-.13-5.595-.155-8.586-.155-2.991 0-7.839 1.118-11.947 5.604-4.108 4.486-15.677 15.324-15.677 37.361s16.047 43.344 18.29 46.335c2.243 2.991 31.585 48.225 76.51 67.632 10.684 4.615 19.029 7.374 25.535 9.437 10.727 3.412 20.49 2.931 28.208 1.779 8.604-1.289 26.498-10.838 30.228-21.298 3.73-10.46 3.73-19.433 2.613-21.298-1.117-1.865-4.108-2.991-8.586-5.234l.008-.017Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function GmailIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 49.4 512 399.42"
      width={size}
      height={size}
      style={{ display: "block" }}
    >
      <g fill="none" fillRule="evenodd">
        <g fillRule="nonzero">
          <path
            fill="#4285f4"
            d="M34.91 448.818h81.454V251L0 163.727V413.91c0 19.287 15.622 34.91 34.91 34.91z"
          />
          <path
            fill="#34a853"
            d="M395.636 448.818h81.455c19.287 0 34.909-15.622 34.909-34.909V163.727L395.636 251z"
          />
          <path
            fill="#fbbc04"
            d="M395.636 99.727V251L512 163.727v-46.545c0-43.142-49.25-67.782-83.782-41.891z"
          />
        </g>
        <path
          fill="#ea4335"
          d="M116.364 251V99.727L256 204.455 395.636 99.727V251L256 355.727z"
        />
        <path
          fill="#c5221f"
          fillRule="nonzero"
          d="M0 117.182v46.545L116.364 251V99.727L83.782 75.291C49.25 49.4 0 74.04 0 117.18z"
        />
      </g>
    </svg>
  );
}

const SERVICES = [
  "Monthly Reels",
  "Monthly Content Posts",
  "The Brand Makeover",
  "Premium Product Packaging",
  "Your One-Page Website",
  "Catchy Social Media Posts",
  "Your WhatsApp Shop",
  "The Professional Look (Logo + Business Cards)",
  "Get Found on Google Maps",
  "Not sure yet — need guidance",
];

const contactInfo: {
  icon: React.ComponentType<{
    size?: number;
    color?: string;
    strokeWidth?: number;
  }> | null;
  label: string;
  value: string;
  href: string;
}[] = [
  {
    icon: null,
    label: "Email",
    value: "hello@sirflocal.in",
    href: "mailto:hello@sirflocal.in",
  },
  {
    icon: null,
    label: "WhatsApp",
    value: "+91 90932 77919",
    href: "https://wa.me/919093277919",
  },
  {
    icon: null,
    label: "Location",
    value: "Mirik, Darjeeling, West Bengal",
    href: "https://maps.google.com/?q=Mirik,Darjeeling",
  },
];

function InputField({
  label,
  type = "text",
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
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <label
        style={{
          color: "#6B6B6B",
          fontSize: "11px",
          fontFamily: "Fragment Mono, monospace",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
        }}
      >
        {label}
        {required && (
          <span style={{ color: "#780FF0", marginLeft: "3px" }}>*</span>
        )}
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
          background: "#1F1E1F",
          border: `1px solid ${focused ? "#780FF0" : "#525252"}`,
          borderRadius: "12px",
          padding: "12px 16px",
          color: "#FFFFFF",
          fontSize: "14px",
          outline: "none",
          transition: "border-color 0.2s",
          width: "100%",
          boxSizing: "border-box",
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
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <label
        style={{
          color: "#6B6B6B",
          fontSize: "11px",
          fontFamily: "Fragment Mono, monospace",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          background: "#1F1E1F",
          border: `1px solid ${focused ? "#780FF0" : "#525252"}`,
          borderRadius: "12px",
          padding: "12px 16px",
          color: value ? "#FFFFFF" : "#6B6B6B",
          fontSize: "14px",
          outline: "none",
          transition: "border-color 0.2s",
          width: "100%",
          cursor: "pointer",
          appearance: "none",
        }}
      >
        <option value="" disabled>
          Select a service…
        </option>
        {SERVICES.map((s) => (
          <option
            key={s}
            value={s}
            style={{ background: "#383838", color: "#FFFFFF" }}
          >
            {s}
          </option>
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
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <label
        style={{
          color: "#6B6B6B",
          fontSize: "11px",
          fontFamily: "Fragment Mono, monospace",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
        }}
      >
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
          background: "#1F1E1F",
          border: `1px solid ${focused ? "#780FF0" : "#525252"}`,
          borderRadius: "12px",
          padding: "12px 16px",
          color: "#FFFFFF",
          fontSize: "14px",
          outline: "none",
          transition: "border-color 0.2s",
          width: "100%",
          resize: "none",
          boxSizing: "border-box",
          fontFamily: "Inter, sans-serif",
        }}
      />
    </div>
  );
}

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [form, setForm] = useState({
    name: "",
    business: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section
      id="contact"
      style={{
        background: "#1F1E1F",
        padding: "96px 0",
        borderTop: "1px solid #525252",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
        <div
          ref={ref}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            alignItems: "start",
          }}
        >
          {/* LEFT — Text + Contact Info */}
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="section-tag"
              style={{ display: "inline-block", marginBottom: "16px" }}
            >
              Get In Touch
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.7 }}
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 900,
                color: "#FFFFFF",
                lineHeight: 1.15,
                letterSpacing: "-0.5px",
                marginBottom: "20px",
              }}
            >
              Let&apos;s Build Something{" "}
              <span style={{ color: "#780FF0" }}>Together</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              style={{
                color: "#858585",
                fontSize: "16px",
                lineHeight: 1.7,
                marginBottom: "40px",
                maxWidth: "460px",
              }}
            >
              Whether you have a homestay in the hills or a shop in the market,
              we&apos;re here to bring your story online. Reach out — let&apos;s
              start.
            </motion.p>

            {/* Contact info cards */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
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
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    padding: "16px 20px",
                    background: "#1F1E1F",
                    border: "1px solid #525252",
                    borderRadius: "14px",
                    textDecoration: "none",
                    transition: "border-color 0.2s, background 0.2s",
                  }}
                  whileHover={{
                    borderColor: "rgba(120,15,240,0.35)",
                    backgroundColor: "#383838",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "10px",
                      background: "rgba(120,15,240,0.08)",
                      border: "1px solid rgba(120,15,240,0.18)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {label === "Email" ? (
                      <GmailIcon size={20} />
                    ) : label === "WhatsApp" ? (
                      <WhatsAppIcon size={20} />
                    ) : label === "Location" ? (
                      <GoogleMapsIcon size={20} />
                    ) : Icon ? (
                      <Icon size={18} color="#780FF0" strokeWidth={1.8} />
                    ) : null}
                  </div>
                  <div>
                    <p
                      style={{
                        color: "#6B6B6B",
                        fontSize: "11px",
                        fontFamily: "Fragment Mono, monospace",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        marginBottom: "2px",
                      }}
                    >
                      {label}
                    </p>
                    <p
                      style={{
                        color: "#FFFFFF",
                        fontSize: "14px",
                        fontWeight: 600,
                      }}
                    >
                      {value}
                    </p>
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
            style={{
              background: "#1F1E1F",
              border: "1px solid #525252",
              borderRadius: "24px",
              padding: "36px",
            }}
          >
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "360px",
                    gap: "16px",
                    textAlign: "center",
                  }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 18,
                      delay: 0.1,
                    }}
                  >
                    <CheckCircle size={56} color="#A463EE" strokeWidth={1.5} />
                  </motion.div>
                  <h3
                    style={{
                      color: "#FFFFFF",
                      fontSize: "22px",
                      fontWeight: 900,
                      marginTop: "8px",
                    }}
                  >
                    Message Received!
                  </h3>
                  <p
                    style={{
                      color: "#858585",
                      fontSize: "15px",
                      lineHeight: 1.6,
                      maxWidth: "280px",
                    }}
                  >
                    We&apos;ll get back to you within 24 hours. Check your
                    WhatsApp too!
                  </p>
                  <button
                    onClick={() => {
                      setSent(false);
                      setForm({
                        name: "",
                        business: "",
                        email: "",
                        phone: "",
                        service: "",
                        message: "",
                      });
                    }}
                    style={{
                      marginTop: "8px",
                      color: "#780FF0",
                      fontSize: "13px",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
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
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                  }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "16px",
                    }}
                  >
                    <InputField
                      label="Your Name"
                      value={form.name}
                      onChange={(v) => setForm({ ...form, name: v })}
                      placeholder="Anjali Chettri"
                      required
                    />
                    <InputField
                      label="Business Name"
                      value={form.business}
                      onChange={(v) => setForm({ ...form, business: v })}
                      placeholder="Mirik Homestay"
                    />
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "16px",
                    }}
                  >
                    <InputField
                      label="Email"
                      type="email"
                      value={form.email}
                      onChange={(v) => setForm({ ...form, email: v })}
                      placeholder="you@email.com"
                      required
                    />
                    <InputField
                      label="Phone / WhatsApp"
                      type="tel"
                      value={form.phone}
                      onChange={(v) => setForm({ ...form, phone: v })}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <SelectField
                    label="Interested Service"
                    value={form.service}
                    onChange={(v) => setForm({ ...form, service: v })}
                  />
                  <TextareaField
                    label="Tell Us About Your Business"
                    value={form.message}
                    onChange={(v) => setForm({ ...form, message: v })}
                    placeholder="I run a homestay in Mirik and I want to..."
                  />

                  <button
                    type="submit"
                    onMouseEnter={() => setBtnHovered(true)}
                    onMouseLeave={() => setBtnHovered(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                      padding: "14px 28px",
                      borderRadius: "999px",
                      background: btnHovered ? "#8E3AEE" : "#780FF0",
                      color: "#FFFFFF",
                      fontWeight: 700,
                      fontSize: "15px",
                      border: "none",
                      cursor: "pointer",
                      transition: "background 0.2s, transform 0.15s",
                      transform: btnHovered ? "scale(1.02)" : "scale(1)",
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
