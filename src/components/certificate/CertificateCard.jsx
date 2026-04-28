export default function CertificateCard({ userName, problemTitle, language, certId, date }) {
  const formattedDate = date
    ? new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
    : new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <div
      id="certificate-card"
      style={{
        width: '800px',
        height: '560px',
        background: 'linear-gradient(135deg, #0A0F2C 0%, #0D1B3E 50%, #0A0F2C 100%)',
        border: '4px solid transparent',
        borderRadius: '16px',
        backgroundClip: 'padding-box',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'Exo 2', sans-serif",
        boxSizing: 'border-box',
      }}
    >
      {/* Gold gradient border effect */}
      <div style={{
        position: 'absolute',
        inset: 0,
        borderRadius: '16px',
        padding: '4px',
        background: 'linear-gradient(135deg, #FFD700, #FF6B00, #FFD700, #FFA500)',
        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'xor',
        maskComposite: 'exclude',
        zIndex: 1,
      }} />

      {/* Rangoli corner decorations */}
      {[
        { top: 10, left: 10 },
        { top: 10, right: 10 },
        { bottom: 10, left: 10 },
        { bottom: 10, right: 10 },
      ].map((pos, i) => (
        <div key={i} style={{
          position: 'absolute',
          ...pos,
          width: '60px',
          height: '60px',
          zIndex: 2,
          opacity: 0.6,
        }}>
          <svg viewBox="0 0 60 60" fill="none">
            <circle cx="30" cy="30" r="25" stroke="#FFD700" strokeWidth="1.5" />
            <circle cx="30" cy="30" r="18" stroke="#FF6B00" strokeWidth="1" />
            <circle cx="30" cy="30" r="10" stroke="#FFD700" strokeWidth="1" />
            <line x1="5" y1="30" x2="55" y2="30" stroke="#FF6B00" strokeWidth="0.8" />
            <line x1="30" y1="5" x2="30" y2="55" stroke="#FF6B00" strokeWidth="0.8" />
            <line x1="12" y1="12" x2="48" y2="48" stroke="#FFD700" strokeWidth="0.6" />
            <line x1="48" y1="12" x2="12" y2="48" stroke="#FFD700" strokeWidth="0.6" />
          </svg>
        </div>
      ))}

      {/* Tricolor stripe top */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '6px', display: 'flex', zIndex: 3 }}>
        <div style={{ flex: 1, background: '#FF6B00' }} />
        <div style={{ flex: 1, background: '#FFFFFF' }} />
        <div style={{ flex: 1, background: '#138808' }} />
      </div>

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 4,
        padding: '40px 60px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}>
        {/* Logo */}
        <div style={{
          width: '64px',
          height: '64px',
          background: 'linear-gradient(135deg, #FF6B00, #FFD700)',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '32px',
          marginBottom: '8px',
          boxShadow: '0 0 30px rgba(255,107,0,0.5)',
        }}>
          💻
        </div>

        <p style={{ color: '#FFD700', fontSize: '12px', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '4px', fontWeight: 700 }}>
          UNITED INDIAN CODERS
        </p>

        <p style={{ color: '#94a3b8', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '28px' }}>
          Certificate of Achievement
        </p>

        {/* Divider */}
        <div style={{ width: '120px', height: '2px', background: 'linear-gradient(90deg, transparent, #FFD700, transparent)', marginBottom: '20px' }} />

        <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '8px' }}>THIS IS TO CERTIFY THAT</p>

        <h1 style={{
          color: '#FFFFFF',
          fontSize: '36px',
          fontWeight: 900,
          marginBottom: '12px',
          background: 'linear-gradient(90deg, #FF6B00, #FFD700)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          lineHeight: 1.2,
        }}>
          {userName}
        </h1>

        <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '6px' }}>has successfully completed</p>

        <h2 style={{ color: '#FFFFFF', fontSize: '20px', fontWeight: 700, marginBottom: '4px' }}>
          {problemTitle}
        </h2>
        <p style={{ color: '#FFD700', fontSize: '13px', marginBottom: '24px' }}>
          in {language} on United Indian Coders
        </p>

        {/* Divider */}
        <div style={{ width: '200px', height: '1px', background: 'linear-gradient(90deg, transparent, #FFD700, transparent)', marginBottom: '20px' }} />

        {/* Bottom info */}
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'flex-end' }}>
          <div style={{ textAlign: 'left' }}>
            <p style={{ color: '#FFD700', fontSize: '11px', fontWeight: 700, marginBottom: '2px' }}>DATE OF ISSUE</p>
            <p style={{ color: '#FFFFFF', fontSize: '13px' }}>{formattedDate}</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: '#FFD700', fontSize: '11px', fontWeight: 700, marginBottom: '2px' }}>CERTIFICATE ID</p>
            <p style={{ color: '#94a3b8', fontSize: '11px', fontFamily: 'monospace' }}>{certId}</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ color: '#FFD700', fontSize: '11px', fontWeight: 700, marginBottom: '2px' }}>SIGNED BY</p>
            <p style={{ color: '#FFFFFF', fontSize: '13px', fontStyle: 'italic' }}>United Indian Coders Team</p>
          </div>
        </div>
      </div>

      {/* Tricolor stripe bottom */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '6px', display: 'flex', zIndex: 3 }}>
        <div style={{ flex: 1, background: '#FF6B00' }} />
        <div style={{ flex: 1, background: '#FFFFFF' }} />
        <div style={{ flex: 1, background: '#138808' }} />
      </div>
    </div>
  )
}