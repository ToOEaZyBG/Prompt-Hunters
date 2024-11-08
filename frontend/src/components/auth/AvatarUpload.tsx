import React, { useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  useTheme,
  alpha,
  IconButton,
} from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import DeleteIcon from '@mui/icons-material/Delete';

interface AvatarUploadProps {
  currentAvatar?: string;
  onUpload: (file: File) => Promise<void>;
  onDelete?: () => Promise<void>;
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({
  currentAvatar,
  onUpload,
  onDelete,
}) => {
  const theme = useTheme();
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(currentAvatar);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      
      // Създаваме preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Качваме файла
      await onUpload(file);
    } catch (error) {
      console.error('Failed to upload avatar:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!onDelete) return;
    try {
      setIsUploading(true);
      await onDelete();
      setPreviewUrl(undefined);
    } catch (error) {
      console.error('Failed to delete avatar:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: 120,
        height: 120,
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          overflow: 'hidden',
          bgcolor: alpha(theme.palette.primary.main, 0.1),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: `4px solid ${alpha(theme.palette.primary.main, 0.2)}`,
        }}
      >
        {isUploading ? (
          <CircularProgress size={40} />
        ) : previewUrl ? (
          <Box
            component="img"
            src={previewUrl}
            alt="Avatar"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ) : (
          <AddAPhotoIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
        )}
      </Box>

      <Box
        sx={{
          position: 'absolute',
          bottom: -10,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 1,
        }}
      >
        <Button
          component="label"
          variant="contained"
          size="small"
          sx={{
            minWidth: 0,
            p: 1,
            borderRadius: '50%',
          }}
        >
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleFileSelect}
          />
          <AddAPhotoIcon fontSize="small" />
        </Button>
        
        {previewUrl && onDelete && (
          <IconButton
            size="small"
            onClick={handleDelete}
            sx={{
              bgcolor: theme.palette.error.main,
              color: 'white',
              '&:hover': {
                bgcolor: theme.palette.error.dark,
              },
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default AvatarUpload; 