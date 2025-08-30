'use client'

import { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Stack,
  Chip,
  Avatar,
  IconButton,
  useTheme,
  useMediaQuery,
  Switch,
  FormControlLabel,
  Divider,
  Alert,
} from '@mui/material'
import {
  SwapHoriz as SwapIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Info as InfoIcon,
  Settings as SettingsIcon,
  Refresh as RefreshIcon,
  ArrowDownward as ArrowDownIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
} from '@mui/icons-material'
import Header from '../../components/Header'

export default function TradePage() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [animate, setAnimate] = useState(false)
  const [fromToken, setFromToken] = useState('ETH')
  const [toToken, setToToken] = useState('USDC')
  const [fromAmount, setFromAmount] = useState('1.0')
  const [toAmount, setToAmount] = useState('1850.50')
  const [slippage, setSlippage] = useState(0.5)
  const [showSettings, setShowSettings] = useState(false)

  useEffect(() => {
    setAnimate(true)
  }, [])

  const tokens = [
    { symbol: 'ETH', name: 'Ethereum', icon: '🔵', price: 1850.50, change: 2.5 },
    { symbol: 'USDC', name: 'USD Coin', icon: '🔵', price: 1.00, change: 0.1 },
    { symbol: 'USDT', name: 'Tether', icon: '🟢', price: 1.00, change: -0.1 },
    { symbol: 'DAI', name: 'Dai', icon: '🟡', price: 1.00, change: 0.05 },
    { symbol: 'WBTC', name: 'Wrapped Bitcoin', icon: '🟠', price: 43250.00, change: 1.8 },
  ]

  const handleSwap = () => {
    // Simulate swap
    console.log('Swapping tokens...')
  }

  const handleSwitchTokens = () => {
    const tempToken = fromToken
    const tempAmount = fromAmount
    setFromToken(toToken)
    setToToken(tempToken)
    setFromAmount(toAmount)
    setToAmount(tempAmount)
  }

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #FAFAFA 0%, #F3F4F6 100%)' }}>
      <Header />
      
      <Container maxWidth="lg" sx={{ pt: { xs: 12, md: 16 }, pb: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              mb: 2,
              background: 'linear-gradient(135deg, #1F2937 0%, #374151 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Trade Tokens
          </Typography>
          <Typography variant="h5" sx={{ color: theme.palette.text.secondary, maxWidth: 600, mx: 'auto' }}>
            Swap tokens instantly with the best rates and lowest fees
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={8} lg={6}>
            <Card
              sx={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                borderRadius: 4,
                p: 4,
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                opacity: animate ? 1 : 0,
                transform: animate ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.6s ease-out',
              }}
            >
              {/* Header */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#1F2937' }}>
                  Swap Tokens
                </Typography>
                <IconButton
                  onClick={() => setShowSettings(!showSettings)}
                  sx={{
                    background: 'rgba(124, 58, 237, 0.1)',
                    '&:hover': { background: 'rgba(124, 58, 237, 0.15)' }
                  }}
                >
                  <SettingsIcon />
                </IconButton>
              </Box>

              {/* Settings Panel */}
              {showSettings && (
                <Box sx={{ mb: 3, p: 3, borderRadius: 2, background: 'rgba(124, 58, 237, 0.05)' }}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Transaction Settings
                  </Typography>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={slippage === 0.5}
                        onChange={(e) => setSlippage(e.target.checked ? 0.5 : 1.0)}
                        sx={{
                          '& .MuiSwitch-switchBase.Mui-checked': {
                            color: '#7C3AED',
                          },
                          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                            backgroundColor: '#7C3AED',
                          },
                        }}
                      />
                    }
                    label={`Slippage Tolerance: ${slippage}%`}
                  />
                </Box>
              )}

              {/* From Token */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, color: theme.palette.text.secondary, fontWeight: 600 }}>
                  From
                </Typography>
                <Card
                  sx={{
                    background: 'rgba(124, 58, 237, 0.05)',
                    borderRadius: 3,
                    p: 3,
                    border: '2px solid rgba(124, 58, 237, 0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: 'rgba(124, 58, 237, 0.2)',
                      background: 'rgba(124, 58, 237, 0.08)',
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ width: 40, height: 40, background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)' }}>
                        {tokens.find(t => t.symbol === fromToken)?.icon}
                      </Avatar>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                          {fromToken}
                        </Typography>
                        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                          {tokens.find(t => t.symbol === fromToken)?.name}
                        </Typography>
                      </Box>
                    </Box>
                    <TextField
                      value={fromAmount}
                      onChange={(e) => setFromAmount(e.target.value)}
                      variant="standard"
                      type="number"
                      sx={{
                        '& .MuiInput-root': {
                          fontSize: '1.5rem',
                          fontWeight: 700,
                          textAlign: 'right',
                        },
                        '& .MuiInput-root:before': { borderBottom: 'none' },
                        '& .MuiInput-root:after': { borderBottom: 'none' },
                      }}
                    />
                  </Box>
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mt: 1 }}>
                    Balance: 5.234 {fromToken}
                  </Typography>
                </Card>
              </Box>

              {/* Switch Button */}
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                <IconButton
                  onClick={handleSwitchTokens}
                  sx={{
                    background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)',
                    color: 'white',
                    width: 48,
                    height: 48,
                    '&:hover': {
                      background: 'linear-gradient(135deg, #6D28D9 0%, #8B5CF6 100%)',
                      transform: 'rotate(180deg)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  <ArrowDownIcon />
                </IconButton>
              </Box>

              {/* To Token */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, color: theme.palette.text.secondary, fontWeight: 600 }}>
                  To
                </Typography>
                <Card
                  sx={{
                    background: 'rgba(16, 185, 129, 0.05)',
                    borderRadius: 3,
                    p: 3,
                    border: '2px solid rgba(16, 185, 129, 0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: 'rgba(16, 185, 129, 0.2)',
                      background: 'rgba(16, 185, 129, 0.08)',
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ width: 40, height: 40, background: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)' }}>
                        {tokens.find(t => t.symbol === toToken)?.icon}
                      </Avatar>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                          {toToken}
                        </Typography>
                        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                          {tokens.find(t => t.symbol === toToken)?.name}
                        </Typography>
                      </Box>
                    </Box>
                    <TextField
                      value={toAmount}
                      variant="standard"
                      type="number"
                      sx={{
                        '& .MuiInput-root': {
                          fontSize: '1.5rem',
                          fontWeight: 700,
                          textAlign: 'right',
                        },
                        '& .MuiInput-root:before': { borderBottom: 'none' },
                        '& .MuiInput-root:after': { borderBottom: 'none' },
                      }}
                    />
                  </Box>
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mt: 1 }}>
                    Balance: 1,250.50 {toToken}
                  </Typography>
                </Card>
              </Box>

              {/* Exchange Rate */}
              <Box sx={{ mb: 3, p: 2, borderRadius: 2, background: 'rgba(0, 0, 0, 0.02)' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                    Exchange Rate
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    1 {fromToken} = {tokens.find(t => t.symbol === toToken)?.price} {toToken}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                    Slippage Tolerance
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#7C3AED' }}>
                    {slippage}%
                  </Typography>
                </Box>
              </Box>

              {/* Swap Button */}
              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={handleSwap}
                startIcon={<SwapIcon />}
                sx={{
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
                Swap {fromToken} for {toToken}
              </Button>
            </Card>
          </Grid>

          {/* Market Info */}
          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              {/* Market Overview */}
              <Card
                sx={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: 3,
                  p: 3,
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 700, color: '#1F2937' }}>
                  Market Overview
                </Typography>
                <Stack spacing={2}>
                  {tokens.slice(0, 4).map((token) => (
                    <Box
                      key={token.symbol}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        p: 2,
                        borderRadius: 2,
                        background: 'rgba(124, 58, 237, 0.05)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: 'rgba(124, 58, 237, 0.1)',
                          transform: 'translateX(4px)',
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ width: 32, height: 32, background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)' }}>
                          {token.icon}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            {token.symbol}
                          </Typography>
                          <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                            ${token.price.toLocaleString()}
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {token.change > 0 ? (
                          <TrendingUpIcon sx={{ fontSize: 16, color: '#10B981' }} />
                        ) : (
                          <TrendingDownIcon sx={{ fontSize: 16, color: '#EF4444' }} />
                        )}
                        <Typography
                          variant="caption"
                          sx={{
                            fontWeight: 600,
                            color: token.change > 0 ? '#10B981' : '#EF4444',
                          }}
                        >
                          {token.change > 0 ? '+' : ''}{token.change}%
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Stack>
              </Card>

              {/* Recent Transactions */}
              <Card
                sx={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: 3,
                  p: 3,
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 700, color: '#1F2937' }}>
                  Recent Transactions
                </Typography>
                <Stack spacing={2}>
                  {[
                    { from: 'ETH', to: 'USDC', amount: '2.5', time: '2 min ago', status: 'success' },
                    { from: 'USDT', to: 'ETH', amount: '500', time: '5 min ago', status: 'success' },
                    { from: 'DAI', to: 'WBTC', amount: '1000', time: '8 min ago', status: 'pending' },
                  ].map((tx, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        p: 2,
                        borderRadius: 2,
                        background: 'rgba(0, 0, 0, 0.02)',
                      }}
                    >
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          {tx.amount} {tx.from} → {tx.to}
                        </Typography>
                        <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                          {tx.time}
                        </Typography>
                      </Box>
                      {tx.status === 'success' ? (
                        <CheckCircleIcon sx={{ color: '#10B981', fontSize: 20 }} />
                      ) : (
                        <WarningIcon sx={{ color: '#F59E0B', fontSize: 20 }} />
                      )}
                    </Box>
                  ))}
                </Stack>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
