import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      fontFamily: 'Inter, system-ui, sans-serif'
    }}>
      <div style={{ textAlign: 'center', maxWidth: '600px', padding: '2rem' }}>
        <h1 style={{
          fontSize: 'clamp(4rem, 8vw, 8rem)',
          fontWeight: 800,
          color: '#6366f1',
          margin: '0 0 1rem 0',
          lineHeight: 1
        }}>
          404
        </h1>
        
        <h2 style={{
          fontSize: 'clamp(1.5rem, 4vw, 2rem)',
          fontWeight: 700,
          color: '#1a1a1a',
          margin: '0 0 1rem 0'
        }}>
          Page Not Found
        </h2>
        
        <p style={{
          fontSize: '1.125rem',
          color: '#6b7280',
          margin: '0 0 2rem 0',
          lineHeight: 1.6
        }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <Link href="/" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'linear-gradient(45deg, #6366f1, #4f46e5)',
          color: 'white',
          padding: '0.75rem 2rem',
          borderRadius: '12px',
          textDecoration: 'none',
          fontWeight: 600,
          fontSize: '1.1rem',
          transition: 'all 0.2s ease',
          boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)'
        }}>
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}
