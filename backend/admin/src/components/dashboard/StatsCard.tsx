import React from 'react';
import { Box, Card, Typography, useTheme } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { DashboardStats } from '../../types';

interface StatsCardProps {
  title: string;
  value: number;
  subtitle: string;
  icon: React.ReactNode;
  trend: number;
}

export const StatsCard = ({ title, value, subtitle, icon, trend }: StatsCardProps) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        p: 3,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2,
        boxShadow: theme.shadows[1],
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Box
          sx={{
            p: 1.5,
            borderRadius: 2,
            bgcolor: theme.palette.primary.light + '20',
            color: theme.palette.primary.main,
            mr: 2,
          }}
        >
          {icon}
        </Box>
        <Typography variant="h6" fontWeight="bold">
          {title}
        </Typography>
      </Box>

      <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
        {value.toLocaleString()}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', mt: 'auto' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            color: trend >= 0 ? theme.palette.success.main : theme.palette.error.main,
            mr: 1,
          }}
        >
          {trend >= 0 ? <TrendingUpIcon /> : <TrendingDownIcon />}
          <Typography variant="body2" fontWeight="bold">
            {Math.abs(trend)}%
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>
      </Box>
    </Card>
  );
}; 