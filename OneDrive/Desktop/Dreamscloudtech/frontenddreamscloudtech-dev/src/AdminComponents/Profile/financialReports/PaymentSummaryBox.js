import React from 'react';
import { Box, Typography, Divider } from '@mui/material';

const colorPalette = ['blue', 'green', 'orange', 'purple', 'gray', 'teal', 'brown', 'pink'];

const getColorMap = (keys) => {
    const map = {};
    keys.forEach((key, index) => {
        map[key] = colorPalette[index % colorPalette.length];
    });
    return map;
};


const PaymentSummaryBox = ({ title, data }) => {
    const keys = Object.keys(data);
    const colorMap = getColorMap(keys);


    return (
        <Box
            mt={2}
            p={2}
            border={1}
            borderColor="primary.main"
            borderRadius="borderRadius"
            boxShadow={1}
            // style={{ backgroundColor: '#f5f5f5' }}
            style={{ backgroundColor: '#EEF7FF' }}
        >
            <Typography variant="h6" style={{ color: 'blue' }} gutterBottom>
                {title || 'Summary'}
            </Typography>
            <Divider style={{ marginBottom: '10px' }} />
            <Box display="flex" justifyContent="space-around" flexWrap="wrap" px={2} style={{ color: 'blue' }}>
                {Object.entries(data).map(([key, value]) => (
                    <Box key={key} textAlign="center" m={1}>
                        <Typography
                            variant="subtitle1"
                            style={{ color: colorMap[key] || 'black' }}
                        >
                            {formatLabel(key)}
                        </Typography>
                        <Typography
                            variant="h5"
                            style={{ color: colorMap[key] || 'black' }}
                        >
                            {value}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

// Utility to format field names into readable labels
const formatLabel = (key) => {
    return key
        .replace(/([A-Z])/g, ' $1')  // Convert camelCase to spaced
        .replace(/^./, str => str.toUpperCase()); // Capitalize first letter
};

export default PaymentSummaryBox;
