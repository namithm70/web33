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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material'
import {
  TrendingUp as PortfolioIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  Settings as SettingsIcon,
  Star as StarIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  AccountBalance as AccountBalanceIcon,
  ShowChart as ShowChartIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material'
import Header from '../../components/Header'

export default function PortfolioPage() {
  const theme = useTheme()
  const [animate, setAnimate] = useState(false)
  const [showAddAsset, setShowAddAsset] = useState(false)
  const [newAsset, setNewAsset] = useState({ symbol: '', amount: '', price: '' })
  const [portfolioAssets, setPortfolioAssets] = useState<any[]>([])
  const [totalValue, setTotalValue] = useState(0)
  const [totalChange, setTotalChange] = useState(0)
  const [activeTab, setActiveTab] = useState(0)

  useEffect(() => {
    setAnimate(true)
  }, [])

  const handleAddAsset = () => {
    if (!newAsset.symbol || !newAsset.amount || !newAsset.price) {
      alert('Please fill in all fields')
      return
    }

    const asset = {
      id: Date.now(),
      symbol: newAsset.symbol.toUpperCase(),
      name: newAsset.symbol.toUpperCase(),
      amount: parseFloat(newAsset.amount),
      price: parseFloat(newAsset.price),
      change: 0,
      icon: '🪙',
      timestamp: new Date().toISOString()
    }

    setPortfolioAssets([...portfolioAssets, asset])
    setNewAsset({ symbol: '', amount: '', price: '' })
    setShowAddAsset(false)
    calculatePortfolioValue()
  }

  const handleRemoveAsset = (id: number) => {
    setPortfolioAssets(portfolioAssets.filter(asset => asset.id !== id))
    calculatePortfolioValue()
  }

  const handleUpdatePrice = (id: number) => {
    const asset = portfolioAssets.find(a => a.id === id)
    if (!asset) return

    const newPrice = prompt(`Enter new price for ${asset.symbol}:`)
    if (newPrice && !isNaN(parseFloat(newPrice))) {
      const oldPrice = asset.price
      const newPriceValue = parseFloat(newPrice)
      const change = ((newPriceValue - oldPrice) / oldPrice) * 100

      setPortfolioAssets(prev => prev.map(a => 
        a.id === id ? { ...a, price: newPriceValue, change } : a
      ))
      calculatePortfolioValue()
    }
  }

  const handleUpdateAmount = (id: number) => {
    const asset = portfolioAssets.find(a => a.id === id)
    if (!asset) return

    const newAmount = prompt(`Enter new amount for ${asset.symbol}:`)
    if (newAmount && !isNaN(parseFloat(newAmount))) {
      setPortfolioAssets(prev => prev.map(a => 
        a.id === id ? { ...a, amount: parseFloat(newAmount) } : a
      ))
      calculatePortfolioValue()
    }
  }

  const calculatePortfolioValue = () => {
    const total = portfolioAssets.reduce((sum, asset) => sum + (asset.amount * asset.price), 0)
    setTotalValue(total)
    
    const totalChangeValue = portfolioAssets.reduce((sum, asset) => {
      const assetValue = asset.amount * asset.price
      const changeValue = assetValue * (asset.change / 100)
      return sum + changeValue
    }, 0)
    setTotalChange(totalChangeValue)
  }

  useEffect(() => {
    calculatePortfolioValue()
  }, [portfolioAssets])

  const getTopPerformers = () => {
    return [...portfolioAssets].sort((a, b) => b.change - a.change).slice(0, 3)
  }

  const getWorstPerformers = () => {
    return [...portfolioAssets].sort((a, b) => a.change - b.change).slice(0, 3)
  }

  const getAssetAllocation = () => {
    const total = portfolioAssets.reduce((sum, asset) => sum + (asset.amount * asset.price), 0)
    return portfolioAssets.map(asset => ({
      ...asset,
      percentage: total > 0 ? ((asset.amount * asset.price) / total) * 100 : 0
    }))
  }

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #FAFAFA 0%, #F3F4F6 100%)' }}>
      <Header />
      
      <Container maxWidth="lg" sx={{ pt: { xs: 12, md: 16 }, pb: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h2" sx={{ fontWeight: 800, mb: 2, background: 'linear-gradient(135deg, #1F2937 0%, #374151 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Portfolio Overview
          </Typography>
          <Typography variant="h5" sx={{ color: theme.palette.text.secondary, maxWidth: 600, mx: 'auto' }}>
            Track your assets, performance, and portfolio analytics
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} lg={8}>
            <Card sx={{ background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(20px)', borderRadius: 4, p: 4, boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)', border: '1px solid rgba(255, 255, 255, 0.2)', opacity: animate ? 1 : 0, transform: animate ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.6s ease-out' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#1F2937' }}>Portfolio Dashboard</Typography>
                <Button startIcon={<AddIcon />} onClick={() => setShowAddAsset(true)} sx={{ color: '#7C3AED' }}>Add Asset</Button>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Button onClick={() => setActiveTab(0)} sx={{ mr: 2, color: activeTab === 0 ? '#7C3AED' : theme.palette.text.secondary }}>Overview</Button>
                <Button onClick={() => setActiveTab(1)} sx={{ mr: 2, color: activeTab === 1 ? '#7C3AED' : theme.palette.text.secondary }}>Assets</Button>
                <Button onClick={() => setActiveTab(2)} sx={{ color: activeTab === 2 ? '#7C3AED' : theme.palette.text.secondary }}>Analytics</Button>
              </Box>

              {activeTab === 0 && (
                <Box>
                  <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} sm={6}>
                      <Card sx={{ p: 3, background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.1)' }}>
                        <Typography variant="h4" sx={{ fontWeight: 800, color: '#10B981', mb: 1 }}>${totalValue.toFixed(2)}</Typography>
                        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>Total Portfolio Value</Typography>
                      </Card>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Card sx={{ p: 3, background: totalChange >= 0 ? 'rgba(16, 185, 129, 0.05)' : 'rgba(239, 68, 68, 0.05)', border: totalChange >= 0 ? '1px solid rgba(16, 185, 129, 0.1)' : '1px solid rgba(239, 68, 68, 0.1)' }}>
                        <Typography variant="h4" sx={{ fontWeight: 800, color: totalChange >= 0 ? '#10B981' : '#EF4444', mb: 1 }}>
                          {totalChange >= 0 ? '+' : ''}${totalChange.toFixed(2)}
                        </Typography>
                        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>Total Change</Typography>
                      </Card>
                    </Grid>
                  </Grid>

                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Top Performers</Typography>
                  <Stack spacing={2} sx={{ mb: 4 }}>
                    {getTopPerformers().map((asset) => (
                      <Box key={asset.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, borderRadius: 2, background: 'rgba(16, 185, 129, 0.05)' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar sx={{ width: 32, height: 32, background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)' }}>{asset.icon}</Avatar>
                          <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{asset.symbol}</Typography>
                            <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>${asset.price}</Typography>
                          </Box>
                        </Box>
                        <Box sx={{ textAlign: 'right' }}>
                          <Typography variant="h6" sx={{ fontWeight: 700, color: '#10B981' }}>+{asset.change.toFixed(2)}%</Typography>
                          <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>${(asset.amount * asset.price).toFixed(2)}</Typography>
                        </Box>
                      </Box>
                    ))}
                    {getTopPerformers().length === 0 && (
                      <Typography variant="body2" sx={{ color: theme.palette.text.secondary, textAlign: 'center', py: 2 }}>No assets added yet. Add assets to see performance.</Typography>
                    )}
                  </Stack>
                </Box>
              )}

              {activeTab === 1 && (
                <Box>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>Your Assets</Typography>
                  <TableContainer component={Paper} sx={{ background: 'transparent', boxShadow: 'none' }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 600 }}>Asset</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Amount</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Price</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Value</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Change</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {portfolioAssets.map((asset) => (
                          <TableRow key={asset.id}>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Avatar sx={{ width: 32, height: 32, background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)' }}>{asset.icon}</Avatar>
                                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{asset.symbol}</Typography>
                              </Box>
                            </TableCell>
                            <TableCell>{asset.amount}</TableCell>
                            <TableCell>${asset.price}</TableCell>
                            <TableCell>${(asset.amount * asset.price).toFixed(2)}</TableCell>
                            <TableCell>
                              <Chip 
                                label={`${asset.change >= 0 ? '+' : ''}${asset.change.toFixed(2)}%`}
                                size="small"
                                sx={{
                                  background: asset.change >= 0 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                  color: asset.change >= 0 ? '#10B981' : '#EF4444',
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', gap: 1 }}>
                                <IconButton size="small" onClick={() => handleUpdatePrice(asset.id)} sx={{ color: '#7C3AED' }}>
                                  <SettingsIcon fontSize="small" />
                                </IconButton>
                                <IconButton size="small" onClick={() => handleUpdateAmount(asset.id)} sx={{ color: '#10B981' }}>
                                  <RefreshIcon fontSize="small" />
                                </IconButton>
                                <IconButton size="small" onClick={() => handleRemoveAsset(asset.id)} sx={{ color: '#EF4444' }}>
                                  <RemoveIcon fontSize="small" />
                                </IconButton>
                              </Box>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  {portfolioAssets.length === 0 && (
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary, textAlign: 'center', py: 4 }}>No assets added yet. Add your first asset to get started.</Typography>
                  )}
                </Box>
              )}

              {activeTab === 2 && (
                <Box>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>Portfolio Analytics</Typography>
                  
                  <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} sm={6}>
                      <Card sx={{ p: 3, background: 'rgba(124, 58, 237, 0.05)', border: '1px solid rgba(124, 58, 237, 0.1)' }}>
                        <Typography variant="h4" sx={{ fontWeight: 800, color: '#7C3AED', mb: 1 }}>{portfolioAssets.length}</Typography>
                        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>Total Assets</Typography>
                      </Card>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Card sx={{ p: 3, background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.1)' }}>
                        <Typography variant="h4" sx={{ fontWeight: 800, color: '#10B981', mb: 1 }}>{getTopPerformers().length}</Typography>
                        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>Profitable Assets</Typography>
                      </Card>
                    </Grid>
                  </Grid>

                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Asset Allocation</Typography>
                  <Stack spacing={2}>
                    {getAssetAllocation().map((asset) => (
                      <Box key={asset.id} sx={{ p: 2, borderRadius: 2, background: 'rgba(255, 255, 255, 0.8)' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{asset.symbol}</Typography>
                          <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>{asset.percentage.toFixed(1)}%</Typography>
                        </Box>
                        <LinearProgress 
                          variant="determinate" 
                          value={asset.percentage} 
                          sx={{ 
                            height: 8, 
                            borderRadius: 4,
                            background: 'rgba(124, 58, 237, 0.1)',
                            '& .MuiLinearProgress-bar': {
                              background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)',
                            }
                          }} 
                        />
                      </Box>
                    ))}
                  </Stack>
                </Box>
              )}
            </Card>
          </Grid>

          <Grid item xs={12} lg={4}>
            <Stack spacing={3}>
              <Card sx={{ background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(20px)', borderRadius: 3, p: 3, boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 700, color: '#1F2937' }}>Quick Actions</Typography>
                <Stack spacing={2}>
                  <Button fullWidth variant="outlined" startIcon={<AddIcon />} onClick={() => setShowAddAsset(true)} sx={{ borderColor: '#7C3AED', color: '#7C3AED', '&:hover': { borderColor: '#6D28D9', background: 'rgba(124, 58, 237, 0.05)' } }}>
                    Add New Asset
                  </Button>
                  <Button fullWidth variant="outlined" startIcon={<RefreshIcon />} onClick={() => window.location.reload()} sx={{ borderColor: '#10B981', color: '#10B981', '&:hover': { borderColor: '#059669', background: 'rgba(16, 185, 129, 0.05)' } }}>
                    Refresh Data
                  </Button>
                </Stack>
              </Card>

              <Card sx={{ background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(20px)', borderRadius: 3, p: 3, boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 700, color: '#1F2937' }}>Recent Activity</Typography>
                <Stack spacing={2}>
                  {portfolioAssets.slice(0, 5).map((asset) => (
                    <Box key={asset.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, borderRadius: 2, background: 'rgba(0, 0, 0, 0.02)' }}>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Added {asset.symbol}</Typography>
                        <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>{new Date(asset.timestamp).toLocaleString()}</Typography>
                      </Box>
                      <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>${(asset.amount * asset.price).toFixed(2)}</Typography>
                    </Box>
                  ))}
                  {portfolioAssets.length === 0 && (
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary, textAlign: 'center', py: 2 }}>No recent activity. Add assets to see your portfolio activity.</Typography>
                  )}
                </Stack>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      <Dialog open={showAddAsset} onClose={() => setShowAddAsset(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Asset</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Asset Symbol"
              value={newAsset.symbol}
              onChange={(e) => setNewAsset({ ...newAsset, symbol: e.target.value })}
              placeholder="e.g., BTC, ETH, AAPL"
            />
            <TextField
              fullWidth
              label="Amount"
              type="number"
              value={newAsset.amount}
              onChange={(e) => setNewAsset({ ...newAsset, amount: e.target.value })}
              placeholder="0.0"
            />
            <TextField
              fullWidth
              label="Current Price ($)"
              type="number"
              value={newAsset.price}
              onChange={(e) => setNewAsset({ ...newAsset, price: e.target.value })}
              placeholder="0.00"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAddAsset(false)}>Cancel</Button>
          <Button onClick={handleAddAsset} variant="contained" sx={{ background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)' }}>Add Asset</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
