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
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material'
import {
  Agriculture as FarmingIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Refresh as RefreshIcon,
  Info as InfoIcon,
  ArrowForward as ArrowForwardIcon,
  Timer as TimerIcon,
  MonetizationOn as RewardsIcon,
  Security as SecurityIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  AutoAwesome as BoostIcon,
} from '@mui/icons-material'
import { useAppTheme } from '../ClientThemeProvider'
import Header from '../../components/Header'

const farmingPools = [
  {
    id: 1,
    name: 'ETH-USDC LP',
    token1: 'ETH',
    token2: 'USDC',
    icon1: '🔵',
    icon2: '🔷',
    apy: '45.2%',
    tvl: '$2.1B',
    allocPoints: 100,
    userStaked: '0.0',
    userRewards: '0.0',
    multiplier: '1x',
    status: 'active',
    color: '#6366f1',
    gradient: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
    rewards: ['ETH', 'USDC'],
  },
  {
    id: 2,
    name: 'BNB-USDT LP',
    token1: 'BNB',
    token2: 'USDT',
    icon1: '🟡',
    icon2: '🟢',
    apy: '38.7%',
    tvl: '$1.8B',
    allocPoints: 80,
    userStaked: '0.0',
    userRewards: '0.0',
    multiplier: '0.8x',
    status: 'active',
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    rewards: ['BNB', 'USDT'],
  },
  {
    id: 3,
    name: 'ETH-BNB LP',
    token1: 'ETH',
    token2: 'BNB',
    icon1: '🔵',
    icon2: '🟡',
    apy: '52.1%',
    tvl: '$950M',
    allocPoints: 120,
    userStaked: '0.0',
    userRewards: '0.0',
    multiplier: '1.2x',
    status: 'active',
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    rewards: ['ETH', 'BNB'],
  },
]

const userFarms = [
  {
    id: 1,
    name: 'ETH-USDC LP',
    token1: 'ETH',
    token2: 'USDC',
    icon1: '🔵',
    icon2: '🔷',
    staked: '12.5 LP',
    rewards: '45.2 ETH + 1,234 USDC',
    apy: '45.2%',
    value: '$25,000',
    color: '#6366f1',
  },
  {
    id: 2,
    name: 'BNB-USDT LP',
    token1: 'BNB',
    token2: 'USDT',
    icon1: '🟡',
    icon2: '🟢',
    staked: '8.3 LP',
    rewards: '12.8 BNB + 5,678 USDT',
    apy: '38.7%',
    value: '$15,500',
    color: '#f59e0b',
  },
]

const leaderboard = [
  { rank: 1, address: '0x1234...5678', tvl: '$125,000', rewards: '$12,500', multiplier: '2.5x' },
  { rank: 2, address: '0x8765...4321', tvl: '$98,000', rewards: '$9,800', multiplier: '2.0x' },
  { rank: 3, address: '0x1111...2222', tvl: '$87,500', rewards: '$8,750', multiplier: '1.8x' },
  { rank: 4, address: '0x3333...4444', tvl: '$76,200', rewards: '$7,620', multiplier: '1.5x' },
  { rank: 5, address: '0x5555...6666', tvl: '$65,800', rewards: '$6,580', multiplier: '1.3x' },
]

function FarmingPoolCard({ pool }: { pool: typeof farmingPools[0] }) {
  const theme = useTheme()
  const [stakeAmount, setStakeAmount] = useState('')

  return (
    <Card
      sx={{
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
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ position: 'relative' }}>
              <Avatar
                sx={{
                  width: 48,
                  height: 48,
                  background: pool.gradient,
                  fontSize: '1.2rem',
                }}
              >
                {pool.icon1}
              </Avatar>
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  background: theme.palette.background.paper,
                  fontSize: '1rem',
                  position: 'absolute',
                  bottom: -8,
                  right: -8,
                  border: `2px solid ${theme.palette.background.paper}`,
                }}
              >
                {pool.icon2}
              </Avatar>
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                {pool.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Liquidity Pool
              </Typography>
            </Box>
          </Box>
          <Chip
            label={pool.apy}
            sx={{
              background: 'rgba(16, 185, 129, 0.1)',
              color: 'success.main',
              fontWeight: 600,
            }}
          />
        </Box>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              TVL
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
              {pool.tvl}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Multiplier
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
              {pool.multiplier}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Alloc Points
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
              {pool.allocPoints}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Rewards
            </Typography>
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              {pool.rewards.map((reward, index) => (
                <Chip
                  key={index}
                  label={reward}
                  size="small"
                  sx={{
                    background: 'rgba(99, 102, 241, 0.1)',
                    color: 'primary.main',
                    fontSize: '0.7rem',
                  }}
                />
              ))}
            </Box>
          </Grid>
        </Grid>

        <TextField
          fullWidth
          placeholder="Enter LP amount to stake"
          value={stakeAmount}
          onChange={(e) => setStakeAmount(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            fullWidth
            startIcon={<AddIcon />}
            sx={{
              background: pool.gradient,
              '&:hover': {
                background: pool.gradient,
                opacity: 0.9,
              },
            }}
          >
            Stake LP
          </Button>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<RemoveIcon />}
            sx={{
              borderColor: theme.palette.divider,
              color: theme.palette.text.primary,
            }}
          >
            Unstake
          </Button>
        </Stack>
      </CardContent>
    </Card>
  )
}

