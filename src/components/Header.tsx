'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import {
  Box,
  Typography,
  Button,
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
  Chip,
  Avatar,
} from '@mui/material'
import {
  Menu as MenuIcon,
  Wallet as WalletIcon,
  TrendingUp as TrendingUpIcon,
  AccountBalance as AccountBalanceIcon,
  Agriculture as AgricultureIcon,
  ShowChart as ShowChartIcon,
} from '@mui/icons-material'

export default function Header() {
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavigation = (path: string) => {
    router.push(path)
    setMobileOpen(false)
  }

  const navigationItems = [
    { 
      label: 'Trade', 
      path: '/trade', 
      icon: <ShowChartIcon sx={{ fontSize: 20 }} />,
      description: 'Swap tokens instantly'
    },
    { 
      label: 'Stake', 
      path: '/stake', 
      icon: <AccountBalanceIcon sx={{ fontSize: 20 }} />,
      description: 'Earn passive income'
    },
    { 
      label: 'Farm', 
      path: '/farm', 
      icon: <AgricultureIcon sx={{ fontSize: 20 }} />,
      description: 'Liquidity farming'
    },
    { 
      label: 'Portfolio', 
      path: '/portfolio', 
      icon: <TrendingUpIcon sx={{ fontSize: 20 }} />,
      description: 'Track your assets'
    },
  ]

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        background: scrolled 
          ? 'rgba(255, 255, 255, 0.98)' 
          : 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom: scrolled 
          ? '1px solid rgba(0, 0, 0, 0.08)' 
          : '1px solid rgba(0, 0, 0, 0.04)',
        transition: 'all 0.3s ease-in-out',
        boxShadow: scrolled 
          ? '0 4px 20px rgba(0, 0, 0, 0.08)' 
          : 'none',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
        {/* Logo */}
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            cursor: 'pointer',
            transition: 'transform 0.2s ease-in-out',
            '&:hover': {
              transform: 'scale(1.05)',
            }
          }}
          onClick={() => handleNavigation('/')}
        >
          <Avatar 
            sx={{ 
              width: 40, 
              height: 40, 
              background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)',
              mr: 2,
              boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3)',
            }}
          >
            <TrendingUpIcon />
          </Avatar>
          <Typography
            variant="h6"
            sx={{ 
              fontWeight: 800,
              background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: '1.5rem',
            }}
          >
            DeFi Pro
          </Typography>
        </Box>

        {/* Desktop Navigation */}
        {!isMobile && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {navigationItems.map((item) => (
              <Button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                startIcon={item.icon}
                sx={{
                  color: pathname === item.path ? '#7C3AED' : theme.palette.text.primary,
                  fontWeight: pathname === item.path ? 700 : 500,
                  position: 'relative',
                  '&:hover': {
                    background: 'rgba(124, 58, 237, 0.08)',
                    transform: 'translateY(-1px)',
                  },
                  '&::after': pathname === item.path ? {
                    content: '""',
                    position: 'absolute',
                    bottom: -8,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 20,
                    height: 3,
                    background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)',
                    borderRadius: 2,
                  } : {},
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        )}

        {/* Right side controls */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Connect Wallet */}
          <Button
            variant="contained"
            startIcon={<WalletIcon />}
            sx={{
              background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)',
              px: 3,
              py: 1.5,
              borderRadius: 3,
              fontWeight: 600,
              boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3)',
              '&:hover': {
                background: 'linear-gradient(135deg, #6D28D9 0%, #8B5CF6 100%)',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 25px rgba(124, 58, 237, 0.4)',
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
              sx={{ 
                ml: 1,
                background: 'rgba(124, 58, 237, 0.08)',
                '&:hover': {
                  background: 'rgba(124, 58, 237, 0.12)',
                }
              }}
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
            width: 320,
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px)',
            borderLeft: '1px solid rgba(0, 0, 0, 0.08)',
          },
        }}
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 700, color: '#7C3AED' }}>
            Menu
          </Typography>
          <List>
            {navigationItems.map((item) => (
              <ListItem key={item.path} disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                  onClick={() => handleNavigation(item.path)}
                  sx={{
                    borderRadius: 2,
                    color: pathname === item.path ? '#7C3AED' : theme.palette.text.primary,
                    background: pathname === item.path ? 'rgba(124, 58, 237, 0.08)' : 'transparent',
                    '&:hover': {
                      background: 'rgba(124, 58, 237, 0.08)',
                    },
                  }}
                >
                  <Box sx={{ mr: 2, color: pathname === item.path ? '#7C3AED' : theme.palette.text.secondary }}>
                    {item.icon}
                  </Box>
                  <Box>
                    <ListItemText 
                      primary={item.label} 
                      secondary={item.description}
                      primaryTypographyProps={{
                        fontWeight: pathname === item.path ? 700 : 500,
                      }}
                      secondaryTypographyProps={{
                        fontSize: '0.75rem',
                        color: theme.palette.text.secondary,
                      }}
                    />
                  </Box>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  )
}
