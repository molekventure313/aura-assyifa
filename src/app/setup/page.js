'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { useToast } from '@/components/ui/Toast';

export default function SetupPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  const router = useRouter();
  const { showToast } = useToast();

  const handleSetup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    if (password !== confirmPassword) {
      setError('Kata laluan dan pengesahan kata laluan tidak sepadan.');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Kata laluan mestilah sekurang-kurangnya 6 aksara.');
      setLoading(false);
      return;
    }
    
    try {
      const res = await fetch('/api/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, password })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Penyediaan akaun Super Admin gagal');
      }
      
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (signInError) throw signInError;
      
      showToast('Akaun Super Admin berjaya dicipta!', 'success');
      setSuccess(true);
      
      setTimeout(() => {
        router.push('/dashboard/admin');
      }, 1500);
      
    } catch (err) {
      setError(err.message || 'Ralat berlaku semasa menyediakan akaun.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main 
      style={{ 
        minHeight: '100vh',
        background: '#08090C',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1rem',
        fontFamily: 'var(--font-inter), -apple-system, sans-serif',
        color: '#F9FAFB'
      }}
    >
      <div 
        style={{ 
          maxWidth: '440px',
          width: '100%',
          background: '#10131A',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '8px',
          padding: '2.25rem 2rem',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
          textAlign: 'left'
        }}
      >
        {/* Brand Header */}
        <div style={{ marginBottom: '1.75rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
            <span style={{ fontSize: '1.4rem', lineHeight: 1 }}>🌿</span>
            <span 
              style={{ 
                fontSize: '1.25rem', 
                fontWeight: 700, 
                color: '#F9FAFB', 
                letterSpacing: '-0.02em'
              }}
            >
              E-SYIFAA'
            </span>
          </div>
          <p style={{ fontSize: '0.675rem', fontWeight: 600, color: '#34D399', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>
            PENYEDIAAN PENTADBIR UTAMA (SUPER ADMIN)
          </p>
        </div>

        <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.08)', marginBottom: '1.5rem' }} />

        {success ? (
          <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto', fontSize: '1.25rem', fontWeight: 700, border: '1px solid rgba(16, 185, 129, 0.3)' }}>
              ✓
            </div>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#F9FAFB', marginBottom: '0.5rem' }}>
              Super Admin Berjaya Dicipta!
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#9CA3AF', margin: 0 }}>
              Mengarahkan anda ke papan pemuka kawalan...
            </p>
          </div>
        ) : (
          <>
            {/* Title */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h1 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#F9FAFB', margin: '0 0 0.25rem 0', letterSpacing: '-0.01em' }}>
                Setup Pentadbir Utama
              </h1>
              <p style={{ fontSize: '0.825rem', color: '#9CA3AF', margin: 0 }}>
                Cipta akaun Super Admin pertama untuk sistem ini.
              </p>
            </div>

            {/* Error Alert */}
            {error && (
              <div 
                style={{
                  background: 'rgba(239, 68, 68, 0.12)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: '6px',
                  padding: '0.75rem 0.85rem',
                  color: '#EF4444',
                  fontSize: '0.8rem',
                  marginBottom: '1.25rem',
                  fontWeight: 500
                }}
              >
                {error}
              </div>
            )}

            {/* Setup Form */}
            <form onSubmit={handleSetup}>
              <div style={{ marginBottom: '1.15rem' }}>
                <label style={{ display: 'block', marginBottom: '0.35rem', fontWeight: 500, fontSize: '0.8rem', color: '#D1D5DB' }}>
                  Nama Penuh
                </label>
                <input
                  type="text"
                  placeholder="Nama Pentadbir"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '0.7rem 0.85rem',
                    background: '#090A0F',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '6px',
                    color: '#F9FAFB',
                    fontSize: '0.875rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ marginBottom: '1.15rem' }}>
                <label style={{ display: 'block', marginBottom: '0.35rem', fontWeight: 500, fontSize: '0.8rem', color: '#D1D5DB' }}>
                  Alamat E-mel Super Admin
                </label>
                <input
                  type="email"
                  placeholder="admin@esyifaa.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '0.7rem 0.85rem',
                    background: '#090A0F',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '6px',
                    color: '#F9FAFB',
                    fontSize: '0.875rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ marginBottom: '1.15rem' }}>
                <label style={{ display: 'block', marginBottom: '0.35rem', fontWeight: 500, fontSize: '0.8rem', color: '#D1D5DB' }}>
                  Kata Laluan
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '0.7rem 0.85rem',
                    background: '#090A0F',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '6px',
                    color: '#F9FAFB',
                    fontSize: '0.875rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.35rem', fontWeight: 500, fontSize: '0.8rem', color: '#D1D5DB' }}>
                  Pengesahan Kata Laluan
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '0.7rem 0.85rem',
                    background: '#090A0F',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '6px',
                    color: '#F9FAFB',
                    fontSize: '0.875rem',
                    outline: 'none'
                  }}
                />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: '#064E3B',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: '6px',
                  color: '#34D399',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.7 : 1,
                  transition: 'all 0.15s ease'
                }}
              >
                {loading ? 'Cipta Akaun Super Admin...' : 'Cipta Akaun Super Admin'}
              </button>
            </form>

            <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)', fontSize: '0.8rem', color: '#6B7280', textAlign: 'center' }}>
              Dah ada akaun?{' '}
              <Link href="/login" style={{ color: '#34D399', fontWeight: 600, textDecoration: 'none' }}>
                Log masuk di sini
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

