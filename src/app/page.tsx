'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Stack,
  Chip,
  Avatar,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import {
  TrendingUp as TrendingUpIcon,
  AccountBalance as AccountBalanceIcon,
  Agriculture as AgricultureIcon,
  ShowChart as ShowChartIcon,
  ArrowForward as ArrowForwardIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon,
  Verified as VerifiedIcon,
  Star as StarIcon,
  People as PeopleIcon,
  AttachMoney as MoneyIcon,
  Timeline as TimelineIcon,
} from '@mui/icons-material'
import Header from '../components/Header'

export default function HomePage() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const router = useRouter()
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    setAnimate(true)
  }, [])

  const handleStartTrading = () => {
    router.push('/trade')
  }

  const handleGetStarted = () => {
    router.push('/stake')
  }

  const features = [
    {
      icon: <ShowChartIcon sx={{ fontSize: 40, color: '#7C3AED' }} />,
      title: 'Instant Trading',
      description: 'Swap tokens with lightning-fast execution and minimal slippage',
      path: '/trade',
      gradient: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)',
    },
    {
      icon: <AccountBalanceIcon sx={{ fontSize: 40, color: '#10B981' }} />,
      title: 'Smart Staking',
      description: 'Earn passive income with our optimized staking protocols',
      path: '/stake',
      gradient: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
    },
    {
      icon: <AgricultureIcon sx={{ fontSize: 40, color: '#F59E0B' }} />,
      title: 'Liquidity Farming',
      description: 'Provide liquidity and earn rewards from multiple sources',
      path: '/farm',
      gradient: 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)',
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 40, color: '#EF4444' }} />,
      title: 'Portfolio Analytics',
      description: 'Track your performance with advanced analytics and insights',
      path: '/portfolio',
      gradient: 'linear-gradient(135deg, #EF4444 0%, #F87171 100%)',
    },
  ]

  const stats = [
    { label: 'Total Value Locked', value: '$2.4B', icon: <MoneyIcon /> },
    { label: 'Active Users', value: '125K+', icon: <PeopleIcon /> },
    { label: 'APY Average', value: '12.5%', icon: <TimelineIcon /> },
    { label: 'Security Score', value: '99.9%', icon: <SecurityIcon /> },
  ]

  const benefits = [
    {
      icon: <SecurityIcon sx={{ fontSize: 32, color: '#10B981' }} />,
      title: 'Battle-Tested Security',
      description: 'Multi-layer security with audited smart contracts',
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 32, color: '#7C3AED' }} />,
      title: 'Lightning Fast',
      description: 'Sub-second transaction times with minimal gas fees',
    },
    {
      icon: <VerifiedIcon sx={{ fontSize: 32, color: '#F59E0B' }} />,
      title: 'Transparent Yields',
      description: 'Real-time yield calculations with no hidden fees',
    },
  ]

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #FAFAFA 0%, #F3F4F6 100%)' }}>
      <Header />
      
      {/* Hero Section */}
      <Box 
        sx={{ 
          pt: { xs: 12, md: 16 },
          pb: { xs: 8, md: 12 },
          background: 'linear-gradient(135deg, #FAFAFA 0%, #F3F4F6 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background Elements */}
        <Box
          sx={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.1) 0%, rgba(167, 139, 250, 0.1) 100%)',
            borderRadius: '50%',
            filter: 'blur(80px)',
            animation: animate ? 'float 6s ease-in-out infinite' : 'none',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -50,
            left: -50,
            width: 300,
            height: 300,
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(52, 211, 153, 0.1) 100%)',
            borderRadius: '50%',
            filter: 'blur(60px)',
            animation: animate ? 'float 8s ease-in-out infinite reverse' : 'none',
          }}
        />

        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  opacity: animate ? 1 : 0,
                  transform: animate ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'all 0.8s ease-out',
                }}
              >
                <Chip
                  label="🚀 Next Generation DeFi"
                  sx={{
                    background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)',
                    color: 'white',
                    fontWeight: 600,
                    mb: 3,
                    px: 2,
                    py: 1,
                  }}
                />
                
                <Typography
                  variant="h1"
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                    lineHeight: 1.1,
                    mb: 3,
                    background: 'linear-gradient(135deg, #1F2937 0%, #374151 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Trade, Stake & Farm with
                  <Box component="span" sx={{ 
                    background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}>
                    {' '}Confidence
                  </Box>
                </Typography>
                
                <Typography
                  variant="h5"
                  sx={{
                    color: theme.palette.text.secondary,
                    mb: 4,
                    lineHeight: 1.6,
                    fontWeight: 400,
                  }}
                >
                  Experience the future of decentralized finance with our cutting-edge platform. 
                  Swap tokens, earn yields, and grow your portfolio with institutional-grade security.
                </Typography>
                
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleStartTrading}
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      px: 4,
                      py: 2,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      borderRadius: 3,
                      background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)',
                      boxShadow: '0 8px 25px rgba(124, 58, 237, 0.3)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #6D28D9 0%, #8B5CF6 100%)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 12px 35px rgba(124, 58, 237, 0.4)',
                      }
                    }}
                  >
                    Start Trading
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={handleGetStarted}
                    sx={{
                      px: 4,
                      py: 2,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      borderRadius: 3,
                      borderWidth: 2,
                      borderColor: '#7C3AED',
                      color: '#7C3AED',
                      '&:hover': {
                        borderWidth: 2,
                        background: 'rgba(124, 58, 237, 0.08)',
                        transform: 'translateY(-2px)',
                      }
                    }}
                  >
                    Get Started
                  </Button>
                </Stack>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  opacity: animate ? 1 : 0,
                  transform: animate ? 'translateX(0)' : 'translateX(30px)',
                  transition: 'all 0.8s ease-out 0.2s',
                  position: 'relative',
                }}
              >
                <Card
                  sx={{
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: 4,
                    p: 4,
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 700, color: '#7C3AED' }}>
                    Platform Stats
                  </Typography>
                  <Grid container spacing={3}>
                    {stats.map((stat, index) => (
                      <Grid item xs={6} key={index}>
                        <Box
                          sx={{
                            textAlign: 'center',
                            p: 2,
                            borderRadius: 2,
                            background: 'rgba(124, 58, 237, 0.05)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              background: 'rgba(124, 58, 237, 0.1)',
                              transform: 'translateY(-2px)',
                            }
                          }}
                        >
                          <Box sx={{ color: '#7C3AED', mb: 1 }}>
                            {stat.icon}
                          </Box>
                          <Typography variant="h4" sx={{ fontWeight: 800, color: '#1F2937', mb: 0.5 }}>
                            {stat.value}
                          </Typography>
                          <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontWeight: 500 }}>
                            {stat.label}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Card>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: { xs: 8, md: 12 }, background: 'white' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                mb: 2,
                background: 'linear-gradient(135deg, #1F2937 0%, #374151 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Everything You Need
            </Typography>
            <Typography variant="h5" sx={{ color: theme.palette.text.secondary, maxWidth: 600, mx: 'auto' }}>
              Comprehensive DeFi tools designed for both beginners and advanced users
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} lg={3} key={index}>
                <Card
                  onClick={() => router.push(feature.path)}
                  sx={{
                    height: '100%',
                    cursor: 'pointer',
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: 3,
                    p: 4,
                    textAlign: 'center',
                    transition: 'all 0.3s ease-in-out',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
                    }
                  }}
                >
                  <Box sx={{ mb: 3 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: '#1F2937' }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" sx={{ color: theme.palette.text.secondary, mb: 3, lineHeight: 1.6 }}>
                    {feature.description}
                  </Typography>
                  <Button
                    variant="outlined"
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      borderColor: '#7C3AED',
                      color: '#7C3AED',
                      fontWeight: 600,
                      '&:hover': {
                        background: 'rgba(124, 58, 237, 0.08)',
                        borderColor: '#6D28D9',
                      }
                    }}
                  >
                    Explore
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Benefits Section */}
      <Box sx={{ py: { xs: 8, md: 12 }, background: 'linear-gradient(135deg, #FAFAFA 0%, #F3F4F6 100%)' }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  background: 'linear-gradient(135deg, #1F2937 0%, #374151 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Why Choose DeFi Pro?
              </Typography>
              <Typography variant="h5" sx={{ color: theme.palette.text.secondary, mb: 4, lineHeight: 1.6 }}>
                Built with institutional-grade security and user experience in mind
              </Typography>
              
              <Stack spacing={3}>
                {benefits.map((benefit, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      p: 3,
                      borderRadius: 3,
                      background: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(20px)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        background: 'rgba(255, 255, 255, 0.95)',
                        transform: 'translateX(8px)',
                      }
                    }}
                  >
                    <Box sx={{ mr: 3, mt: 0.5 }}>
                      {benefit.icon}
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#1F2937' }}>
                        {benefit.title}
                      </Typography>
                      <Typography variant="body1" sx={{ color: theme.palette.text.secondary, lineHeight: 1.6 }}>
                        {benefit.description}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: 4,
                  p: 4,
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: '#7C3AED' }}>
                  User Reviews
                </Typography>
                <Stack spacing={3}>
                  {[
                    { name: 'Alex Chen', rating: 5, comment: 'Best DeFi platform I\'ve used. Clean interface and great yields!' },
                    { name: 'Sarah Johnson', rating: 5, comment: 'Security is top-notch. I feel safe with my investments here.' },
                    { name: 'Mike Rodriguez', rating: 5, comment: 'Amazing user experience. Everything just works seamlessly.' },
                  ].map((review, index) => (
                    <Box key={index} sx={{ p: 3, borderRadius: 2, background: 'rgba(124, 58, 237, 0.05)' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar sx={{ mr: 2, background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)' }}>
                          {review.name.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            {review.name}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {[...Array(review.rating)].map((_, i) => (
                              <StarIcon key={i} sx={{ fontSize: 16, color: '#F59E0B' }} />
                            ))}
                          </Box>
                        </Box>
                      </Box>
                      <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontStyle: 'italic' }}>
                        "{review.comment}"
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ py: { xs: 8, md: 12 }, background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)' }}>
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                mb: 3,
                color: 'white',
              }}
            >
              Ready to Start Your DeFi Journey?
            </Typography>
            <Typography variant="h5" sx={{ color: 'rgba(255, 255, 255, 0.9)', mb: 4, lineHeight: 1.6 }}>
              Join thousands of users who are already earning passive income and growing their portfolios
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={handleStartTrading}
              endIcon={<ArrowForwardIcon />}
              sx={{
                px: 6,
                py: 2.5,
                fontSize: '1.2rem',
                fontWeight: 600,
                borderRadius: 3,
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: 'white',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.3)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 35px rgba(0, 0, 0, 0.2)',
                }
              }}
            >
              Get Started Now
            </Button>
          </Box>
        </Container>
      </Box>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </Box>
  )
}
