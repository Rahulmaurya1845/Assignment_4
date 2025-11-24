import React from 'react';
import { Box, Typography, Divider, Grid } from '@mui/material';

const monthList = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December'
];

const colorPalette = [
  '#1976d2', '#388e3c', '#f57c00', '#7b1fa2',
  '#546e7a', '#00897b', '#6d4c41', '#d81b60',
  '#0288d1', '#c2185b', '#afb42b', '#5d4037'
];

const MonthlySummaryBox = ({ title = 'Monthly Summary', data = {} }) => {
  // Calculate total of all months
  const total = monthList.reduce((sum, month) => sum + (data[month] ?? 0), 0);

  return (
    <Box
      mt={2}
      p={2}
      border={1}
      borderColor="primary.main"
      borderRadius="borderRadius"
      boxShadow={1}
      bgcolor="#f5f5f5"
    >
      <Typography variant="h5" color="primary" gutterBottom>
        {title}
      </Typography>
      <Divider sx={{ mb: 2 }} />
      
      <Grid container spacing={2}>
        {monthList.map((month, index) => (
          <Grid item xs={6} sm={4} md={3} key={month}>
            <Box textAlign="center">
              <Typography
                variant="h6"
                sx={{ color: colorPalette[index % colorPalette.length] }}
              >
                {month}
              </Typography>
              <Typography
                variant="h6"
                sx={{ color: colorPalette[index % colorPalette.length] }}
              >
                {data[month] ?? 0}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 2 }} />

      <Box textAlign="center" mt={2}>
        <Typography variant="h6" color="textSecondary">
          Total
        </Typography>
        <Typography variant="h4" color="primary">
          {total}
        </Typography>
      </Box>
    </Box>
  );
};

export default MonthlySummaryBox;
