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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Badge,
  Tooltip,
  LinearProgress,
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
  Notifications as NotificationsIcon,
  Timeline as TimelineIcon,
  Speed as SpeedIcon,
  Security as SecurityIcon,
  ExpandMore as ExpandMoreIcon,
  LocalOffer as LocalOfferIcon,
  AccountBalance as AccountBalanceIcon,
  ShowChart as ShowChartIcon,
  AutoMode as AutoModeIcon,
  Schedule as ScheduleIcon,
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
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [orderType, setOrderType] = useState<'market' | 'limit' | 'stop'>('market')
  const [limitPrice, setLimitPrice] = useState('')
  const [stopPrice, setStopPrice] = useState('')
  const [priceAlerts, setPriceAlerts] = useState<any[]>([])
  const [showPriceAlert, setShowPriceAlert] = useState(false)
  const [newAlert, setNewAlert] = useState({ token: '', targetPrice: '', condition: 'above' })
  const [gasPrice, setGasPrice] = useState('auto')
  const [autoSlippage, setAutoSlippage] = useState(true)
  const [showChart, setShowChart] = useState(false)
  const [tradingPairs, setTradingPairs] = useState<any[]>([])
  const [selectedPair, setSelectedPair] = useState('')

  useEffect(() => {
    setAnimate(true)
  }, [])

  // Available tokens - user can add more
  const [availableTokens, setAvailableTokens] = useState([
    { symbol: 'ETH', name: 'Ethereum', icon: '🔵', price: 0, change: 0, volume: 0, marketCap: 0 },
    { symbol: 'USDC', name: 'USD Coin', icon: '🔵', price: 0, change: 0, volume: 0, marketCap: 0 },
    { symbol: 'USDT', name: 'Tether', icon: '🟢', price: 0, change: 0, volume: 0, marketCap: 0 },
    { symbol: 'DAI', name: 'Dai', icon: '🟡', price: 0, change: 0, volume: 0, marketCap: 0 },
    { symbol: 'WBTC', name: 'Wrapped Bitcoin', icon: '🟠', price: 0, change: 0, volume: 0, marketCap: 0 },
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
      orderType,
      limitPrice: orderType === 'limit' ? parseFloat(limitPrice) : null,
      stopPrice: orderType === 'stop' ? parseFloat(stopPrice) : null,
      slippage,
      gasPrice,
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
        change: 0,
        volume: 0,
        marketCap: 0
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

  const handleAddPriceAlert = () => {
    if (!newAlert.token || !newAlert.targetPrice) {
      alert('Please fill in all fields')
      return
    }

    const alert = {
      id: Date.now(),
      token: newAlert.token,
      targetPrice: parseFloat(newAlert.targetPrice),
      condition: newAlert.condition,
      timestamp: new Date().toISOString(),
      status: 'active'
    }

    setPriceAlerts([...priceAlerts, alert])
    setNewAlert({ token: '', targetPrice: '', condition: 'above' })
    setShowPriceAlert(false)
    alert('Price alert added successfully!')
  }

  const handleRemovePriceAlert = (id: number) => {
    setPriceAlerts(priceAlerts.filter(alert => alert.id !== id))
  }

  const handleAddTradingPair = () => {
    const token1 = prompt('Enter first token symbol:')
    if (!token1) return
    
    const token2 = prompt('Enter second token symbol:')
    if (!token2) return

    const pair = {
      id: `${token1.toUpperCase()}-${token2.toUpperCase()}`,
      token1: token1.toUpperCase(),
      token2: token2.toUpperCase(),
      volume: 0,
      change: 0
    }

    setTradingPairs([...tradingPairs, pair])
  }

  const getTopGainers = () => {
    return [...availableTokens].sort((a, b) => b.change - a.change).slice(0, 5)
  }

  const getTopLosers = () => {
    return [...availableTokens].sort((a, b) => a.change - b.change).slice(0, 5)
  }

  const getTotalVolume = () => {
    return availableTokens.reduce((total, token) => total + token.volume, 0)
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
            Advanced Trading
          </Typography>
          <Typography variant="h5" sx={{ color: theme.palette.text.secondary, maxWidth: 600, mx: 'auto' }}>
            Professional trading with limit orders, stop-loss, price alerts, and advanced features
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
                  Advanced Swap
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton
                    onClick={() => setShowChart(!showChart)}
                    sx={{
                      background: 'rgba(124, 58, 237, 0.1)',
                      '&:hover': { background: 'rgba(124, 58, 237, 0.15)' }
                    }}
                  >
                    <ShowChartIcon />
                  </IconButton>
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
              </Box>

              {/* Order Type Selection */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, color: theme.palette.text.secondary, fontWeight: 600 }}>
                  Order Type
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant={orderType === 'market' ? 'contained' : 'outlined'}
                    size="small"
                    onClick={() => setOrderType('market')}
                    sx={{ flex: 1 }}
                  >
                    Market
                  </Button>
                  <Button
                    variant={orderType === 'limit' ? 'contained' : 'outlined'}
                    size="small"
                    onClick={() => setOrderType('limit')}
                    sx={{ flex: 1 }}
                  >
                    Limit
                  </Button>
                  <Button
                    variant={orderType === 'stop' ? 'contained' : 'outlined'}
                    size="small"
                    onClick={() => setOrderType('stop')}
                    sx={{ flex: 1 }}
                  >
                    Stop
                  </Button>
                </Box>
              </Box>

              {/* Advanced Settings */}
              {showSettings && (
                <Accordion sx={{ mb: 3, background: 'rgba(124, 58, 237, 0.05)' }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Advanced Settings
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Stack spacing={3}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={autoSlippage}
                            onChange={(e) => setAutoSlippage(e.target.checked)}
                          />
                        }
                        label="Auto Slippage"
                      />
                      
                      {!autoSlippage && (
                        <Box>
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
                      )}

                      <FormControl fullWidth>
                        <InputLabel>Gas Price</InputLabel>
                        <Select
                          value={gasPrice}
                          onChange={(e) => setGasPrice(e.target.value)}
                          label="Gas Price"
                        >
                          <MenuItem value="auto">Auto</MenuItem>
                          <MenuItem value="slow">Slow</MenuItem>
                          <MenuItem value="medium">Medium</MenuItem>
                          <MenuItem value="fast">Fast</MenuItem>
                        </Select>
                      </FormControl>
                    </Stack>
                  </AccordionDetails>
                </Accordion>
              )}

              {/* Limit/Stop Price Inputs */}
              {(orderType === 'limit' || orderType === 'stop') && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1, color: theme.palette.text.secondary, fontWeight: 600 }}>
                    {orderType === 'limit' ? 'Limit Price' : 'Stop Price'}
                  </Typography>
                  <TextField
                    fullWidth
                    type="number"
                    placeholder="0.00"
                    value={orderType === 'limit' ? limitPrice : stopPrice}
                    onChange={(e) => orderType === 'limit' ? setLimitPrice(e.target.value) : setStopPrice(e.target.value)}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
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
                {!fromToken || !toToken ? 'Select Tokens' : `${orderType.charAt(0).toUpperCase() + orderType.slice(1)} ${fromToken} for ${toToken}`}
              </Button>
            </Card>
          </Grid>

          {/* Sidebar */}
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
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#1F2937' }}>
                    Market Overview
                  </Typography>
                  <IconButton size="small" onClick={() => window.location.reload()}>
                    <RefreshIcon />
                  </IconButton>
                </Box>
                
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h4" sx={{ fontWeight: 800, color: '#10B981', mb: 1 }}>
                    ${getTotalVolume().toFixed(2)}M
                  </Typography>
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                    24h Total Volume
                  </Typography>
                </Box>

                <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>Top Gainers</Typography>
                <Stack spacing={1} sx={{ mb: 3 }}>
                  {getTopGainers().map((token) => (
                    <Box key={token.symbol} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar sx={{ width: 20, height: 20, fontSize: '0.75rem' }}>{token.icon}</Avatar>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>{token.symbol}</Typography>
                      </Box>
                      <Typography variant="body2" sx={{ color: '#10B981', fontWeight: 600 }}>
                        +{token.change.toFixed(2)}%
                      </Typography>
                    </Box>
                  ))}
                </Stack>

                <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>Top Losers</Typography>
                <Stack spacing={1}>
                  {getTopLosers().map((token) => (
                    <Box key={token.symbol} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar sx={{ width: 20, height: 20, fontSize: '0.75rem' }}>{token.icon}</Avatar>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>{token.symbol}</Typography>
                      </Box>
                      <Typography variant="body2" sx={{ color: '#EF4444', fontWeight: 600 }}>
                        {token.change.toFixed(2)}%
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Card>

              {/* Price Alerts */}
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
                    Price Alerts
                  </Typography>
                  <Button
                    size="small"
                    startIcon={<AddIcon />}
                    onClick={() => setShowPriceAlert(true)}
                    sx={{ color: '#7C3AED' }}
                  >
                    Add Alert
                  </Button>
                </Box>
                <Stack spacing={2}>
                  {priceAlerts.slice(0, 5).map((alert) => (
                    <Box
                      key={alert.id}
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
                          {alert.token} {alert.condition} ${alert.targetPrice}
                        </Typography>
                        <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                          {new Date(alert.timestamp).toLocaleString()}
                        </Typography>
                      </Box>
                      <IconButton
                        size="small"
                        onClick={() => handleRemovePriceAlert(alert.id)}
                        sx={{ color: '#EF4444' }}
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  ))}
                  {priceAlerts.length === 0 && (
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary, textAlign: 'center', py: 2 }}>
                      No price alerts. Add alerts to monitor token prices.
                    </Typography>
                  )}
                </Stack>
              </Card>

              {/* Trading Pairs */}
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
                    Trading Pairs
                  </Typography>
                  <Button
                    size="small"
                    startIcon={<AddIcon />}
                    onClick={handleAddTradingPair}
                    sx={{ color: '#7C3AED' }}
                  >
                    Add Pair
                  </Button>
                </Box>
                <Stack spacing={2}>
                  {tradingPairs.map((pair) => (
                    <Box
                      key={pair.id}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        p: 2,
                        borderRadius: 2,
                        background: 'rgba(124, 58, 237, 0.05)',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: 'rgba(124, 58, 237, 0.1)',
                        }
                      }}
                      onClick={() => {
                        setFromToken(pair.token1)
                        setToToken(pair.token2)
                      }}
                    >
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {pair.token1}/{pair.token2}
                      </Typography>
                      <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                        Vol: ${pair.volume.toFixed(2)}M
                      </Typography>
                    </Box>
                  ))}
                  {tradingPairs.length === 0 && (
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary, textAlign: 'center', py: 2 }}>
                      No trading pairs. Add pairs to quick trade.
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
                      <Chip
                        label={trade.orderType}
                        size="small"
                        sx={{
                          background: 'rgba(124, 58, 237, 0.1)',
                          color: '#7C3AED',
                        }}
                      />
                    </Box>
                  ))}
                  {tradeHistory.length === 0 && (
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary, textAlign: 'center', py: 2 }}>
                      No trades yet. Start trading to see your history.
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
                      ${token.price} ({token.change > 0 ? '+' : ''}{token.change}%)
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

      {/* Price Alert Dialog */}
      <Dialog open={showPriceAlert} onClose={() => setShowPriceAlert(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Price Alert</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Token</InputLabel>
              <Select
                value={newAlert.token}
                onChange={(e) => setNewAlert({ ...newAlert, token: e.target.value })}
                label="Token"
              >
                {availableTokens.map((token) => (
                  <MenuItem key={token.symbol} value={token.symbol}>
                    {token.symbol}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <TextField
              fullWidth
              label="Target Price"
              type="number"
              value={newAlert.targetPrice}
              onChange={(e) => setNewAlert({ ...newAlert, targetPrice: e.target.value })}
              placeholder="0.00"
            />
            
            <FormControl fullWidth>
              <InputLabel>Condition</InputLabel>
              <Select
                value={newAlert.condition}
                onChange={(e) => setNewAlert({ ...newAlert, condition: e.target.value })}
                label="Condition"
              >
                <MenuItem value="above">Above</MenuItem>
                <MenuItem value="below">Below</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowPriceAlert(false)}>Cancel</Button>
          <Button onClick={handleAddPriceAlert} variant="contained" sx={{ background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)' }}>
            Add Alert
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
