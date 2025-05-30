import { ImageResponse } from 'next/og';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #FEF2F2 0%, #FEF3C7 100%)',
          fontSize: 28,
          fontWeight: 600,
          padding: 40,
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 64,
            fontWeight: 800,
            background: 'linear-gradient(90deg, #DC2626 0%, #F59E0B 100%)',
            backgroundClip: 'text',
            color: 'transparent',
            textAlign: 'center',
            marginBottom: 30,
            lineHeight: 1.1,
          }}
        >
          <div>McDonald's</div>
          <div>Macro Tracker</div>
        </div>

        {/* Features Grid */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 20,
            marginBottom: 30,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: 16,
              backgroundColor: 'white',
              borderRadius: 12,
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              width: 120,
            }}
          >
            <div style={{ fontSize: 36, marginBottom: 4 }}>🍔</div>
            <div style={{ fontSize: 16, color: '#374151', textAlign: 'center' }}>
              Track
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: 16,
              backgroundColor: 'white',
              borderRadius: 12,
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              width: 120,
            }}
          >
            <div style={{ fontSize: 36, marginBottom: 4 }}>💪</div>
            <div style={{ fontSize: 16, color: '#374151', textAlign: 'center' }}>
              Macros
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: 16,
              backgroundColor: 'white',
              borderRadius: 12,
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              width: 120,
            }}
          >
            <div style={{ fontSize: 36, marginBottom: 4 }}>🥑</div>
            <div style={{ fontSize: 16, color: '#374151', textAlign: 'center' }}>
              Keto
            </div>
          </div>
        </div>

        {/* Stats */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 24,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            padding: '16px 24px',
            borderRadius: 12,
            border: '2px solid #DC2626',
            marginBottom: 20,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#DC2626' }}>500+</div>
            <div style={{ fontSize: 12, color: '#6B7280' }}>Cal</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#2563EB' }}>25g</div>
            <div style={{ fontSize: 12, color: '#6B7280' }}>Protein</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#F59E0B' }}>15g</div>
            <div style={{ fontSize: 12, color: '#6B7280' }}>Fat</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#F97316' }}>45g</div>
            <div style={{ fontSize: 12, color: '#6B7280' }}>Carbs</div>
          </div>
        </div>

        {/* Bottom text */}
        <div
          style={{
            fontSize: 18,
            color: '#6B7280',
            textAlign: 'center',
          }}
        >
          Perfect for Fitness • Keto • Macro Counting
        </div>
      </div>
    ),
    {
      width: 1080,
      height: 1080,
    },
  );
} 