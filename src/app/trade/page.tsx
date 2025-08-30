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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Slider,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
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
  Add as AddIcon,
  Remove as RemoveIcon,
  History as HistoryIcon,
  Star as StarIcon,
  Favorite as FavoriteIcon,
  Share as ShareIcon,
} from '@mui/icons-material'
import Header from '../../components/Header'

export default function TradePage() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [animate, setAnimate] = useState(false)
  const [fromToken, setFromToken] = useState('')
  const [toToken, setToToken] = useState('')
  const [fromAmount, setFromAmount] = useState('')
  const [toAmount, setToAmount] = useState('')
  const [slippage, setSlippage] = useState(0.5)
  const [showSettings, setShowSettings] = useState(false)
  const [showTokenSelector, setShowTokenSelector] = useState(false)
  const [selectedTokenType, setSelectedTokenType] = useState<'from' | 'to'>('from')
  const [activeTab, setActiveTab] = useState(0)
  const [userBalance, setUserBalance] = useState<{[key: string]: number}>({})
  const [favoriteTokens, setFavoriteTokens] = useState<string[]>([])
  const [tradeHistory, setTradeHistory] = useState<any[]>([])

  useEffect(() => {
    setAnimate(true)
  }, [])

  // Available tokens - user can add more
  const [availableTokens, setAvailableTokens] = useState([
    { symbol: 'ETH', name: 'Ethereum', icon: '🔵', price: 0, change: 0 },
    { symbol: 'USDC', name: 'USD Coin', icon: '🔵', price: 0, change: 0 },
    { symbol: 'USDT', name: 'Tether', icon: '🟢', price: 0, change: 0 },
    { symbol: 'DAI', name: 'Dai', icon: '🟡', price: 0, change: 0 },
    { symbol: 'WBTC', name: 'Wrapped Bitcoin', icon: '🟠', price: 0, change: 0 },
  ])

  const handleSwap = () => {
    if (!fromToken || !toToken || !fromAmount || !toAmount) {
      alert('Please fill in all fields')
      return
    }

    const newTrade = {
      id: Date.now(),
      fromToken,
      toToken,
      fromAmount: parseFloat(fromAmount),
      toAmount: parseFloat(toAmount),
      timestamp: new Date().toISOString(),
      status: 'completed'
    }

    setTradeHistory([newTrade, ...tradeHistory])
    
    // Update balances
    setUserBalance(prev => ({
      ...prev,
      [fromToken]: (prev[fromToken] || 0) - parseFloat(fromAmount),
      [toToken]: (prev[toToken] || 0) + parseFloat(toAmount)
    }))

    // Clear form
    setFromAmount('')
    setToAmount('')
    alert('Swap completed successfully!')
  }

  const handleSwitchTokens = () => {
    const tempToken = fromToken
    const tempAmount = fromAmount
    setFromToken(toToken)
    setToToken(tempToken)
    setFromAmount(toAmount)
    setToAmount(tempAmount)
  }

  const handleAddToken = () => {
    const newToken = prompt('Enter token symbol (e.g., BTC):')
    if (newToken) {
      const newTokenData = {
        symbol: newToken.toUpperCase(),
        name: newToken.toUpperCase(),
        icon: '🪙',
        price: 0,
        change: 0
      }
      setAvailableTokens([...availableTokens, newTokenData])
    }
  }

  const handleSetBalance = (token: string) => {
    const balance = prompt(`Enter your ${token} balance:`)
    if (balance && !isNaN(parseFloat(balance))) {
      setUserBalance(prev => ({
        ...prev,
        [token]: parseFloat(balance)
      }))
    }
  }

  const toggleFavorite = (token: string) => {
    setFavoriteTokens(prev => 
      prev.includes(token) 
        ? prev.filter(t => t !== token)
        : [...prev, token]
    )
  }

  const calculateExchangeRate = () => {
    if (!fromToken || !toToken) return 0
    const fromTokenData = availableTokens.find(t => t.symbol === fromToken)
    const toTokenData = availableTokens.find(t => t.symbol === toToken)
    if (fromTokenData && toTokenData && fromTokenData.price > 0 && toTokenData.price > 0) {
      return toTokenData.price / fromTokenData.price
    }
    return 0
  }

  const handleTokenSelect = (token: string) => {
    if (selectedTokenType === 'from') {
      setFromToken(token)
    } else {
      setToToken(token)
    }
    setShowTokenSelector(false)
  }

  const openTokenSelector = (type: 'from' | 'to') => {
    setSelectedTokenType(type)
    setShowTokenSelector(true)
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
            Swap tokens with your own data and preferences
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
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Custom Slippage: {slippage}%
                    </Typography>
                    <Slider
                      value={slippage}
                      onChange={(_, value) => setSlippage(value as number)}
                      min={0.1}
                      max={5}
                      step={0.1}
                      sx={{ color: '#7C3AED' }}
                    />
                  </Box>
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
                      <Button
                        onClick={() => openTokenSelector('from')}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 2,
                          background: 'rgba(255, 255, 255, 0.8)',
                          borderRadius: 2,
                          px: 2,
                          py: 1,
                          '&:hover': { background: 'rgba(255, 255, 255, 0.9)' }
                        }}
                      >
                        <Avatar sx={{ width: 32, height: 32, background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)' }}>
                          {fromToken ? availableTokens.find(t => t.symbol === fromToken)?.icon || '🪙' : '?'}
                        </Avatar>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                          {fromToken || 'Select Token'}
                        </Typography>
                      </Button>
                    </Box>
                    <TextField
                      value={fromAmount}
                      onChange={(e) => setFromAmount(e.target.value)}
                      variant="standard"
                      type="number"
                      placeholder="0.0"
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
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                      Balance: {userBalance[fromToken] || 0} {fromToken}
                    </Typography>
                    <Button
                      size="small"
                      onClick={() => handleSetBalance(fromToken)}
                      sx={{ color: '#7C3AED', fontSize: '0.75rem' }}
                    >
                      Set Balance
                    </Button>
                  </Box>
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
                      <Button
                        onClick={() => openTokenSelector('to')}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 2,
                          background: 'rgba(255, 255, 255, 0.8)',
                          borderRadius: 2,
                          px: 2,
                          py: 1,
                          '&:hover': { background: 'rgba(255, 255, 255, 0.9)' }
                        }}
                      >
                        <Avatar sx={{ width: 32, height: 32, background: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)' }}>
                          {toToken ? availableTokens.find(t => t.symbol === toToken)?.icon || '🪙' : '?'}
                        </Avatar>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                          {toToken || 'Select Token'}
                        </Typography>
                      </Button>
                    </Box>
                    <TextField
                      value={toAmount}
                      onChange={(e) => setToAmount(e.target.value)}
                      variant="standard"
                      type="number"
                      placeholder="0.0"
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
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                      Balance: {userBalance[toToken] || 0} {toToken}
                    </Typography>
                    <Button
                      size="small"
                      onClick={() => handleSetBalance(toToken)}
                      sx={{ color: '#10B981', fontSize: '0.75rem' }}
                    >
                      Set Balance
                    </Button>
                  </Box>
                </Card>
              </Box>

              {/* Exchange Rate */}
              {fromToken && toToken && (
                <Box sx={{ mb: 3, p: 2, borderRadius: 2, background: 'rgba(0, 0, 0, 0.02)' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                      Exchange Rate
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      1 {fromToken} = {calculateExchangeRate().toFixed(6)} {toToken}
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
              )}

              {/* Swap Button */}
              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={handleSwap}
                disabled={!fromToken || !toToken || !fromAmount || !toAmount}
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
                  },
                  '&:disabled': {
                    background: 'rgba(0, 0, 0, 0.12)',
                    transform: 'none',
                    boxShadow: 'none',
                  }
                }}
              >
                {!fromToken || !toToken ? 'Select Tokens' : `Swap ${fromToken} for ${toToken}`}
              </Button>
            </Card>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              {/* Token Management */}
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
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#1F2937' }}>
                    Your Tokens
                  </Typography>
                  <Button
                    size="small"
                    startIcon={<AddIcon />}
                    onClick={handleAddToken}
                    sx={{ color: '#7C3AED' }}
                  >
                    Add Token
                  </Button>
                </Box>
                <Stack spacing={2}>
                  {Object.entries(userBalance).map(([token, balance]) => (
                    <Box
                      key={token}
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
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ width: 32, height: 32, background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)' }}>
                          {availableTokens.find(t => t.symbol === token)?.icon || '🪙'}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            {token}
                          </Typography>
                          <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                            {balance.toFixed(4)}
                          </Typography>
                        </Box>
                      </Box>
                      <IconButton
                        size="small"
                        onClick={() => toggleFavorite(token)}
                        sx={{ color: favoriteTokens.includes(token) ? '#F59E0B' : theme.palette.text.secondary }}
                      >
                        <StarIcon />
                      </IconButton>
                    </Box>
                  ))}
                  {Object.keys(userBalance).length === 0 && (
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary, textAlign: 'center', py: 2 }}>
                      No tokens added yet. Set your balances to get started.
                    </Typography>
                  )}
                </Stack>
              </Card>

              {/* Trade History */}
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
                  Trade History
                </Typography>
                <Stack spacing={2}>
                  {tradeHistory.slice(0, 5).map((trade) => (
                    <Box
                      key={trade.id}
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
                          {trade.fromAmount} {trade.fromToken} → {trade.toAmount} {trade.toToken}
                        </Typography>
                        <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                          {new Date(trade.timestamp).toLocaleString()}
                        </Typography>
                      </Box>
                      <CheckCircleIcon sx={{ color: '#10B981', fontSize: 20 }} />
                    </Box>
                  ))}
                  {tradeHistory.length === 0 && (
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary, textAlign: 'center', py: 2 }}>
                      No trades yet. Start swapping to see your history.
                    </Typography>
                  )}
                </Stack>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      {/* Token Selector Dialog */}
      <Dialog open={showTokenSelector} onClose={() => setShowTokenSelector(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          Select {selectedTokenType === 'from' ? 'From' : 'To'} Token
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 2 }}>
            {availableTokens.map((token) => (
              <Button
                key={token.symbol}
                onClick={() => handleTokenSelect(token.symbol)}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  p: 2,
                  borderRadius: 2,
                  background: 'rgba(124, 58, 237, 0.05)',
                  '&:hover': {
                    background: 'rgba(124, 58, 237, 0.1)',
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ width: 32, height: 32, background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)' }}>
                    {token.icon}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {token.symbol}
                    </Typography>
                    <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                      {token.name}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                  Balance: {userBalance[token.symbol] || 0}
                </Typography>
              </Button>
            ))}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowTokenSelector(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
