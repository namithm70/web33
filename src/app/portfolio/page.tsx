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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material'
import {
  AccountBalance as PortfolioIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Refresh as RefreshIcon,
  Info as InfoIcon,
  ArrowForward as ArrowForwardIcon,
  Timer as TimerIcon,
  MonetizationOn as RewardsIcon,
  Security as SecurityIcon,
  PieChart as PieChartIcon,
  BarChart as BarChartIcon,
  Timeline as TimelineIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material'
import { useAppTheme } from '../ClientThemeProvider'
import Header from '../../components/Header'

const portfolioStats = {
  totalValue: '$52,450.32',
  totalChange: '+12.5%',
  totalChangeValue: '+$5,850.45',
  isPositive: true,
  assets: [
    { token: 'ETH', amount: '2.5', value: '$6,125.00', change: '+8.2%', icon: '🔵', color: '#6366f1' },
    { token: 'USDC', amount: '15,000', value: '$15,000.00', change: '0.0%', icon: '🔷', color: '#10b981' },
    { token: 'BNB', amount: '25.5', value: '$7,965.00', change: '+15.7%', icon: '🟡', color: '#f59e0b' },
    { token: 'USDT', amount: '12,500', value: '$12,500.00', change: '0.0%', icon: '🟢', color: '#ef4444' },
    { token: 'LP Tokens', amount: '40.5', value: '$10,860.32', change: '+18.3%', icon: '🟣', color: '#8b5cf6' },
  ],
  staking: [
    { token: 'ETH', staked: '1.2', rewards: '0.08', value: '$3,136.00', apy: '4.2%', icon: '🔵', color: '#6366f1' },
    { token: 'USDC', staked: '5,000', rewards: '425', value: '$5,425.00', apy: '8.5%', icon: '🔷', color: '#10b981' },
  ],
  farming: [
    { pool: 'ETH-USDC LP', staked: '12.5', rewards: '45.2 ETH + 1,234 USDC', value: '$25,000', apy: '45.2%', icon: '🟣', color: '#8b5cf6' },
    { pool: 'BNB-USDT LP', staked: '8.3', rewards: '12.8 BNB + 5,678 USDT', value: '$15,500', apy: '38.7%', icon: '🟡', color: '#f59e0b' },
  ],
  transactions: [
    { type: 'Swap', from: '2.5 ETH', to: '3,250 USDC', time: '2 hours ago', tx: '0x1234...5678', status: 'completed' },
    { type: 'Stake', from: '1.2 ETH', to: 'Staking Pool', time: '1 day ago', tx: '0x8765...4321', status: 'completed' },
    { type: 'Farm', from: '10 LP', to: 'ETH-USDC Farm', time: '3 days ago', tx: '0x1111...2222', status: 'completed' },
    { type: 'Claim', from: 'Rewards', to: '0.08 ETH', time: '1 week ago', tx: '0x3333...4444', status: 'completed' },
  ],
}

const timeRanges = [
  { label: '24H', value: '24h' },
  { label: '7D', value: '7d' },
  { label: '30D', value: '30d' },
  { label: '90D', value: '90d' },
  { label: '1Y', value: '1y' },
  { label: 'ALL', value: 'all' },
]

function PortfolioOverview() {
  const theme = useTheme()
  const [timeRange, setTimeRange] = useState('7d')
  const [showValues, setShowValues] = useState(true)

  return (
    <Grid container spacing={3}>
      {/* Portfolio Value Card */}
      <Grid item xs={12} md={8}>
        <Card sx={{ background: theme.palette.background.paper }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
                  {showValues ? portfolioStats.totalValue : '****'}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                  <Chip
                    icon={portfolioStats.isPositive ? <TrendingUpIcon /> : <TrendingDownIcon />}
                    label={`${portfolioStats.totalChange} (${portfolioStats.totalChangeValue})`}
                    size="small"
                    sx={{
                      background: portfolioStats.isPositive 
                        ? 'rgba(16, 185, 129, 0.1)' 
                        : 'rgba(239, 68, 68, 0.1)',
                      color: portfolioStats.isPositive ? 'success.main' : 'error.main',
                      fontWeight: 600,
                    }}
                  />
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <Select
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                    sx={{ height: 40 }}
                  >
                    {timeRanges.map((range) => (
                      <MenuItem key={range.value} value={range.value}>
                        {range.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <IconButton
                  onClick={() => setShowValues(!showValues)}
                  sx={{ color: theme.palette.text.secondary }}
                >
                  {showValues ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </Box>
            </Box>
            
            <Box sx={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Chart placeholder - Portfolio performance over time
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Quick Stats */}
      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          <Card sx={{ background: theme.palette.background.paper }}>
            <CardContent sx={{ p: 3, textAlign: 'center' }}>
              <Avatar
                sx={{
                  mx: 'auto',
                  mb: 2,
                  width: 48,
                  height: 48,
                  background: 'linear-gradient(45deg, #6366f1, #4f46e5)',
                }}
              >
                <PortfolioIcon />
              </Avatar>
              <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                {showValues ? '5' : '***'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Assets
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ background: theme.palette.background.paper }}>
            <CardContent sx={{ p: 3, textAlign: 'center' }}>
              <Avatar
                sx={{
                  mx: 'auto',
                  mb: 2,
                  width: 48,
                  height: 48,
                  background: 'linear-gradient(45deg, #10b981, #059669)',
                }}
              >
                <RewardsIcon />
              </Avatar>
              <Typography variant="h6" sx={{ fontWeight: 600, color: 'success.main' }}>
                {showValues ? '$2,695' : '****'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Rewards
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ background: theme.palette.background.paper }}>
            <CardContent sx={{ p: 3, textAlign: 'center' }}>
              <Avatar
                sx={{
                  mx: 'auto',
                  mb: 2,
                  width: 48,
                  height: 48,
                  background: 'linear-gradient(45deg, #f59e0b, #d97706)',
                }}
              >
                <TrendingUpIcon />
              </Avatar>
              <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                {showValues ? '18.7%' : '****'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Average APY
              </Typography>
            </CardContent>
          </Card>
        </Stack>
      </Grid>
    </Grid>
  )
}

function AssetCard({ asset }: { asset: typeof portfolioStats.assets[0] }) {
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
                background: asset.color,
                fontSize: '1rem',
              }}
            >
              {asset.icon}
            </Avatar>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                {asset.token}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {asset.amount} {asset.token}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
              {asset.value}
            </Typography>
            <Chip
              label={asset.change}
              size="small"
              sx={{
                background: asset.change.startsWith('+') 
                  ? 'rgba(16, 185, 129, 0.1)' 
                  : 'rgba(239, 68, 68, 0.1)',
                color: asset.change.startsWith('+') ? 'success.main' : 'error.main',
                fontWeight: 600,
              }}
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

function TransactionRow({ tx }: { tx: typeof portfolioStats.transactions[0] }) {
  const theme = useTheme()

  return (
    <TableRow>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar
            sx={{
              width: 32,
              height: 32,
              background: tx.type === 'Swap' ? '#6366f1' :
                         tx.type === 'Stake' ? '#10b981' :
                         tx.type === 'Farm' ? '#f59e0b' : '#8b5cf6',
              fontSize: '0.8rem',
            }}
          >
            {tx.type.charAt(0)}
          </Avatar>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {tx.type}
          </Typography>
        </Box>
      </TableCell>
      <TableCell>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {tx.from}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {tx.to}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2" color="text.secondary">
          {tx.time}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
          {tx.tx}
        </Typography>
      </TableCell>
      <TableCell>
        <Chip
          label={tx.status}
          size="small"
          sx={{
            background: 'rgba(16, 185, 129, 0.1)',
            color: 'success.main',
            fontWeight: 600,
          }}
        />
      </TableCell>
    </TableRow>
  )
}

export default function PortfolioPage() {
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
            Portfolio Analytics
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Track your investments, performance, and earnings in real-time
          </Typography>
        </Box>

        {/* Portfolio Overview */}
        <Box sx={{ mb: 4 }}>
          <PortfolioOverview />
        </Box>

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
            <Tab label="Assets" />
            <Tab label="Staking" />
            <Tab label="Farming" />
            <Tab label="Transactions" />
          </Tabs>
        </Box>

        {/* Tab Content */}
        {activeTab === 0 && (
          <Grid container spacing={3}>
            {portfolioStats.assets.map((asset, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <AssetCard asset={asset} />
              </Grid>
            ))}
          </Grid>
        )}

        {activeTab === 1 && (
          <Grid container spacing={3}>
            {portfolioStats.staking.map((stake, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card sx={{ background: theme.palette.background.paper }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar
                          sx={{
                            width: 48,
                            height: 48,
                            background: stake.color,
                            fontSize: '1.2rem',
                          }}
                        >
                          {stake.icon}
                        </Avatar>
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                            {stake.token} Staking
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {stake.staked} {stake.token} staked
                          </Typography>
                        </Box>
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                        {stake.value}
                      </Typography>
                    </Box>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Rewards
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600, color: 'success.main' }}>
                          {stake.rewards} {stake.token}
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
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {activeTab === 2 && (
          <Grid container spacing={3}>
            {portfolioStats.farming.map((farm, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card sx={{ background: theme.palette.background.paper }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar
                          sx={{
                            width: 48,
                            height: 48,
                            background: farm.color,
                            fontSize: '1.2rem',
                          }}
                        >
                          {farm.icon}
                        </Avatar>
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                            {farm.pool}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {farm.staked} LP staked
                          </Typography>
                        </Box>
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                        {farm.value}
                      </Typography>
                    </Box>
                    <Grid container spacing={2}>
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
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {activeTab === 3 && (
          <Card sx={{ background: theme.palette.background.paper }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: theme.palette.text.primary }}>
                Recent Transactions
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>From</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>To</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Time</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Transaction</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {portfolioStats.transactions.map((tx, index) => (
                      <TransactionRow key={index} tx={tx} />
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
