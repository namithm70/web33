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
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
  Avatar,
  LinearProgress,
} from '@mui/material'
import {
  SwapHoriz as SwapIcon,
  AccountBalance as StakingIcon,
  Agriculture as FarmingIcon,
  TrendingUp as ChartIcon,
  ArrowForward as ArrowForwardIcon,
  Menu as MenuIcon,
  Brightness4 as DarkIcon,
  Brightness7 as LightIcon,
  Wallet as WalletIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
} from '@mui/icons-material'


const features = [
  {
    icon: <SwapIcon sx={{ fontSize: 40 }} />,
    title: 'Token Trading',
    description: 'Swap tokens with the best rates and lowest fees across multiple chains.',
    color: '#6366f1',
    gradient: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
  },
  {
    icon: <StakingIcon sx={{ fontSize: 40 }} />,
    title: 'Single Asset Staking',
    description: 'Earn rewards by staking your tokens with competitive APY rates.',
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  },
  {
    icon: <FarmingIcon sx={{ fontSize: 40 }} />,
    title: 'LP Farming',
    description: 'Provide liquidity and earn additional rewards through farming.',
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
  },
  {
    icon: <ChartIcon sx={{ fontSize: 40 }} />,
    title: 'Portfolio Analytics',
    description: 'Track your investments, performance, and earnings in real-time.',
    color: '#ef4444',
    gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
  },
]

const stats = [
  { 
    label: 'Total Value Locked', 
    value: '$2.5B+', 
    change: '+12.5%', 
    positive: true,
    icon: <TrendingUpIcon />,
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
  },
  { 
    label: 'Active Users', 
    value: '50K+', 
    change: '+8.2%', 
    positive: true,
    icon: <TrendingUpIcon />,
    color: '#6366f1',
    gradient: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)'
  },
  { 
    label: 'Total Volume', 
    value: '$15B+', 
    change: '+15.7%', 
    positive: true,
    icon: <TrendingUpIcon />,
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
  },
  { 
    label: 'Supported Chains', 
    value: '3', 
    change: 'Ethereum, Polygon, BSC', 
    positive: true,
    icon: <TrendingUpIcon />,
    color: '#ef4444',
    gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
  },
]

