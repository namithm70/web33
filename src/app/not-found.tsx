import { Box, Container, Typography, Button } from '@mui/material'
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material'
import Link from 'next/link'

export default function NotFound() {
  return (
    <Box sx={{ 
      minHeight: '100vh', 
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
    }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '6rem', md: '8rem' },
              fontWeight: 800,
              color: '#6366f1',
              mb: 2,
            }}
          >
            404
          </Typography>
          
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: '#1a1a1a',
              mb: 2,
            }}
          >
            Page Not Found
          </Typography>
          
          <Typography
            variant="h6"
            sx={{
              color: '#6b7280',
              mb: 4,
              maxWidth: 500,
              mx: 'auto',
            }}
          >
            The page you're looking for doesn't exist or has been moved.
          </Typography>
          
          <Link href="/" passHref>
            <Button
              variant="contained"
              size="large"
              startIcon={<ArrowBackIcon />}
              sx={{
                background: 'linear-gradient(45deg, #6366f1, #4f46e5)',
                px: 4,
                py: 2,
                fontSize: '1.1rem',
                fontWeight: 600,
                '&:hover': {
                  background: 'linear-gradient(45deg, #4f46e5, #3730a3)',
                }
              }}
            >
              Back to Home
            </Button>
          </Link>
        </Box>
      </Container>
    </Box>
  )
}
