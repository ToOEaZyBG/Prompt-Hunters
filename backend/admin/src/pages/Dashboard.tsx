import { Box, Grid, Typography, useTheme } from '@mui/material';
import { useGetList } from 'react-admin';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import PeopleIcon from '@mui/icons-material/People';
import CodeIcon from '@mui/icons-material/Code';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { StatsCard } from '../components/dashboard/StatsCard';
import { ActivityList } from '../components/dashboard/ActivityList';
import { StatsRecord, UserActivity } from '../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const theme = useTheme();

  // Зареждаме статистиките
  const { data: statsData, isLoading } = useGetList<StatsRecord>('stats', {
    pagination: { page: 1, perPage: 1 },
    sort: { field: 'id', order: 'DESC' }
  });

  const stats = statsData?.[0]?.stats;

  // Зареждаме последните активности
  const { data: activities } = useGetList<UserActivity>('activities', {
    pagination: { page: 1, perPage: 10 },
    sort: { field: 'created_at', order: 'DESC' }
  });

  // Данни за графиката
  const chartData = {
    labels: Object.keys(stats?.promptsPerCategory || {}),
    datasets: [
      {
        label: 'Prompts per Category',
        data: Object.values(stats?.promptsPerCategory || {}),
        backgroundColor: theme.palette.primary.main,
        borderRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Prompts by Category',
        font: {
          size: 16,
          weight: 'bold' as const,
        },
        padding: 20,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  if (isLoading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Заглавие */}
      <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
        Dashboard Overview
      </Typography>

      {/* Статистики */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <StatsCard
            title="Total Users"
            value={stats?.totalUsers || 0}
            subtitle={`+${stats?.newUsersToday || 0} today`}
            icon={<PeopleIcon />}
            trend={+15}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatsCard
            title="Total Prompts"
            value={stats?.totalPrompts || 0}
            subtitle="Across all categories"
            icon={<CodeIcon />}
            trend={+25}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatsCard
            title="Active Users"
            value={stats?.activeUsers || 0}
            subtitle="In last 24 hours"
            icon={<TrendingUpIcon />}
            trend={+8}
          />
        </Grid>
      </Grid>

      {/* Графики и активност */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Box
            sx={{
              p: 3,
              height: 400,
              bgcolor: 'background.paper',
              borderRadius: 2,
              boxShadow: theme.shadows[1],
            }}
          >
            <Bar data={chartData} options={chartOptions} />
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <ActivityList activities={activities || []} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;