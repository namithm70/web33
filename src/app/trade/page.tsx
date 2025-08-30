'use client'

import { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  TextField,
  IconButton,
  Stack,
  Chip,
  Divider,
  Grid,
  Avatar,
  useTheme,
  LinearProgress,
  Alert,
  Switch,
  FormControlLabel,
} from '@mui/material'
import {
  SwapHoriz as SwapIcon,
  Settings as SettingsIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Refresh as RefreshIcon,
  Info as InfoIcon,
  ArrowDownward as ArrowDownIcon,
  ArrowUpward as ArrowUpIcon,
} from '@mui/icons-material'
import { useAppTheme } from '../ClientThemeProvider'
import Header from '../../components/Header'

const tokens = [
  { symbol: 'ETH', name: 'Ethereum', icon: '🔵', price: '$2,450.32', change: '+2.5%' },
  { symbol: 'USDC', name: 'USD Coin', icon: '🔷', price: '$1.00', change: '0.0%' },
  { symbol: 'USDT', name: 'Tether', icon: '🟢', price: '$1.00', change: '0.0%' },
  { symbol: 'BNB', name: 'Binance Coin', icon: '🟡', price: '$312.45', change: '+1.2%' },
]

const recentTrades = [
  { time: '2 min ago', type: 'Buy', amount: '1,234 USDC', price: '$1.30', tx: '0x1234...5678' },
  { time: '5 min ago', type: 'Sell', amount: '567 USDC', price: '$1.29', tx: '0x8765...4321' },
  { time: '8 min ago', type: 'Buy', amount: '890 USDC', price: '$1.28', tx: '0x1111...2222' },
  { time: '12 min ago', type: 'Sell', amount: '432 USDC', price: '$1.27', tx: '0x3333...4444' },
]

function TokenSelector({ value, onSelect }: { value: string; onSelect: (token: string) => void }) {
  const theme = useTheme()
  const [open, setOpen] = useState(false)

  const selectedToken = tokens.find(t => t.symbol === value)

  return (
    <Box sx={{ position: 'relative' }}>
      <Button
        variant="outlined"
        onClick={() => setOpen(!open)}
        sx={{
          minWidth: 120,
          borderColor: theme.palette.divider,
          color: theme.palette.text.primary,
          '&:hover': {
            borderColor: theme.palette.primary.main,
          },
        }}
      >
        <Avatar sx={{ width: 24, height: 24, mr: 1, fontSize: '0.75rem' }}>
          {selectedToken?.icon}
        </Avatar>
        {selectedToken?.symbol}
      </Button>
    </Box>
  )
}

