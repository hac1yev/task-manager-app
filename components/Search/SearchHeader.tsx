import { Box, Typography } from '@mui/material'
import React from 'react'

const SearchHeader = ({ q }: { q: string }) => {
    return (
        <Box className="flex-between" sx={{ mb: 3 }}>
            <Typography variant="h4">Search Result: {q}</Typography>
        </Box>
    );
};

export default SearchHeader;