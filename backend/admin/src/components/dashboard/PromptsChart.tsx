import { Card, CardContent, Box, Typography } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { DashboardStats } from '@/types';

interface PromptsChartProps {
  stats: DashboardStats;
}

export const PromptsChart = ({ stats }: PromptsChartProps) => {
  const chartData = {
    labels: Object.keys(stats?.promptsPerCategory || {}),
    datasets: [
      {
        label: 'Prompts per Category',
        data: Object.values(stats?.promptsPerCategory || {}),
        backgroundColor: 'rgba(51, 102, 255, 0.5)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Prompts by Category',
      },
    },
  };

  return (
    <Card sx={{ mb: 6 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>Prompts by Category</Typography>
        <Box sx={{ height: 300 }}>
          <Bar data={chartData} options={chartOptions} />
        </Box>
      </CardContent>
    </Card>
  );
}; 