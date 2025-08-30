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
  LinearProgress,
} from '@mui/material'
import {
  Agriculture as FarmingIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  Settings as SettingsIcon,
  Star as StarIcon,
  TrendingUp as TrendingUpIcon,
  Timer as TimerIcon,
  Calculate as CalculateIcon,
} from '@mui/icons-material'
import Header from '../../components/Header'

export default function FarmPage() {
  const theme = useTheme()
  const [animate, setAnimate] = useState(false)
  const [selectedPool, setSelectedPool] = useState('')
  const [stakeAmount, setStakeAmount] = useState('')
  const [unstakeAmount, setUnstakeAmount] = useState('')
  const [showSettings, setShowSettings] = useState(false)
  const [showPoolSelector, setShowPoolSelector] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const [userBalance, setUserBalance] = useState<{[key: string]: number}>({})
  const [farmedBalance, setFarmedBalance] = useState<{[key: string]: number}>({})
  const [farmingHistory, setFarmingHistory] = useState<any[]>([])
  const [autoCompound, setAutoCompound] = useState(false)

  useEffect(() => {
    setAnimate(true)
  }, [])

  const [availablePools, setAvailablePools] = useState([
    { 
      id: 'ETH-USDC', 
      name: 'ETH-USDC LP', 
      token1: 'ETH', 
      token2: 'USDC', 
      icon1: '🔵', 
      icon2: '🔵', 
      apr: 0, 
      tvl: 0,
      userStaked: 0,
      rewards: 0
    },
    { 
      id: 'USDT-DAI', 
      name: 'USDT-DAI LP', 
      token1: 'USDT', 
      token2: 'DAI', 
      icon1: '🟢', 
      icon2: '🟡', 
      apr: 0, 
      tvl: 0,
      userStaked: 0,
      rewards: 0
    },
  ])

  const handleStake = () => {
    if (!selectedPool || !stakeAmount) {
      alert('Please select a pool and enter amount')
      return
    }

    const amount = parseFloat(stakeAmount)
    const pool = availablePools.find(p => p.id === selectedPool)
    
    if (!pool) return

    if (amount > (userBalance[pool.token1] || 0) || amount > (userBalance[pool.token2] || 0)) {
      alert('Insufficient balance for both tokens')
      return
    }

    const newStake = {
      id: Date.now(),
      pool: selectedPool,
      amount: amount,
      timestamp: new Date().toISOString(),
      status: 'active'
    }

    setFarmingHistory([newStake, ...farmingHistory])
    
    // Update balances
    setUserBalance(prev => ({
      ...prev,
      [pool.token1]: (prev[pool.token1] || 0) - amount,
      [pool.token2]: (prev[pool.token2] || 0) - amount
    }))
    
    setFarmedBalance(prev => ({
      ...prev,
      [selectedPool]: (prev[selectedPool] || 0) + amount
    }))

    // Update pool user staked amount
    setAvailablePools(prev => prev.map(p => 
      p.id === selectedPool ? { ...p, userStaked: p.userStaked + amount } : p
    ))

    setStakeAmount('')
    alert(`Successfully staked ${amount} LP tokens in ${pool.name}!`)
  }

  const handleUnstake = () => {
    if (!selectedPool || !unstakeAmount) {
      alert('Please select a pool and enter amount')
      return
    }

    const amount = parseFloat(unstakeAmount)
    
    if (amount > (farmedBalance[selectedPool] || 0)) {
      alert('Insufficient staked balance')
      return
    }

    const newUnstake = {
      id: Date.now(),
      pool: selectedPool,
      amount: amount,
      timestamp: new Date().toISOString(),
      status: 'completed'
    }

    setFarmingHistory([newUnstake, ...farmingHistory])
    
    // Update balances
    setFarmedBalance(prev => ({
      ...prev,
      [selectedPool]: (prev[selectedPool] || 0) - amount
    }))

    // Update pool user staked amount
    setAvailablePools(prev => prev.map(p => 
      p.id === selectedPool ? { ...p, userStaked: p.userStaked - amount } : p
    ))

    setUnstakeAmount('')
    alert(`Successfully unstaked ${amount} LP tokens!`)
  }

  const handleHarvest = (poolId: string) => {
    const pool = availablePools.find(p => p.id === poolId)
    if (!pool || pool.rewards <= 0) {
      alert('No rewards to harvest')
      return
    }

    const newHarvest = {
      id: Date.now(),
      pool: poolId,
      amount: pool.rewards,
      timestamp: new Date().toISOString(),
      status: 'harvested'
    }

    setFarmingHistory([newHarvest, ...farmingHistory])
    
    // Reset rewards
    setAvailablePools(prev => prev.map(p => 
      p.id === poolId ? { ...p, rewards: 0 } : p
    ))

    alert(`Successfully harvested ${pool.rewards} rewards!`)
  }

  const handleAddPool = () => {
    const token1 = prompt('Enter first token symbol (e.g., ETH):')
    if (!token1) return
    
    const token2 = prompt('Enter second token symbol (e.g., USDC):')
    if (!token2) return
    
    const apr = prompt('Enter APR percentage (e.g., 25.5):')
    
    const newPool = {
      id: `${token1.toUpperCase()}-${token2.toUpperCase()}`,
      name: `${token1.toUpperCase()}-${token2.toUpperCase()} LP`,
      token1: token1.toUpperCase(),
      token2: token2.toUpperCase(),
      icon1: '🪙',
      icon2: '🪙',
      apr: parseFloat(apr || '0'),
      tvl: 0,
      userStaked: 0,
      rewards: 0
    }
    
    setAvailablePools([...availablePools, newPool])
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

  const handleSetAPR = (poolId: string) => {
    const apr = prompt(`Enter APR for ${poolId} (%):`)
    if (apr && !isNaN(parseFloat(apr))) {
      setAvailablePools(prev => prev.map(p => 
        p.id === poolId ? { ...p, apr: parseFloat(apr) } : p
      ))
    }
  }

  const handlePoolSelect = (poolId: string) => {
    setSelectedPool(poolId)
    setShowPoolSelector(false)
  }

  const getTotalFarmedValue = () => {
    return Object.values(farmedBalance).reduce((total, amount) => total + amount, 0)
  }

  const getTotalRewards = () => {
    return availablePools.reduce((total, pool) => total + pool.rewards, 0)
  }

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #FAFAFA 0%, #F3F4F6 100%)' }}>
      <Header />
      
      <Container maxWidth="lg" sx={{ pt: { xs: 12, md: 16 }, pb: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h2" sx={{ fontWeight: 800, mb: 2, background: 'linear-gradient(135deg, #1F2937 0%, #374151 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Liquidity Farming
          </Typography>
          <Typography variant="h5" sx={{ color: theme.palette.text.secondary, maxWidth: 600, mx: 'auto' }}>
            Provide liquidity and earn rewards with competitive APR rates
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} lg={8}>
            <Card sx={{ background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(20px)', borderRadius: 4, p: 4, boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)', border: '1px solid rgba(255, 255, 255, 0.2)', opacity: animate ? 1 : 0, transform: animate ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.6s ease-out' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#1F2937' }}>Farming Dashboard</Typography>
                <IconButton onClick={() => setShowSettings(!showSettings)} sx={{ background: 'rgba(124, 58, 237, 0.1)', '&:hover': { background: 'rgba(124, 58, 237, 0.15)' } }}>
                  <SettingsIcon />
                </IconButton>
              </Box>

              {showSettings && (
                <Box sx={{ mb: 3, p: 3, borderRadius: 2, background: 'rgba(124, 58, 237, 0.05)' }}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Farming Settings</Typography>
                  <FormControlLabel control={<Switch checked={autoCompound} onChange={(e) => setAutoCompound(e.target.checked)} />} label="Auto-compound rewards" />
                </Box>
              )}

              <Box sx={{ mb: 3 }}>
                <Button onClick={() => setActiveTab(0)} sx={{ mr: 2, color: activeTab === 0 ? '#7C3AED' : theme.palette.text.secondary }}>Stake LP</Button>
                <Button onClick={() => setActiveTab(1)} sx={{ color: activeTab === 1 ? '#7C3AED' : theme.palette.text.secondary }}>Unstake LP</Button>
              </Box>

              {activeTab === 0 && (
                <Box>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>Stake LP Tokens</Typography>
                  
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1, color: theme.palette.text.secondary, fontWeight: 600 }}>Select Pool</Typography>
                    <Button onClick={() => setShowPoolSelector(true)} sx={{ display: 'flex', alignItems: 'center', gap: 2, background: 'rgba(124, 58, 237, 0.05)', borderRadius: 2, px: 3, py: 2, border: '2px solid rgba(124, 58, 237, 0.1)', '&:hover': { background: 'rgba(124, 58, 237, 0.1)', borderColor: 'rgba(124, 58, 237, 0.2)' } }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {selectedPool ? (
                          <>
                            <Avatar sx={{ width: 24, height: 24, background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)' }}>
                              {availablePools.find(p => p.id === selectedPool)?.icon1}
                            </Avatar>
                            <Avatar sx={{ width: 24, height: 24, background: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)' }}>
                              {availablePools.find(p => p.id === selectedPool)?.icon2}
                            </Avatar>
                          </>
                        ) : (
                          <Avatar sx={{ width: 32, height: 32, background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)' }}>?</Avatar>
                        )}
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>{selectedPool ? availablePools.find(p => p.id === selectedPool)?.name : 'Select Pool'}</Typography>
                    </Button>
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1, color: theme.palette.text.secondary, fontWeight: 600 }}>Amount to Stake</Typography>
                    <TextField fullWidth value={stakeAmount} onChange={(e) => setStakeAmount(e.target.value)} type="number" placeholder="0.0" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, fontSize: '1.2rem', fontWeight: 600 } }} />
                    {selectedPool && (
                      <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mt: 1 }}>
                        Available: {userBalance[availablePools.find(p => p.id === selectedPool)?.token1 || ''] || 0} {availablePools.find(p => p.id === selectedPool)?.token1} / {userBalance[availablePools.find(p => p.id === selectedPool)?.token2 || ''] || 0} {availablePools.find(p => p.id === selectedPool)?.token2}
                      </Typography>
                    )}
                  </Box>

                  {selectedPool && (
                    <Box sx={{ mb: 3, p: 2, borderRadius: 2, background: 'rgba(16, 185, 129, 0.05)' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>APR Rate</Typography>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: '#10B981' }}>{availablePools.find(p => p.id === selectedPool)?.apr || 0}%</Typography>
                      </Box>
                    </Box>
                  )}

                  <Button variant="contained" fullWidth size="large" onClick={handleStake} disabled={!selectedPool || !stakeAmount} startIcon={<FarmingIcon />} sx={{ py: 2, fontSize: '1.1rem', fontWeight: 600, borderRadius: 3, background: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)', boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3)', '&:hover': { background: 'linear-gradient(135deg, #059669 0%, #10B981 100%)', transform: 'translateY(-2px)', boxShadow: '0 12px 35px rgba(16, 185, 129, 0.4)' }, '&:disabled': { background: 'rgba(0, 0, 0, 0.12)', transform: 'none', boxShadow: 'none' } }}>
                    {!selectedPool ? 'Select Pool' : `Stake ${stakeAmount || '0'} LP Tokens`}
                  </Button>
                </Box>
              )}

              {activeTab === 1 && (
                <Box>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>Unstake LP Tokens</Typography>
                  
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1, color: theme.palette.text.secondary, fontWeight: 600 }}>Select Pool</Typography>
                    <Button onClick={() => setShowPoolSelector(true)} sx={{ display: 'flex', alignItems: 'center', gap: 2, background: 'rgba(239, 68, 68, 0.05)', borderRadius: 2, px: 3, py: 2, border: '2px solid rgba(239, 68, 68, 0.1)', '&:hover': { background: 'rgba(239, 68, 68, 0.1)', borderColor: 'rgba(239, 68, 68, 0.2)' } }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {selectedPool ? (
                          <>
                            <Avatar sx={{ width: 24, height: 24, background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)' }}>
                              {availablePools.find(p => p.id === selectedPool)?.icon1}
                            </Avatar>
                            <Avatar sx={{ width: 24, height: 24, background: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)' }}>
                              {availablePools.find(p => p.id === selectedPool)?.icon2}
                            </Avatar>
                          </>
                        ) : (
                          <Avatar sx={{ width: 32, height: 32, background: 'linear-gradient(135deg, #EF4444 0%, #F87171 100%)' }}>?</Avatar>
                        )}
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>{selectedPool ? availablePools.find(p => p.id === selectedPool)?.name : 'Select Pool'}</Typography>
                    </Button>
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1, color: theme.palette.text.secondary, fontWeight: 600 }}>Amount to Unstake</Typography>
                    <TextField fullWidth value={unstakeAmount} onChange={(e) => setUnstakeAmount(e.target.value)} type="number" placeholder="0.0" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, fontSize: '1.2rem', fontWeight: 600 } }} />
                    {selectedPool && (
                      <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mt: 1 }}>
                        Staked: {farmedBalance[selectedPool] || 0} LP Tokens
                      </Typography>
                    )}
                  </Box>

                  <Button variant="contained" fullWidth size="large" onClick={handleUnstake} disabled={!selectedPool || !unstakeAmount} startIcon={<RemoveIcon />} sx={{ py: 2, fontSize: '1.1rem', fontWeight: 600, borderRadius: 3, background: 'linear-gradient(135deg, #EF4444 0%, #F87171 100%)', boxShadow: '0 8px 25px rgba(239, 68, 68, 0.3)', '&:hover': { background: 'linear-gradient(135deg, #DC2626 0%, #EF4444 100%)', transform: 'translateY(-2px)', boxShadow: '0 12px 35px rgba(239, 68, 68, 0.4)' }, '&:disabled': { background: 'rgba(0, 0, 0, 0.12)', transform: 'none', boxShadow: 'none' } }}>
                    {!selectedPool ? 'Select Pool' : `Unstake ${unstakeAmount || '0'} LP Tokens`}
                  </Button>
                </Box>
              )}
            </Card>
          </Grid>

          <Grid item xs={12} lg={4}>
            <Stack spacing={3}>
              <Card sx={{ background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(20px)', borderRadius: 3, p: 3, boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#1F2937' }}>Farming Pools</Typography>
                  <Button size="small" startIcon={<AddIcon />} onClick={handleAddPool} sx={{ color: '#7C3AED' }}>Add Pool</Button>
                </Box>
                <Stack spacing={2}>
                  {availablePools.map((pool) => (
                    <Box key={pool.id} sx={{ p: 2, borderRadius: 2, background: 'rgba(124, 58, 237, 0.05)', transition: 'all 0.3s ease', '&:hover': { background: 'rgba(124, 58, 237, 0.1)' } }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Avatar sx={{ width: 24, height: 24, background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)' }}>{pool.icon1}</Avatar>
                            <Avatar sx={{ width: 24, height: 24, background: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)' }}>{pool.icon2}</Avatar>
                          </Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{pool.name}</Typography>
                        </Box>
                        <IconButton size="small" onClick={() => handleSetAPR(pool.id)} sx={{ color: theme.palette.text.secondary }}>
                          <SettingsIcon fontSize="small" />
                        </IconButton>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>APR: {pool.apr}%</Typography>
                        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>Staked: {pool.userStaked}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>Rewards: {pool.rewards.toFixed(4)}</Typography>
                        <Button size="small" onClick={() => handleHarvest(pool.id)} disabled={pool.rewards <= 0} sx={{ color: '#10B981', fontSize: '0.75rem' }}>Harvest</Button>
                      </Box>
                      <Button size="small" onClick={() => handleSetBalance(pool.token1)} sx={{ color: '#7C3AED', fontSize: '0.75rem', mr: 1 }}>Set {pool.token1}</Button>
                      <Button size="small" onClick={() => handleSetBalance(pool.token2)} sx={{ color: '#7C3AED', fontSize: '0.75rem' }}>Set {pool.token2}</Button>
                    </Box>
                  ))}
                </Stack>
              </Card>

              <Card sx={{ background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(20px)', borderRadius: 3, p: 3, boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 700, color: '#1F2937' }}>Farming Stats</Typography>
                <Stack spacing={2}>
                  <Box sx={{ p: 2, borderRadius: 2, background: 'rgba(16, 185, 129, 0.05)' }}>
                    <Typography variant="h4" sx={{ fontWeight: 800, color: '#10B981', mb: 1 }}>{getTotalFarmedValue().toFixed(2)}</Typography>
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>Total Value Farmed</Typography>
                  </Box>
                  <Box sx={{ p: 2, borderRadius: 2, background: 'rgba(124, 58, 237, 0.05)' }}>
                    <Typography variant="h4" sx={{ fontWeight: 800, color: '#7C3AED', mb: 1 }}>{getTotalRewards().toFixed(4)}</Typography>
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>Total Rewards Earned</Typography>
                  </Box>
                </Stack>
              </Card>

              <Card sx={{ background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(20px)', borderRadius: 3, p: 3, boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 700, color: '#1F2937' }}>Farming History</Typography>
                <Stack spacing={2}>
                  {farmingHistory.slice(0, 5).map((farm) => (
                    <Box key={farm.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, borderRadius: 2, background: 'rgba(0, 0, 0, 0.02)' }}>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{farm.amount} {farm.pool}</Typography>
                        <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>{new Date(farm.timestamp).toLocaleString()}</Typography>
                      </Box>
                      <Chip label={farm.status} size="small" sx={{ background: farm.status === 'active' ? 'rgba(16, 185, 129, 0.1)' : farm.status === 'harvested' ? 'rgba(124, 58, 237, 0.1)' : 'rgba(239, 68, 68, 0.1)', color: farm.status === 'active' ? '#10B981' : farm.status === 'harvested' ? '#7C3AED' : '#EF4444' }} />
                    </Box>
                  ))}
                  {farmingHistory.length === 0 && (
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary, textAlign: 'center', py: 2 }}>No farming history yet. Start farming to see your activity.</Typography>
                  )}
                </Stack>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      <Dialog open={showPoolSelector} onClose={() => setShowPoolSelector(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Select Pool</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 2 }}>
            {availablePools.map((pool) => (
              <Button key={pool.id} onClick={() => handlePoolSelect(pool.id)} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, borderRadius: 2, background: 'rgba(124, 58, 237, 0.05)', '&:hover': { background: 'rgba(124, 58, 237, 0.1)' } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar sx={{ width: 24, height: 24, background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)' }}>{pool.icon1}</Avatar>
                    <Avatar sx={{ width: 24, height: 24, background: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)' }}>{pool.icon2}</Avatar>
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{pool.name}</Typography>
                    <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>APR: {pool.apr}%</Typography>
                  </Box>
                </Box>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>Staked: {pool.userStaked}</Typography>
              </Button>
            ))}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowPoolSelector(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
