import React from 'react';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import { DashboardStats } from '../../types';

interface StatsCardsProps {
  stats: DashboardStats;
}

export const StatsCards = ({ stats }: StatsCardsProps) => (
  <Grid container spacing={3} mb={6}>
    <Grid item xs={12} md={4}>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>Total Users</Typography>
          <Typography variant="h3">{stats?.totalUsers || 0}</Typography>
          <Typography variant="subtitle2" color="textSecondary">
            +{stats?.newUsersToday || 0} today
          </Typography>
        </CardContent>
      </Card>
    </Grid>
    <Grid item xs={12} md={4}>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>Total Prompts</Typography>
          <Typography variant="h3">{stats?.totalPrompts || 0}</Typography>
        </CardContent>
      </Card>
    </Grid>
  </Grid>
); 