function UserFarmCard({ farm }: { farm: typeof userFarms[0] }) {
  const theme = useTheme()

  return (
    <Card
      sx={{
        background: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
        '&:hover': {
          transform: 'translateY(-2px)',
          transition: 'transform 0.3s ease',
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ position: 'relative' }}>
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  background: farm.color,
                  fontSize: '1rem',
                }}
              >
                {farm.icon1}
              </Avatar>
              <Avatar
                sx={{
                  width: 28,
                  height: 28,
                  background: theme.palette.background.paper,
                  fontSize: '0.8rem',
                  position: 'absolute',
                  bottom: -6,
                  right: -6,
                  border: `2px solid ${theme.palette.background.paper}`,
                }}
              >
                {farm.icon2}
              </Avatar>
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                {farm.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {farm.staked}
              </Typography>
            </Box>
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
            {farm.value}
          </Typography>
        </Box>

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Rewards
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600, color: 'success.main' }}>
              {farm.rewards}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              APY
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
              {farm.apy}
            </Typography>
          </Grid>
        </Grid>

        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            size="small"
            sx={{ flex: 1 }}
          >
            Claim Rewards
          </Button>
          <Button
            variant="outlined"
            size="small"
            sx={{ flex: 1 }}
          >
            Unstake
          </Button>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default function FarmPage() {
  const theme = useTheme()
  const { mode } = useAppTheme()
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState(0)

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
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" sx={{ fontWeight: 700, color: theme.palette.text.primary, mb: 2 }}>
            Liquidity Farming
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Provide liquidity and earn additional rewards through farming
          </Typography>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ background: theme.palette.background.paper }}>
              <CardContent sx={{ p: 3, textAlign: 'center' }}>
                <Avatar
                  sx={{
                    mx: 'auto',
                    mb: 2,
                    width: 56,
                    height: 56,
                    background: 'linear-gradient(45deg, #6366f1, #4f46e5)',
                  }}
                >
                  <FarmingIcon />
                </Avatar>
                <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
                  $40,500
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Farmed Value
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ background: theme.palette.background.paper }}>
              <CardContent sx={{ p: 3, textAlign: 'center' }}>
                <Avatar
                  sx={{
                    mx: 'auto',
                    mb: 2,
                    width: 56,
                    height: 56,
                    background: 'linear-gradient(45deg, #10b981, #059669)',
                  }}
                >
                  <RewardsIcon />
                </Avatar>
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'success.main' }}>
                  $2,150
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Rewards Earned
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ background: theme.palette.background.paper }}>
              <CardContent sx={{ p: 3, textAlign: 'center' }}>
                <Avatar
                  sx={{
                    mx: 'auto',
                    mb: 2,
                    width: 56,
                    height: 56,
                    background: 'linear-gradient(45deg, #f59e0b, #d97706)',
                  }}
                >
                  <BoostIcon />
                </Avatar>
                <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
                  45.3%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Average APY
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ background: theme.palette.background.paper }}>
              <CardContent sx={{ p: 3, textAlign: 'center' }}>
                <Avatar
                  sx={{
                    mx: 'auto',
                    mb: 2,
                    width: 56,
                    height: 56,
                    background: 'linear-gradient(45deg, #ef4444, #dc2626)',
                  }}
                >
                  <SecurityIcon />
                </Avatar>
                <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
                  2
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Active Farms
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            sx={{
              '& .MuiTab-root': {
                color: theme.palette.text.secondary,
                fontWeight: 600,
                '&.Mui-selected': {
                  color: theme.palette.primary.main,
                },
              },
            }}
          >
            <Tab label="Available Pools" />
            <Tab label="My Farms" />
            <Tab label="Leaderboard" />
          </Tabs>
        </Box>

        {/* Tab Content */}
        {activeTab === 0 && (
          <Grid container spacing={3}>
            {farmingPools.map((pool) => (
              <Grid item xs={12} md={6} lg={4} key={pool.id}>
                <FarmingPoolCard pool={pool} />
              </Grid>
            ))}
          </Grid>
        )}

        {activeTab === 1 && (
          <Grid container spacing={3}>
            {userFarms.map((farm) => (
              <Grid item xs={12} md={6} key={farm.id}>
                <UserFarmCard farm={farm} />
              </Grid>
            ))}
          </Grid>
        )}

        {activeTab === 2 && (
          <Card sx={{ background: theme.palette.background.paper }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: theme.palette.text.primary }}>
                Top Farmers
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>Rank</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Address</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>TVL</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Rewards</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Multiplier</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {leaderboard.map((row) => (
                      <TableRow key={row.rank}>
                        <TableCell>
                          <Chip
                            label={`#${row.rank}`}
                            size="small"
                            sx={{
                              background: row.rank === 1 ? 'rgba(255, 215, 0, 0.1)' :
                                        row.rank === 2 ? 'rgba(192, 192, 192, 0.1)' :
                                        row.rank === 3 ? 'rgba(205, 127, 50, 0.1)' : 'rgba(99, 102, 241, 0.1)',
                              color: row.rank === 1 ? '#FFD700' :
                                     row.rank === 2 ? '#C0C0C0' :
                                     row.rank === 3 ? '#CD7F32' : 'primary.main',
                              fontWeight: 600,
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ fontFamily: 'monospace' }}>{row.address}</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>{row.tvl}</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: 'success.main' }}>{row.rewards}</TableCell>
                        <TableCell>
                          <Chip
                            label={row.multiplier}
                            size="small"
                            sx={{
                              background: 'rgba(245, 158, 11, 0.1)',
                              color: 'warning.main',
                              fontWeight: 600,
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        )}
      </Container>
    </Box>
  )
}
