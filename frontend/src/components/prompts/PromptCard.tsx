import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Rating,
  CardActionArea,
  IconButton,
  Stack,
  useTheme,
  alpha,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { motion } from 'framer-motion';
import ImagePlaceholder from '../common/ImagePlaceholder';

interface PromptCardProps {
  id: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  category: string;
  imageUrl?: string;
  model?: string;
  likes?: number;
  isNew?: boolean;
  isFeatured?: boolean;
}

const PromptCard: React.FC<PromptCardProps> = ({
  id,
  title,
  description,
  price,
  rating,
  category,
  imageUrl,
  model,
  likes = 0,
  isNew,
  isFeatured,
}) => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      style={{ height: '100%' }}
    >
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'visible',
          boxShadow: `0 4px 12px ${alpha(theme.palette.common.black, 0.1)}`,
          '&:hover': {
            boxShadow: `0 12px 24px ${alpha(theme.palette.common.black, 0.15)}`,
          },
          '&::before': isFeatured ? {
            content: '""',
            position: 'absolute',
            top: -2,
            left: -2,
            right: -2,
            bottom: -2,
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            borderRadius: '18px',
            zIndex: -1,
          } : undefined,
        }}
      >
        <CardActionArea onClick={() => navigate(`/prompt/${id}`)}>
          <Box sx={{ position: 'relative' }}>
            {imageUrl ? (
              <CardMedia
                component="img"
                height="200"
                image={imageUrl}
                alt={title}
                sx={{
                  borderTopLeftRadius: 2,
                  borderTopRightRadius: 2,
                }}
              />
            ) : (
              <ImagePlaceholder height={200} />
            )}
            {/* Badges */}
            <Stack
              direction="row"
              spacing={1}
              sx={{
                position: 'absolute',
                top: 12,
                left: 12,
              }}
            >
              {isNew && (
                <Chip
                  label="New"
                  size="small"
                  sx={{
                    bgcolor: theme.palette.success.main,
                    color: 'white',
                    fontWeight: 600,
                  }}
                />
              )}
              {isFeatured && (
                <Chip
                  label="Featured"
                  size="small"
                  sx={{
                    bgcolor: theme.palette.secondary.main,
                    color: 'white',
                    fontWeight: 600,
                  }}
                />
              )}
            </Stack>
            {/* Price badge */}
            <Box
              sx={{
                position: 'absolute',
                bottom: -16,
                right: 16,
                bgcolor: theme.palette.primary.main,
                color: 'white',
                py: 1,
                px: 2,
                borderRadius: 2,
                boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.4)}`,
              }}
            >
              <Typography variant="h6" fontWeight="bold">
                ${price}
              </Typography>
            </Box>
          </Box>

          <CardContent sx={{ pt: 3 }}>
            {/* Category & Model */}
            <Stack direction="row" spacing={1} mb={1}>
              <Chip
                label={category}
                size="small"
                sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }}
              />
              {model && (
                <Chip
                  label={model}
                  size="small"
                  sx={{ bgcolor: alpha(theme.palette.secondary.main, 0.1) }}
                />
              )}
            </Stack>

            {/* Title & Description */}
            <Typography variant="h6" gutterBottom>
              {title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: 2,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {description}
            </Typography>

            {/* Rating & Actions */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Rating value={rating} readOnly size="small" />
                <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                  ({rating.toFixed(1)})
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </CardActionArea>
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton size="small" sx={{ mr: 1 }}>
            <FavoriteIcon fontSize="small" />
          </IconButton>
          <IconButton size="small">
            <ShareIcon fontSize="small" />
          </IconButton>
        </Box>
      </Card>
    </motion.div>
  );
};

export default PromptCard;