function Header() {
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const router = useRouter()

  const handleNavigation = (path: string) => {
    router.push(path)
    setMobileOpen(false)
  }

  const navigationItems = [
    { label: 'Trade', path: '/trade' },
    { label: 'Stake', path: '/stake' },
    { label: 'Farm', path: '/farm' },
    { label: 'Portfolio', path: '/portfolio' },
  ]

  return (
    <AppBar 
      position="static" 
      sx={{ 
        background: theme.palette.mode === 'dark' 
          ? 'rgba(26, 26, 46, 0.8)' 
          : 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(20px)',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo */}
        <Typography
          variant="h6"
          component="div"
          sx={{ 
            cursor: 'pointer',
            fontWeight: 700,
            background: 'linear-gradient(45deg, #6366f1, #4f46e5)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
          onClick={() => handleNavigation('/')}
        >
          DeFi App
        </Typography>

        {/* Desktop Navigation */}
        {!isMobile && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {navigationItems.map((item) => (
              <Button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                sx={{
                  color: theme.palette.text.primary,
                  '&:hover': {
                    background: theme.palette.mode === 'dark' 
                      ? 'rgba(255, 255, 255, 0.1)' 
                      : 'rgba(0, 0, 0, 0.05)',
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        )}

        {/* Right side controls */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Theme Toggle */}


          {/* Connect Wallet */}
          <Button
            variant="contained"
            startIcon={<WalletIcon />}
            sx={{
              background: 'linear-gradient(45deg, #6366f1, #4f46e5)',
              '&:hover': {
                background: 'linear-gradient(45deg, #4f46e5, #3730a3)',
              }
            }}
          >
            Connect Wallet
          </Button>

          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={() => setMobileOpen(true)}
              sx={{ ml: 1 }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Box>
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          '& .MuiDrawer-paper': {
            width: 280,
            background: theme.palette.background.paper,
            backdropFilter: 'blur(20px)',
          },
        }}
      >
        <List>
          {navigationItems.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                sx={{
                  color: theme.palette.text.primary,
                  '&:hover': {
                    background: 'rgba(0, 0, 0, 0.05)',
                  },
                }}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </AppBar>
  )
}

export default function HomePage() {
  const theme = useTheme()
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleStartTrading = () => {
    router.push('/trade')
  }

  const handleGetStarted = () => {
    router.push('/trade')
  }

  if (!mounted) {
    return null
  }

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
    }}>
      <Header />
      
      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ pt: 8, pb: 12 }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h1"
            sx={{
              fontWeight: 800,
              mb: 3,
              color: theme.palette.text.primary,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              background: 'linear-gradient(45deg, #6366f1, #4f46e5)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Next-Generation DeFi Platform
          </Typography>
          
          <Typography
            variant="h5"
            sx={{
              color: theme.palette.text.secondary,
              mb: 4,
              maxWidth: 600,
              mx: 'auto',
              lineHeight: 1.6,
            }}
          >
            Trade, stake, and farm with the most advanced DeFi tools across multiple blockchains
          </Typography>
          
          <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap">
                         <Button
               variant="contained"
               size="large"
               endIcon={<ArrowForwardIcon />}
               onClick={handleStartTrading}
               sx={{ 
                 background: 'linear-gradient(45deg, #6366f1, #4f46e5)',
                 '&:hover': {
                   background: 'linear-gradient(45deg, #4f46e5, #3730a3)',
                 }
               }}
             >
               Start Trading
             </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{ 
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
                '&:hover': {
                  borderColor: theme.palette.primary.dark,
                  background: theme.palette.mode === 'dark' 
                    ? 'rgba(99, 102, 241, 0.1)' 
                    : 'rgba(99, 102, 241, 0.05)',
                }
              }}
            >
              Learn More
            </Button>
          </Stack>
        </Box>

        {/* Stats */}
        <Grid container spacing={3} sx={{ mb: 8 }}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  textAlign: 'center',
                  background: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    transition: 'transform 0.3s ease',
                    boxShadow: theme.palette.mode === 'dark' 
                      ? '0 8px 32px rgba(0, 0, 0, 0.4)' 
                      : '0 8px 32px rgba(0, 0, 0, 0.12)',
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Avatar
                    sx={{
                      mx: 'auto',
                      mb: 2,
                      width: 56,
                      height: 56,
                      background: stat.gradient || stat.color,
                    }}
                  >
                    {stat.icon}
                  </Avatar>
                  <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: theme.palette.text.primary }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2, color: theme.palette.text.secondary }}>
                    {stat.label}
                  </Typography>
                  <Chip
                    label={stat.change}
                    size="small"
                    icon={stat.positive ? <TrendingUpIcon /> : <TrendingDownIcon />}
                    sx={{
                      background: stat.positive 
                        ? 'rgba(16, 185, 129, 0.1)' 
                        : 'rgba(239, 68, 68, 0.1)',
                      color: stat.positive ? '#10b981' : '#ef4444',
                      fontWeight: 600,
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Features Section */}
      <Box sx={{ 
        background: theme.palette.mode === 'dark' 
          ? 'rgba(255, 255, 255, 0.02)' 
          : 'rgba(99, 102, 241, 0.02)',
        py: 8 
      }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            sx={{
              textAlign: 'center',
              fontWeight: 700,
              mb: 6,
              color: theme.palette.text.primary,
            }}
          >
            Powerful Features
          </Typography>
          
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    textAlign: 'center',
                    background: theme.palette.background.paper,
                    border: `1px solid ${theme.palette.divider}`,
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      transition: 'transform 0.3s ease',
                      boxShadow: theme.palette.mode === 'dark' 
                        ? '0 12px 40px rgba(0, 0, 0, 0.4)' 
                        : '0 12px 40px rgba(0, 0, 0, 0.15)',
                    },
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        background: feature.gradient,
                        color: 'white',
                        mb: 3,
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                      }}
                    >
                      {feature.icon}
                    </Box>
                    
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: theme.palette.text.primary }}>
                      {feature.title}
                    </Typography>
                    
                                         <Typography variant="body2" sx={{ color: theme.palette.text.secondary, lineHeight: 1.6 }}>
                       {feature.description}
                     </Typography>
                     
                     <Button
                       variant="outlined"
                       size="small"
                       sx={{ 
                         mt: 2,
                         borderColor: feature.color,
                         color: feature.color,
                         '&:hover': {
                           borderColor: feature.color,
                           background: theme.palette.mode === 'dark' 
                             ? `${feature.color}20` 
                             : `${feature.color}10`,
                         }
                       }}
                       onClick={() => {
                         if (feature.title === 'Token Trading') router.push('/trade')
                         else if (feature.title === 'Single Asset Staking') router.push('/stake')
                         else if (feature.title === 'LP Farming') router.push('/farm')
                         else if (feature.title === 'Portfolio Analytics') router.push('/portfolio')
                       }}
                     >
                       Explore {feature.title}
                     </Button>
                   </CardContent>
                 </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 3, color: theme.palette.text.primary }}>
            Ready to Start?
          </Typography>
          
          <Typography
            variant="h6"
            sx={{
              color: theme.palette.text.secondary,
              mb: 4,
              lineHeight: 1.6,
            }}
          >
            Join thousands of users already earning with our DeFi platform
          </Typography>
          
                     <Button
             variant="contained"
             size="large"
             endIcon={<ArrowForwardIcon />}
             onClick={handleGetStarted}
             sx={{ 
               background: 'linear-gradient(45deg, #6366f1, #4f46e5)',
               px: 6,
               py: 2,
               fontSize: '1.1rem',
               '&:hover': {
                 background: 'linear-gradient(45deg, #4f46e5, #3730a3)',
               }
             }}
           >
             Get Started Now
           </Button>
        </Box>
      </Container>
    </Box>
  )
}
