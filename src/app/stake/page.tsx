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
} from '@mui/material'
import {
  AccountBalance as StakingIcon,
  Lock as LockIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Refresh as RefreshIcon,
  Info as InfoIcon,
  ArrowForward as ArrowForwardIcon,
  Timer as TimerIcon,
  MonetizationOn as RewardsIcon,
  Security as SecurityIcon,
} from '@mui/icons-material'
import { useAppTheme } from '../ClientThemeProvider'
import Header from '../../components/Header'

const stakingPools = [
  {
    id: 1,
    token: 'ETH',
    name: 'Ethereum Staking',
    icon: '🔵',
    apy: '4.2%',
    tvl: '$1.2B',
    minStake: '0.1 ETH',
    lockPeriod: '30 days',
    rewards: 'ETH + Protocol tokens',
    color: '#6366f1',
    gradient: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
  },
  {
    id: 2,
    token: 'USDC',
    name: 'USDC Staking',
    icon: '🔷',
    apy: '8.5%',
    tvl: '$850M',
    minStake: '100 USDC',
    lockPeriod: '7 days',
    rewards: 'USDC + Protocol tokens',
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  },
  {
    id: 3,
    token: 'BNB',
    name: 'BNB Staking',
    icon: '🟡',
    apy: '6.8%',
    tvl: '$650M',
    minStake: '1 BNB',
    lockPeriod: '14 days',
    rewards: 'BNB + Protocol tokens',
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
  },
]

const userStakes = [
  {
    id: 1,
    token: 'ETH',
    icon: '🔵',
    staked: '2.5 ETH',
    rewards: '0.12 ETH',
    apy: '4.2%',
    lockEnd: '2024-02-15',
    value: '$6,125',
    color: '#6366f1',
  },
  {
    id: 2,
    token: 'USDC',
    icon: '🔷',
    staked: '5,000 USDC',
    rewards: '425 USDC',
    apy: '8.5%',
    lockEnd: '2024-01-20',
    value: '$5,425',
    color: '#10b981',
  },
]

function StakingPoolCard({ pool }: { pool: typeof stakingPools[0] }) {
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
            <Avatar
              sx={{
                width: 48,
                height: 48,
                background: pool.gradient,
                fontSize: '1.2rem',
              }}
            >
              {pool.icon}
            </Avatar>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                {pool.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {pool.token} Staking Pool
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
              Min Stake
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
              {pool.minStake}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Lock Period
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
              {pool.lockPeriod}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Rewards
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
              {pool.rewards}
            </Typography>
          </Grid>
        </Grid>

        <TextField
          fullWidth
          placeholder="Enter amount to stake"
          value={stakeAmount}
          onChange={(e) => setStakeAmount(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{
            background: pool.gradient,
            '&:hover': {
              background: pool.gradient,
              opacity: 0.9,
            },
          }}
        >
          Stake {pool.token}
        </Button>
      </CardContent>
    </Card>
  )
}

function UserStakeCard({ stake }: { stake: typeof userStakes[0] }) {
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
            <Avatar
              sx={{
                width: 40,
                height: 40,
                background: stake.color,
                fontSize: '1rem',
              }}
            >
              {stake.icon}
            </Avatar>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                {stake.token} Staking
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {stake.staked}
              </Typography>
            </Box>
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
            {stake.value}
          </Typography>
        </Box>

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Rewards
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600, color: 'success.main' }}>
              {stake.rewards}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              APY
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
              {stake.apy}
            </Typography>
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <TimerIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            Lock ends: {stake.lockEnd}
          </Typography>
        </Box>

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

export default function StakePage() {
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
            Staking Dashboard
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Earn rewards by staking your tokens with competitive APY rates
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
                  <StakingIcon />
                </Avatar>
                <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
                  $11,550
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Staked Value
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
                  $545
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
                  <TrendingUpIcon />
                </Avatar>
                <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
                  6.2%
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
                  Active Stakes
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
            <Tab label="My Stakes" />
          </Tabs>
        </Box>

        {/* Tab Content */}
        {activeTab === 0 && (
          <Grid container spacing={3}>
            {stakingPools.map((pool) => (
              <Grid item xs={12} md={6} lg={4} key={pool.id}>
                <StakingPoolCard pool={pool} />
              </Grid>
            ))}
          </Grid>
        )}

        {activeTab === 1 && (
          <Grid container spacing={3}>
            {userStakes.map((stake) => (
              <Grid item xs={12} md={6} key={stake.id}>
                <UserStakeCard stake={stake} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  )
}
