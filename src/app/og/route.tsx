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
          fontSize: 32,
          fontWeight: 600,
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 40,
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              background: 'linear-gradient(90deg, #DC2626 0%, #F59E0B 100%)',
              backgroundClip: 'text',
              color: 'transparent',
              textAlign: 'center',
            }}
          >
            McDonald's Macro Tracker
          </div>
        </div>

        {/* Features */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            width: '100%',
            maxWidth: 1000,
            marginBottom: 40,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: 20,
              backgroundColor: 'white',
              borderRadius: 16,
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              margin: 10,
            }}
          >
            <div style={{ fontSize: 48, marginBottom: 8 }}>🍔</div>
            <div style={{ fontSize: 24, color: '#374151', textAlign: 'center' }}>
              Track Nutrition
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: 20,
              backgroundColor: 'white',
              borderRadius: 16,
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              margin: 10,
            }}
          >
            <div style={{ fontSize: 48, marginBottom: 8 }}>💪</div>
            <div style={{ fontSize: 24, color: '#374151', textAlign: 'center' }}>
              Count Macros
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: 20,
              backgroundColor: 'white',
              borderRadius: 16,
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              margin: 10,
            }}
          >
            <div style={{ fontSize: 48, marginBottom: 8 }}>🥑</div>
            <div style={{ fontSize: 24, color: '#374151', textAlign: 'center' }}>
              Keto Friendly
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
            gap: 40,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            padding: '20px 40px',
            borderRadius: 12,
            border: '2px solid #DC2626',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontSize: 36, fontWeight: 700, color: '#DC2626' }}>500+</div>
            <div style={{ fontSize: 18, color: '#6B7280' }}>Calories</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontSize: 36, fontWeight: 700, color: '#2563EB' }}>25g</div>
            <div style={{ fontSize: 18, color: '#6B7280' }}>Protein</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontSize: 36, fontWeight: 700, color: '#F59E0B' }}>15g</div>
            <div style={{ fontSize: 18, color: '#6B7280' }}>Fat</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontSize: 36, fontWeight: 700, color: '#F97316' }}>45g</div>
            <div style={{ fontSize: 18, color: '#6B7280' }}>Carbs</div>
          </div>
        </div>

        {/* Bottom text */}
        <div
          style={{
            marginTop: 30,
            fontSize: 24,
            color: '#6B7280',
            textAlign: 'center',
          }}
        >
          Perfect for Fitness • Keto • Macro Counting
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
} 