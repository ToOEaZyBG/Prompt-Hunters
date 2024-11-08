import React from 'react';
import { 
  Card, 
  CardContent, 
  Box,
  Typography,
  useTheme,
  alpha,
  Paper,
  Stack
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Използваме новия Grid компонент
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  ChartData,
  ChartOptions
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';

// Регистрираме компонентите на Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Добавяме типове за данните на графиките
interface ChartDatasets {
  label?: string;
  data: number[];
  backgroundColor?: string | string[];
  borderColor?: string;
}

interface ChartProps {
  labels: string[];
  datasets: ChartDatasets[];
}

const Dashboard = () => {
  const theme = useTheme();

  // Данни за промптите по модели
  const promptsByModel: ChartProps = {
    labels: ['GPT', 'Claude', 'Midjourney', 'DALL-E', 'Stable Diffusion'],
    datasets: [
      {
        label: 'Number of Prompts',
        data: [850, 620, 1200, 750, 980],
        backgroundColor: [
          alpha(theme.palette.primary.main, 0.6),
          alpha(theme.palette.secondary.main, 0.6),
          alpha(theme.palette.success.main, 0.6),
          alpha(theme.palette.warning.main, 0.6),
          alpha(theme.palette.info.main, 0.6),
        ],
      },
    ],
  };

  // Данни за продажбите по дни
  const salesData: ChartProps = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Sales',
        data: [12, 19, 3, 5, 2, 3, 15],
        borderColor: theme.palette.primary.main,
        backgroundColor: alpha(theme.palette.primary.main, 0.1),
      },
    ],
  };

  // Данни за активните потребители
  const activeUsers: ChartProps = {
    labels: ['Active', 'Inactive'],
    datasets: [
      {
        data: [75, 25],
        backgroundColor: [
          theme.palette.success.main,
          alpha(theme.palette.grey[500], 0.2),
        ],
      },
    ],
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Dashboard
      </Typography>

      {/* Quick Stats */}
      <Box sx={{ mb: 3 }}>
        <Grid container spacing={3}>
          <Grid xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" variant="subtitle2">
                  Total Prompts
                </Typography>
                <Typography variant="h4" fontWeight="bold">
                  4,400
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" variant="subtitle2">
                  Total Users
                </Typography>
                <Typography variant="h4" fontWeight="bold">
                  1,234
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" variant="subtitle2">
                  Monthly Revenue
                </Typography>
                <Typography variant="h4" fontWeight="bold">
                  $12,345
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" variant="subtitle2">
                  Active Subscriptions
                </Typography>
                <Typography variant="h4" fontWeight="bold">
                  456
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Charts */}
      <Grid container spacing={3}>
        <Grid xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Prompts by AI Model
              </Typography>
              <Bar data={promptsByModel} />
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Active Users
              </Typography>
              <Pie data={activeUsers} />
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Weekly Sales
              </Typography>
              <Line data={salesData} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;