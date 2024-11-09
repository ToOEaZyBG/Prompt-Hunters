import { Box, Card, Typography, useTheme } from '@mui/material';
import { UserActivity } from '../../types';

interface ActivityListProps {
  activities: UserActivity[];
}

export const ActivityList = ({ activities }: ActivityListProps) => {
  const theme = useTheme();

  return (
    <Card sx={{ p: 3, height: '100%', borderRadius: 2, boxShadow: theme.shadows[1] }}>
      <Typography variant="h6" gutterBottom fontWeight="bold">
        Recent Activity
      </Typography>
      {activities.map((activity) => (
        <Box key={activity.id} py={1} borderBottom={1} borderColor="divider">
          <Typography variant="body2">
            {activity.action} - {new Date(activity.created_at).toLocaleString()}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {activity.details}
          </Typography>
        </Box>
      ))}
    </Card>
  );
}; 