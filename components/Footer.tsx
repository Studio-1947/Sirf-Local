'use client';

import { useState } from 'react';
import Image from 'next/image';

const socials = [
  {
    name: 'Instagram',
    href: 'https://instagram.com/sirflocal',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    name: 'X (Twitter)',
    href: 'https://x.com/sirflocal',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    name: 'Bluesky',
    href: 'https://bsky.app/profile/sirflocal.bsky.social',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.204-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8z"/>
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: 'https://facebook.com/sirflocal',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
];

function SocialLink({ social }: { social: typeof socials[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      title={social.name}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '40px', height: '40px', borderRadius: '10px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: hovered ? 'rgba(120,15,240,0.12)' : 'rgba(255,255,255,0.04)',
        border: `1px solid ${hovered ? 'rgba(120,15,240,0.35)' : '#525252'}`,
        color: hovered ? '#780FF0' : '#6B6B6B',
        transition: 'all 0.2s',
        textDecoration: 'none',
      }}
    >
      {social.icon}
    </a>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: '#1F1E1F', borderTop: '1px solid #525252' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>

          {/* Logo + tagline */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <Image src="/Logo.svg" alt="Sirf Local" width={110} height={36} style={{ height: '36px', width: 'auto', objectFit: 'contain' }} />
            <div style={{ width: '1px', height: '28px', background: '#525252' }} />
            <p style={{ color: '#6B6B6B', fontSize: '12px', fontFamily: 'Fragment Mono, monospace', letterSpacing: '0.05em' }}>
              An initiative by Studio 1947 · Mirik, Darjeeling
            </p>
          </div>

          {/* Socials */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {socials.map((s) => <SocialLink key={s.name} social={s} />)}
          </div>

        </div>

        {/* Bottom bar */}
        <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #383838', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <p style={{ color: '#6B6B6B', fontSize: '11px', fontFamily: 'Fragment Mono, monospace', letterSpacing: '0.08em' }}>
            © {year} Sirf Local. All rights reserved.
          </p>
          <p style={{ color: '#6B6B6B', fontSize: '11px', fontFamily: 'Fragment Mono, monospace', letterSpacing: '0.08em' }}>
            Built with ♥ for local businesses
          </p>
        </div>
      </div>
    </footer>
  );
}
