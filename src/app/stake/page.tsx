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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material'
import {
  AccountBalance as StakingIcon,
  Lock as LockIcon,
  LockOpenOutlined as UnlockIcon,
  Settings as SettingsIcon,
  Add as AddIcon,
  Star as StarIcon,
} from '@mui/icons-material'
import Header from '../../components/Header'

export default function StakePage() {
  const theme = useTheme()
  const [animate, setAnimate] = useState(false)
  const [selectedToken, setSelectedToken] = useState('')
  const [stakeAmount, setStakeAmount] = useState('')
  const [unstakeAmount, setUnstakeAmount] = useState('')
  const [showSettings, setShowSettings] = useState(false)
  const [showTokenSelector, setShowTokenSelector] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const [userBalance, setUserBalance] = useState<{[key: string]: number}>({})
  const [stakedBalance, setStakedBalance] = useState<{[key: string]: number}>({})
  const [stakingHistory, setStakingHistory] = useState<any[]>([])
  const [autoCompound, setAutoCompound] = useState(false)
  const [lockPeriod, setLockPeriod] = useState(30)
  const [stakingRewards, setStakingRewards] = useState<{[key: string]: number}>({})
  const [showRewards, setShowRewards] = useState(false)
  const [stakingPools, setStakingPools] = useState<any[]>([])
  const [showAddPool, setShowAddPool] = useState(false)
  const [newPool, setNewPool] = useState({ name: '', apy: '', minStake: '', maxStake: '', lockPeriod: '' })
  const [stakingStats, setStakingStats] = useState({ totalStaked: 0, totalRewards: 0, activePools: 0 })
  const [showAnalytics, setShowAnalytics] = useState(false)
  const [harvestAll, setHarvestAll] = useState(false)

  useEffect(() => {
    setAnimate(true)
  }, [])

  const [availableTokens, setAvailableTokens] = useState([
    // Major Cryptocurrencies
    { symbol: 'BTC', name: 'Bitcoin', icon: '🟠', apy: 0, minStake: 0.001 },
    { symbol: 'ETH', name: 'Ethereum', icon: '🔵', apy: 0, minStake: 0.1 },
    { symbol: 'BNB', name: 'Binance Coin', icon: '🟡', apy: 0, minStake: 0.1 },
    { symbol: 'SOL', name: 'Solana', icon: '🟣', apy: 0, minStake: 1 },
    { symbol: 'ADA', name: 'Cardano', icon: '🔵', apy: 0, minStake: 100 },
    { symbol: 'XRP', name: 'Ripple', icon: '⚫', apy: 0, minStake: 100 },
    { symbol: 'DOT', name: 'Polkadot', icon: '🟣', apy: 0, minStake: 1 },
    { symbol: 'MATIC', name: 'Polygon', icon: '🟣', apy: 0, minStake: 10 },
    { symbol: 'AVAX', name: 'Avalanche', icon: '🔴', apy: 0, minStake: 1 },
    { symbol: 'LINK', name: 'Chainlink', icon: '🔵', apy: 0, minStake: 1 },
    
    // Stablecoins
    { symbol: 'USDC', name: 'USD Coin', icon: '🔵', apy: 0, minStake: 10 },
    { symbol: 'USDT', name: 'Tether', icon: '🟢', apy: 0, minStake: 10 },
    { symbol: 'DAI', name: 'Dai', icon: '🟡', apy: 0, minStake: 10 },
    { symbol: 'BUSD', name: 'Binance USD', icon: '🟡', apy: 0, minStake: 10 },
    { symbol: 'FRAX', name: 'Frax', icon: '🔵', apy: 0, minStake: 10 },
    { symbol: 'TUSD', name: 'TrueUSD', icon: '🔵', apy: 0, minStake: 10 },
    
    // DeFi Tokens
    { symbol: 'UNI', name: 'Uniswap', icon: '🟣', apy: 0, minStake: 1 },
    { symbol: 'AAVE', name: 'Aave', icon: '🟣', apy: 0, minStake: 0.1 },
    { symbol: 'COMP', name: 'Compound', icon: '🔵', apy: 0, minStake: 0.1 },
    { symbol: 'CRV', name: 'Curve DAO', icon: '🔵', apy: 0, minStake: 10 },
    { symbol: 'SUSHI', name: 'SushiSwap', icon: '🟠', apy: 0, minStake: 1 },
    { symbol: 'YFI', name: 'Yearn Finance', icon: '🟡', apy: 0, minStake: 0.001 },
    { symbol: 'BAL', name: 'Balancer', icon: '🔵', apy: 0, minStake: 1 },
    { symbol: 'SNX', name: 'Synthetix', icon: '🟣', apy: 0, minStake: 1 },
    { symbol: '1INCH', name: '1inch', icon: '🔵', apy: 0, minStake: 1 },
    { symbol: 'SAND', name: 'The Sandbox', icon: '🟠', apy: 0, minStake: 10 },
    
    // Layer 1 & Layer 2
    { symbol: 'WBTC', name: 'Wrapped Bitcoin', icon: '🟠', apy: 0, minStake: 0.001 },
    { symbol: 'WETH', name: 'Wrapped Ethereum', icon: '🔵', apy: 0, minStake: 0.1 },
    { symbol: 'ARB', name: 'Arbitrum', icon: '🔵', apy: 0, minStake: 1 },
    { symbol: 'OP', name: 'Optimism', icon: '🔴', apy: 0, minStake: 1 },
    { symbol: 'FTM', name: 'Fantom', icon: '🔵', apy: 0, minStake: 1 },
    { symbol: 'NEAR', name: 'NEAR Protocol', icon: '🟣', apy: 0, minStake: 1 },
    { symbol: 'ATOM', name: 'Cosmos', icon: '🔵', apy: 0, minStake: 0.1 },
    { symbol: 'ALGO', name: 'Algorand', icon: '🔵', apy: 0, minStake: 1 },
    { symbol: 'VET', name: 'VeChain', icon: '🔵', apy: 0, minStake: 100 },
    { symbol: 'ICP', name: 'Internet Computer', icon: '🟣', apy: 0, minStake: 0.1 },
    
    // Gaming & Metaverse
    { symbol: 'AXS', name: 'Axie Infinity', icon: '🟣', apy: 0, minStake: 1 },
    { symbol: 'MANA', name: 'Decentraland', icon: '🔵', apy: 0, minStake: 10 },
    { symbol: 'ENJ', name: 'Enjin Coin', icon: '🟣', apy: 0, minStake: 10 },
    { symbol: 'GALA', name: 'Gala', icon: '🟣', apy: 0, minStake: 10 },
    { symbol: 'CHZ', name: 'Chiliz', icon: '🔴', apy: 0, minStake: 10 },
    { symbol: 'FLOW', name: 'Flow', icon: '🔵', apy: 0, minStake: 1 },
    
    // AI & Big Data
    { symbol: 'OCEAN', name: 'Ocean Protocol', icon: '🔵', apy: 0, minStake: 10 },
    { symbol: 'FET', name: 'Fetch.ai', icon: '🟣', apy: 0, minStake: 10 },
    { symbol: 'AGIX', name: 'SingularityNET', icon: '🟣', apy: 0, minStake: 10 },
    { symbol: 'RNDR', name: 'Render Token', icon: '🟠', apy: 0, minStake: 1 },
    { symbol: 'GRT', name: 'The Graph', icon: '🟣', apy: 0, minStake: 10 },
    
    // Privacy & Security
    { symbol: 'XMR', name: 'Monero', icon: '🟠', apy: 0, minStake: 0.1 },
    { symbol: 'ZEC', name: 'Zcash', icon: '🟡', apy: 0, minStake: 0.1 },
    { symbol: 'DASH', name: 'Dash', icon: '🔵', apy: 0, minStake: 0.1 },
    { symbol: 'LTC', name: 'Litecoin', icon: '🔵', apy: 0, minStake: 0.1 },
    { symbol: 'BCH', name: 'Bitcoin Cash', icon: '🟢', apy: 0, minStake: 0.1 },
    
    // Exchange Tokens
    { symbol: 'OKB', name: 'OKB', icon: '🔵', apy: 0, minStake: 1 },
    { symbol: 'HT', name: 'Huobi Token', icon: '🔴', apy: 0, minStake: 1 },
    { symbol: 'KCS', name: 'KuCoin Token', icon: '🔵', apy: 0, minStake: 1 },
    { symbol: 'GT', name: 'GateToken', icon: '🟣', apy: 0, minStake: 1 },
    
    // Meme Coins
    { symbol: 'DOGE', name: 'Dogecoin', icon: '🟡', apy: 0, minStake: 100 },
    { symbol: 'SHIB', name: 'Shiba Inu', icon: '🟠', apy: 0, minStake: 100000 },
    { symbol: 'PEPE', name: 'Pepe', icon: '🟢', apy: 0, minStake: 100000 },
    { symbol: 'FLOKI', name: 'FLOKI', icon: '🟠', apy: 0, minStake: 10000 },
    { symbol: 'BONK', name: 'Bonk', icon: '🟡', apy: 0, minStake: 10000 },
    
    // Emerging Tokens
    { symbol: 'INJ', name: 'Injective', icon: '🟣', apy: 0, minStake: 0.1 },
    { symbol: 'TIA', name: 'Celestia', icon: '🔵', apy: 0, minStake: 1 },
    { symbol: 'SEI', name: 'Sei Network', icon: '🔵', apy: 0, minStake: 1 },
    { symbol: 'SUI', name: 'Sui', icon: '🔵', apy: 0, minStake: 1 },
    { symbol: 'APT', name: 'Aptos', icon: '🔵', apy: 0, minStake: 1 },
    { symbol: 'MKR', name: 'Maker', icon: '🟠', apy: 0, minStake: 0.01 },
    { symbol: 'LDO', name: 'Lido DAO', icon: '🔵', apy: 0, minStake: 0.1 },
    { symbol: 'RUNE', name: 'THORChain', icon: '🟣', apy: 0, minStake: 1 },
    { symbol: 'KAVA', name: 'Kava', icon: '🟣', apy: 0, minStake: 1 },
    { symbol: 'ZIL', name: 'Zilliqa', icon: '🔵', apy: 0, minStake: 100 },
  ])

  const handleStake = () => {
    if (!selectedToken || !stakeAmount) {
      alert('Please select a token and enter amount')
      return
    }

    const amount = parseFloat(stakeAmount)
    if (amount > (userBalance[selectedToken] || 0)) {
      alert('Insufficient balance')
      return
    }

    const newStake = {
      id: Date.now(),
      token: selectedToken,
      amount: amount,
      timestamp: new Date().toISOString(),
      status: 'active'
    }

    setStakingHistory([newStake, ...stakingHistory])
    setUserBalance(prev => ({ ...prev, [selectedToken]: (prev[selectedToken] || 0) - amount }))
    setStakedBalance(prev => ({ ...prev, [selectedToken]: (prev[selectedToken] || 0) + amount }))
    setStakeAmount('')
    alert(`Successfully staked ${amount} ${selectedToken}!`)
  }

  const handleUnstake = () => {
    if (!selectedToken || !unstakeAmount) {
      alert('Please select a token and enter amount')
      return
    }

    const amount = parseFloat(unstakeAmount)
    if (amount > (stakedBalance[selectedToken] || 0)) {
      alert('Insufficient staked balance')
      return
    }

    const newUnstake = {
      id: Date.now(),
      token: selectedToken,
      amount: amount,
      timestamp: new Date().toISOString(),
      status: 'completed'
    }

    setStakingHistory([newUnstake, ...stakingHistory])
    setStakedBalance(prev => ({ ...prev, [selectedToken]: (prev[selectedToken] || 0) - amount }))
    setUserBalance(prev => ({ ...prev, [selectedToken]: (prev[selectedToken] || 0) + amount }))
    setUnstakeAmount('')
    alert(`Successfully unstaked ${amount} ${selectedToken}!`)
  }

  const handleAddToken = () => {
    const newToken = prompt('Enter token symbol (e.g., BTC):')
    if (newToken) {
      const apy = prompt('Enter APY percentage (e.g., 12.5):')
      const newTokenData = {
        symbol: newToken.toUpperCase(),
        name: newToken.toUpperCase(),
        icon: '🪙',
        apy: parseFloat(apy || '0'),
        minStake: 0.1
      }
      setAvailableTokens([...availableTokens, newTokenData])
    }
  }

  const handleSetBalance = (token: string) => {
    const balance = prompt(`Enter your ${token} balance:`)
    if (balance && !isNaN(parseFloat(balance))) {
      setUserBalance(prev => ({ ...prev, [token]: parseFloat(balance) }))
    }
  }

  const handleSetAPY = (token: string) => {
    const apy = prompt(`Enter APY for ${token} (%):`)
    if (apy && !isNaN(parseFloat(apy))) {
      setAvailableTokens(prev => prev.map(t => t.symbol === token ? { ...t, apy: parseFloat(apy) } : t))
    }
  }

  const handleTokenSelect = (token: string) => {
    setSelectedToken(token)
    setShowTokenSelector(false)
  }

  const handleHarvestRewards = (token: string) => {
    const rewards = stakingRewards[token] || 0
    if (rewards <= 0) {
      alert('No rewards to harvest')
      return
    }

    const newHarvest = {
      id: Date.now(),
      token,
      amount: rewards,
      timestamp: new Date().toISOString(),
      status: 'harvested'
    }

    setStakingHistory([newHarvest, ...stakingHistory])
    setStakingRewards(prev => ({ ...prev, [token]: 0 }))
    setUserBalance(prev => ({ ...prev, [token]: (prev[token] || 0) + rewards }))
    alert(`Successfully harvested ${rewards} ${token} rewards!`)
  }

  const handleHarvestAllRewards = () => {
    const totalRewards = Object.values(stakingRewards).reduce((sum, reward) => sum + reward, 0)
    if (totalRewards <= 0) {
      alert('No rewards to harvest')
      return
    }

    Object.keys(stakingRewards).forEach(token => {
      const rewards = stakingRewards[token]
      if (rewards > 0) {
        setUserBalance(prev => ({ ...prev, [token]: (prev[token] || 0) + rewards }))
      }
    })

    setStakingRewards({})
    alert(`Successfully harvested ${totalRewards} total rewards!`)
  }

  const handleAddStakingPool = () => {
    if (!newPool.name || !newPool.apy || !newPool.minStake || !newPool.maxStake || !newPool.lockPeriod) {
      alert('Please fill in all fields')
      return
    }

    const pool = {
      id: Date.now(),
      name: newPool.name,
      apy: parseFloat(newPool.apy),
      minStake: parseFloat(newPool.minStake),
      maxStake: parseFloat(newPool.maxStake),
      lockPeriod: parseInt(newPool.lockPeriod),
      totalStaked: 0,
      participants: 0,
      status: 'active'
    }

    setStakingPools([...stakingPools, pool])
    setNewPool({ name: '', apy: '', minStake: '', maxStake: '', lockPeriod: '' })
    setShowAddPool(false)
    alert('Staking pool created successfully!')
  }

  const calculateRewards = (token: string, amount: number) => {
    const tokenData = availableTokens.find(t => t.symbol === token)
    if (!tokenData) return 0
    return (amount * tokenData.apy) / 100
  }

  const getTotalStakedValue = () => {
    return Object.entries(stakedBalance).reduce((total, [token, amount]) => {
      return total + amount
    }, 0)
  }

  const getTotalRewards = () => {
    return Object.entries(stakedBalance).reduce((total, [token, amount]) => {
      return total + calculateRewards(token, amount)
    }, 0)
  }

  const updateStakingStats = () => {
    setStakingStats({
      totalStaked: getTotalStakedValue(),
      totalRewards: getTotalRewards(),
      activePools: stakingPools.length
    })
  }

  useEffect(() => {
    updateStakingStats()
  }, [stakedBalance, stakingPools])

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #FAFAFA 0%, #F3F4F6 100%)' }}>
      <Header />
      
      <Container maxWidth="lg" sx={{ pt: { xs: 12, md: 16 }, pb: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h2" sx={{ fontWeight: 800, mb: 2, background: 'linear-gradient(135deg, #1F2937 0%, #374151 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Stake & Earn
          </Typography>
          <Typography variant="h5" sx={{ color: theme.palette.text.secondary, maxWidth: 600, mx: 'auto' }}>
            Stake your tokens and earn passive income with customizable APY rates
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} lg={8}>
            <Card sx={{ background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(20px)', borderRadius: 4, p: 4, boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)', border: '1px solid rgba(255, 255, 255, 0.2)', opacity: animate ? 1 : 0, transform: animate ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.6s ease-out' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#1F2937' }}>Staking Dashboard</Typography>
                <IconButton onClick={() => setShowSettings(!showSettings)} sx={{ background: 'rgba(124, 58, 237, 0.1)', '&:hover': { background: 'rgba(124, 58, 237, 0.15)' } }}>
                  <SettingsIcon />
                </IconButton>
              </Box>

              {showSettings && (
                <Box sx={{ mb: 3, p: 3, borderRadius: 2, background: 'rgba(124, 58, 237, 0.05)' }}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Staking Settings</Typography>
                  <FormControlLabel control={<Switch checked={autoCompound} onChange={(e) => setAutoCompound(e.target.checked)} />} label="Auto-compound rewards" />
                </Box>
              )}

              <Box sx={{ mb: 3 }}>
                <Button onClick={() => setActiveTab(0)} sx={{ mr: 2, color: activeTab === 0 ? '#7C3AED' : theme.palette.text.secondary }}>Stake</Button>
                <Button onClick={() => setActiveTab(1)} sx={{ color: activeTab === 1 ? '#7C3AED' : theme.palette.text.secondary }}>Unstake</Button>
              </Box>

              {activeTab === 0 && (
                <Box>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>Stake Tokens</Typography>
                  
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1, color: theme.palette.text.secondary, fontWeight: 600 }}>Select Token to Stake</Typography>
                    <Button onClick={() => setShowTokenSelector(true)} sx={{ display: 'flex', alignItems: 'center', gap: 2, background: 'rgba(124, 58, 237, 0.05)', borderRadius: 2, px: 3, py: 2, border: '2px solid rgba(124, 58, 237, 0.1)', '&:hover': { background: 'rgba(124, 58, 237, 0.1)', borderColor: 'rgba(124, 58, 237, 0.2)' } }}>
                      <Avatar sx={{ width: 32, height: 32, background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)' }}>
                        {selectedToken ? availableTokens.find(t => t.symbol === selectedToken)?.icon || '🪙' : '?'}
                      </Avatar>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>{selectedToken || 'Select Token'}</Typography>
                    </Button>
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1, color: theme.palette.text.secondary, fontWeight: 600 }}>Amount to Stake</Typography>
                    <TextField fullWidth value={stakeAmount} onChange={(e) => setStakeAmount(e.target.value)} type="number" placeholder="0.0" InputProps={{ endAdornment: selectedToken && <Button size="small" onClick={() => setStakeAmount((userBalance[selectedToken] || 0).toString())} sx={{ color: '#7C3AED' }}>Max</Button> }} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, fontSize: '1.2rem', fontWeight: 600 } }} />
                    {selectedToken && <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mt: 1 }}>Available: {userBalance[selectedToken] || 0} {selectedToken}</Typography>}
                  </Box>

                  {selectedToken && (
                    <Box sx={{ mb: 3, p: 2, borderRadius: 2, background: 'rgba(16, 185, 129, 0.05)' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>APY Rate</Typography>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: '#10B981' }}>{availableTokens.find(t => t.symbol === selectedToken)?.apy || 0}%</Typography>
                      </Box>
                    </Box>
                  )}

                  <Button variant="contained" fullWidth size="large" onClick={handleStake} disabled={!selectedToken || !stakeAmount} startIcon={<LockIcon />} sx={{ py: 2, fontSize: '1.1rem', fontWeight: 600, borderRadius: 3, background: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)', boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3)', '&:hover': { background: 'linear-gradient(135deg, #059669 0%, #10B981 100%)', transform: 'translateY(-2px)', boxShadow: '0 12px 35px rgba(16, 185, 129, 0.4)' }, '&:disabled': { background: 'rgba(0, 0, 0, 0.12)', transform: 'none', boxShadow: 'none' } }}>
                    {!selectedToken ? 'Select Token' : `Stake ${stakeAmount || '0'} ${selectedToken}`}
                  </Button>
                </Box>
              )}

              {activeTab === 1 && (
                <Box>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>Unstake Tokens</Typography>
                  
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1, color: theme.palette.text.secondary, fontWeight: 600 }}>Select Token to Unstake</Typography>
                    <Button onClick={() => setShowTokenSelector(true)} sx={{ display: 'flex', alignItems: 'center', gap: 2, background: 'rgba(239, 68, 68, 0.05)', borderRadius: 2, px: 3, py: 2, border: '2px solid rgba(239, 68, 68, 0.1)', '&:hover': { background: 'rgba(239, 68, 68, 0.1)', borderColor: 'rgba(239, 68, 68, 0.2)' } }}>
                      <Avatar sx={{ width: 32, height: 32, background: 'linear-gradient(135deg, #EF4444 0%, #F87171 100%)' }}>
                        {selectedToken ? availableTokens.find(t => t.symbol === selectedToken)?.icon || '🪙' : '?'}
                      </Avatar>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>{selectedToken || 'Select Token'}</Typography>
                    </Button>
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1, color: theme.palette.text.secondary, fontWeight: 600 }}>Amount to Unstake</Typography>
                    <TextField fullWidth value={unstakeAmount} onChange={(e) => setUnstakeAmount(e.target.value)} type="number" placeholder="0.0" InputProps={{ endAdornment: selectedToken && <Button size="small" onClick={() => setUnstakeAmount((stakedBalance[selectedToken] || 0).toString())} sx={{ color: '#EF4444' }}>Max</Button> }} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, fontSize: '1.2rem', fontWeight: 600 } }} />
                    {selectedToken && <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mt: 1 }}>Staked: {stakedBalance[selectedToken] || 0} {selectedToken}</Typography>}
                  </Box>

                  <Button variant="contained" fullWidth size="large" onClick={handleUnstake} disabled={!selectedToken || !unstakeAmount} startIcon={<UnlockIcon />} sx={{ py: 2, fontSize: '1.1rem', fontWeight: 600, borderRadius: 3, background: 'linear-gradient(135deg, #EF4444 0%, #F87171 100%)', boxShadow: '0 8px 25px rgba(239, 68, 68, 0.3)', '&:hover': { background: 'linear-gradient(135deg, #DC2626 0%, #EF4444 100%)', transform: 'translateY(-2px)', boxShadow: '0 12px 35px rgba(239, 68, 68, 0.4)' }, '&:disabled': { background: 'rgba(0, 0, 0, 0.12)', transform: 'none', boxShadow: 'none' } }}>
                    {!selectedToken ? 'Select Token' : `Unstake ${unstakeAmount || '0'} ${selectedToken}`}
                  </Button>
                </Box>
              )}
            </Card>
          </Grid>

          <Grid item xs={12} lg={4}>
            <Stack spacing={3}>
              <Card sx={{ background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(20px)', borderRadius: 3, p: 3, boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#1F2937' }}>Staking Pools</Typography>
                  <Button size="small" startIcon={<AddIcon />} onClick={handleAddToken} sx={{ color: '#7C3AED' }}>Add Pool</Button>
                </Box>
                <Stack spacing={2}>
                  {availableTokens.map((token) => (
                    <Box key={token.symbol} sx={{ p: 2, borderRadius: 2, background: 'rgba(124, 58, 237, 0.05)', transition: 'all 0.3s ease', '&:hover': { background: 'rgba(124, 58, 237, 0.1)' } }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar sx={{ width: 32, height: 32, background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)' }}>{token.icon}</Avatar>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{token.symbol}</Typography>
                        </Box>
                        <IconButton size="small" onClick={() => handleSetAPY(token.symbol)} sx={{ color: theme.palette.text.secondary }}>
                          <SettingsIcon fontSize="small" />
                        </IconButton>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>APY: {token.apy}%</Typography>
                        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>Staked: {stakedBalance[token.symbol] || 0}</Typography>
                      </Box>
                      <Button size="small" onClick={() => handleSetBalance(token.symbol)} sx={{ color: '#7C3AED', fontSize: '0.75rem', mt: 1 }}>Set Balance</Button>
                    </Box>
                  ))}
                </Stack>
              </Card>

              <Card sx={{ background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(20px)', borderRadius: 3, p: 3, boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 700, color: '#1F2937' }}>Staking History</Typography>
                <Stack spacing={2}>
                  {stakingHistory.slice(0, 5).map((stake) => (
                    <Box key={stake.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, borderRadius: 2, background: 'rgba(0, 0, 0, 0.02)' }}>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{stake.amount} {stake.token}</Typography>
                        <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>{new Date(stake.timestamp).toLocaleString()}</Typography>
                      </Box>
                      <Chip label={stake.status} size="small" sx={{ background: stake.status === 'active' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(124, 58, 237, 0.1)', color: stake.status === 'active' ? '#10B981' : '#7C3AED' }} />
                    </Box>
                  ))}
                  {stakingHistory.length === 0 && (
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary, textAlign: 'center', py: 2 }}>No staking history yet. Start staking to see your activity.</Typography>
                  )}
                </Stack>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      <Dialog open={showTokenSelector} onClose={() => setShowTokenSelector(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Select Token</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 2 }}>
            {availableTokens.map((token) => (
              <Button key={token.symbol} onClick={() => handleTokenSelect(token.symbol)} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, borderRadius: 2, background: 'rgba(124, 58, 237, 0.05)', '&:hover': { background: 'rgba(124, 58, 237, 0.1)' } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ width: 32, height: 32, background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)' }}>{token.icon}</Avatar>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{token.symbol}</Typography>
                    <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>APY: {token.apy}%</Typography>
                  </Box>
                </Box>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>Staked: {stakedBalance[token.symbol] || 0}</Typography>
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