export default function TradePage() {
  const theme = useTheme()
  const { mode } = useAppTheme()
  const [mounted, setMounted] = useState(false)
  const [fromToken, setFromToken] = useState('ETH')
  const [toToken, setToToken] = useState('USDC')
  const [fromAmount, setFromAmount] = useState('')
  const [toAmount, setToAmount] = useState('')
  const [slippage, setSlippage] = useState('0.5')
  const [expertMode, setExpertMode] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: theme.palette.mode === 'dark'
        ? 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%)'
        : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      pt: 2
    }}>
      <Header />
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          {/* Main Trading Interface */}
          <Grid item xs={12} lg={8}>
            <Card sx={{ background: theme.palette.background.paper }}>
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
                    Swap Tokens
                  </Typography>
                  <IconButton
                    sx={{
                      color: theme.palette.text.secondary,
                      '&:hover': {
                        background: theme.palette.mode === 'dark' 
                          ? 'rgba(255, 255, 255, 0.1)' 
                          : 'rgba(0, 0, 0, 0.05)',
                      }
                    }}
                  >
                    <SettingsIcon />
                  </IconButton>
                </Box>

                <Stack spacing={3}>
                  {/* From Token */}
                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 600 }}>
                      From
                    </Typography>
                    <Card
                      sx={{
                        background: theme.palette.mode === 'dark' 
                          ? 'rgba(255, 255, 255, 0.05)' 
                          : 'rgba(0, 0, 0, 0.02)',
                        border: `1px solid ${theme.palette.divider}`,
                      }}
                    >
                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <TokenSelector value={fromToken} onSelect={setFromToken} />
                          <TextField
                            fullWidth
                            variant="standard"
                            placeholder="0.0"
                            value={fromAmount}
                            onChange={(e) => setFromAmount(e.target.value)}
                            InputProps={{
                              disableUnderline: true,
                              style: { 
                                fontSize: '1.5rem', 
                                fontWeight: 600,
                                color: theme.palette.text.primary,
                              },
                            }}
                          />
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                          Balance: 1.234 ETH
                        </Typography>
                      </CardContent>
                    </Card>
                  </Box>

                  {/* Swap Button */}
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <IconButton
                      sx={{
                        background: theme.palette.primary.main,
                        color: 'white',
                        '&:hover': {
                          background: theme.palette.primary.dark,
                        },
                      }}
                    >
                      <ArrowDownIcon />
                    </IconButton>
                  </Box>

                  {/* To Token */}
                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 600 }}>
                      To
                    </Typography>
                    <Card
                      sx={{
                        background: theme.palette.mode === 'dark' 
                          ? 'rgba(255, 255, 255, 0.05)' 
                          : 'rgba(0, 0, 0, 0.02)',
                        border: `1px solid ${theme.palette.divider}`,
                      }}
                    >
                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <TokenSelector value={toToken} onSelect={setToToken} />
                          <TextField
                            fullWidth
                            variant="standard"
                            placeholder="0.0"
                            value={toAmount}
                            onChange={(e) => setToAmount(e.target.value)}
                            InputProps={{
                              disableUnderline: true,
                              style: { 
                                fontSize: '1.5rem', 
                                fontWeight: 600,
                                color: theme.palette.text.primary,
                              },
                            }}
                          />
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                          Balance: 5,000 USDC
                        </Typography>
                      </CardContent>
                    </Card>
                  </Box>

                  {/* Swap Details */}
                  <Card
                    sx={{
                      background: theme.palette.mode === 'dark' 
                        ? 'rgba(255, 255, 255, 0.02)' 
                        : 'rgba(0, 0, 0, 0.02)',
                      border: `1px solid ${theme.palette.divider}`,
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Stack spacing={2}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body2" color="text.secondary">
                            Rate
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            1 ETH = 1,300 USDC
                          </Typography>
                        </Box>
                        <Divider />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body2" color="text.secondary">
                            Price Impact
                          </Typography>
                          <Typography variant="body2" color="success.main" sx={{ fontWeight: 600 }}>
                            &lt; 0.01%
                          </Typography>
                        </Box>
                        <Divider />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body2" color="text.secondary">
                            Min Received
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            1,299.35 USDC
                          </Typography>
                        </Box>
                        <Divider />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body2" color="text.secondary">
                            Network Fee
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            ~$5.00
                          </Typography>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>

                  {/* Expert Mode Toggle */}
                  <FormControlLabel
                    control={
                      <Switch
                        checked={expertMode}
                        onChange={(e) => setExpertMode(e.target.checked)}
                        color="primary"
                      />
                    }
                    label="Expert Mode"
                  />

                  {/* Swap Button */}
                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    sx={{
                      background: 'linear-gradient(45deg, #6366f1, #4f46e5)',
                      py: 2,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      '&:hover': {
                        background: 'linear-gradient(45deg, #4f46e5, #3730a3)',
                      },
                    }}
                  >
                    Swap
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} lg={4}>
            <Stack spacing={3}>
              {/* Price Chart */}
              <Card sx={{ background: theme.palette.background.paper }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                      ETH/USDC
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600, color: 'success.main' }}>
                        $1,300.45
                      </Typography>
                      <Chip
                        icon={<TrendingUpIcon />}
                        label="+2.5%"
                        size="small"
                        sx={{
                          background: 'rgba(16, 185, 129, 0.1)',
                          color: 'success.main',
                          fontWeight: 600,
                        }}
                      />
                    </Box>
                  </Box>
                  
                  <Box sx={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      Chart placeholder - Price data visualization
                    </Typography>
                  </Box>
                </CardContent>
              </Card>

              {/* Recent Trades */}
              <Card sx={{ background: theme.palette.background.paper }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                      Recent Trades
                    </Typography>
                    <IconButton
                      size="small"
                      sx={{
                        color: theme.palette.text.secondary,
                        '&:hover': {
                          background: theme.palette.mode === 'dark' 
                            ? 'rgba(255, 255, 255, 0.1)' 
                            : 'rgba(0, 0, 0, 0.05)',
                        }
                      }}
                    >
                      <RefreshIcon />
                    </IconButton>
                  </Box>
                  
                  <Stack spacing={1}>
                    {recentTrades.map((trade, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          p: 1,
                          borderRadius: 1,
                          '&:hover': {
                            background: theme.palette.mode === 'dark' 
                              ? 'rgba(255, 255, 255, 0.05)' 
                              : 'rgba(0, 0, 0, 0.02)',
                          },
                        }}
                      >
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                            {trade.amount}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {trade.time}
                          </Typography>
                        </Box>
                        <Box sx={{ textAlign: 'right' }}>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                            {trade.price}
                          </Typography>
                          <Chip
                            label={trade.type}
                            size="small"
                            sx={{
                              background: trade.type === 'Buy' 
                                ? 'rgba(16, 185, 129, 0.1)' 
                                : 'rgba(239, 68, 68, 0.1)',
                              color: trade.type === 'Buy' ? 'success.main' : 'error.main',
                              fontWeight: 600,
                              fontSize: '0.7rem',
                            }}
                          />
                        </Box>
                      </Box>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
