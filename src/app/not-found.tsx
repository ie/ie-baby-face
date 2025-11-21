import Main from '@/components/main'
import { BlackContainer, WhiteContainer } from '@/styles/global'
import Heading from '@/components/heading'

export default function NotFound() {
  return (
    <Main>
      <WhiteContainer>
        <Heading>404</Heading>
      </WhiteContainer>
      <BlackContainer>
        <div style={{ padding: '2rem' }}>
          <h3 style={{ fontFamily: 'Gotham', fontSize: '1.5rem', marginBottom: '1rem' }}>
            Page Not Found
          </h3>
          <p style={{ fontFamily: 'Gotham Book' }}>
            The page you&apos;re looking for doesn&apos;t exist.
          </p>
          <a 
            href="/" 
            style={{ 
              color: '#ff9500', 
              fontFamily: 'Gotham', 
              textDecoration: 'none',
              marginTop: '1rem',
              display: 'inline-block'
            }}
          >
            ← Go Home
          </a>
        </div>
      </BlackContainer>
    </Main>
  )
}
